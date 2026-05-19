# Architecture

## Overview

Gibi Exams is a Telegram-first exam discovery and sharing platform for Ethiopian university students. The system combines a Telegram bot for file intake with a Telegram Mini App for browsing, metadata management, previewing, and downloading exam files.

The architecture is designed around:

* mobile-first usage
* clear ownership boundaries
* server-controlled security
* scalable file delivery
* simple and maintainable feature isolation

---

# Stack

| Layer              | Technology                              | Role                                                     |
| ------------------ | --------------------------------------- | -------------------------------------------------------- |
| Frontend Framework | Next.js                                 | Telegram Mini App frontend, routing, SSR, server actions |
| UI Library         | React                                   | Component-based UI rendering                             |
| Styling            | Tailwind CSS                            | Responsive styling system                                |
| Component System   | shadcn/ui                               | Reusable UI primitives                                   |
| Backend Platform   | Supabase                                | Database, authentication support, storage, RLS           |
| Database           | PostgreSQL                              | Persistent structured data storage                       |
| File Storage       | Supabase Storage                        | Exam file storage and CDN delivery                       |
| Bot Framework      | grammY                                  | Telegram bot message handling                            |
| Runtime            | Node.js                                 | Server runtime for app and bot logic                     |
| Language           | TypeScript                              | End-to-end type safety                                   |
| Deployment         | Vercel                                  | Hosting Next.js application                              |
| State Management   | React Context                           | Lightweight shared frontend state                        |
| Authentication     | Telegram initData verification          | User identity verification inside Mini App               |
| API Layer          | Next.js Route Handlers + Server Actions | Secure backend entry points                              |
| Database Security  | Supabase RLS Policies                   | Row-level authorization enforcement                      |
| File Delivery      | CDN-backed object storage               | Efficient direct exam downloads                          |

---

# High-Level System Architecture

```text
Telegram User
    │
    ▼
Telegram Bot (grammY)
    │
    ├── receives uploads
    ├── creates upload session
    └── opens Mini App
            │
            ▼
Next.js Mini App
    │
    ├── authentication
    ├── metadata management
    ├── search/filtering
    ├── preview
    └── download UI
            │
            ▼
Supabase
    ├── PostgreSQL database
    ├── Storage buckets
    └── RLS policies
```

---

# System Boundaries

## Repository Structure

```text
├── app/
├── components/
├── context/
├── hooks/
├── lib/
└── supabase/
```

---

## Folder Ownership Rules

| Folder                    | Responsibility                                                             |
| ------------------------- | -------------------------------------------------------------------------- |
| `app/`                | Application routes, pages, API route handlers, server actions entry points |
| `app/api/tg-webhook/` | Telegram webhook ingestion only                                            |
| `app/api/auth/`       | Telegram initData verification and session creation                        |
| `app/upload/`         | Upload metadata flow                                                       |
| `app/me/`             | User dashboard and upload management                                       |
| `app/admin/`          | Admin-only moderation and management tools                                 |
| `components/`         | Reusable presentational UI components only                                 |
| `components/ui/`      | Shared shadcn/ui primitives                                                |
| `context/`            | React context providers and shared UI state                                |
| `hooks/`              | Reusable React hooks                                                       |
| `lib/actions.ts`      | Server-side mutations only                                                 |
| `lib/data.ts`         | Centralized database querying and read access                              |
| `lib/utils.ts`        | Shared utility functions                                                   |
| `lib/bot/`            | All Telegram bot-specific logic                                            |
| `lib/bot/handlers/`   | Individual Telegram update handlers                                        |
| `lib/supabase/`       | Supabase client wrappers and configuration                                 |
| `supabase/`               | Migrations, schema, RLS policies, local Supabase config                    |

---

# Storage Model

## Database vs File Storage vs Cache

| Storage Type        | Purpose                    | Examples                                |
| ------------------- | -------------------------- | --------------------------------------- |
| PostgreSQL Database | Structured relational data | users, exams, metadata, upload sessions |
| Object/File Storage | Large binary file storage  | PDFs, JPGs, PNGs                        |
| CDN Layer           | Fast public delivery       | Downloaded exam files                   |
| In-memory/UI Cache  | Temporary frontend state   | filter state, pagination state          |

---

## Database Responsibilities

The PostgreSQL database stores:

* users
* exams
* upload sessions
* metadata
* moderation states
* publish states
* ownership relationships
* audit timestamps

### Example Tables

| Table          | Purpose                               |
| -------------- | ------------------------------------- |
| `users`        | Telegram-linked users                 |
| `exams`        | Published exam metadata               |
| `uploads`      | Temporary upload tracking             |
| `universities` | Filterable normalized university data |
| `departments`  | Department taxonomy                   |
| `courses`      | Course metadata                       |

---

## File Storage Responsibilities

Object storage stores:

* PDF files
* JPG files
* PNG files
* generated preview assets (future-safe)
* temporary upload files

Files are never stored directly in the database.

---

## Cache Responsibilities

The system intentionally minimizes caching complexity during MVP.

Cache may include:

* frontend filter state
* pagination state
* lightweight query caching
* CDN edge caching for file delivery

The system does **not** implement:

* offline sync
* distributed cache infrastructure
* AI embedding cache
* semantic indexing cache

---

# Authentication & Access Model

## Authentication Flow

Authentication is Telegram-native.

### Flow

1. User opens Telegram Mini App
2. Telegram provides `initData`
3. Backend verifies Telegram signature server-side
4. User identity is resolved from Telegram user ID
5. Session is created
6. User gains authorized access

---

## Identity Model

| Identity Source      | Purpose                         |
| -------------------- | ------------------------------- |
| Telegram User ID     | Primary user identifier         |
| Verified initData    | Authentication proof            |
| Database User Record | Internal persistent user record |

Traditional email/password authentication does not exist.

---

## Authorization Model

Authorization is enforced using:

* server-side validation
* Supabase Row Level Security
* ownership checks
* admin role checks

---

## Ownership Rules

| Resource       | Ownership Rule            |
| -------------- | ------------------------- |
| Uploaded exam  | Owned by uploader         |
| Draft upload   | Accessible only by owner  |
| Published exam | Publicly readable         |
| Admin actions  | Restricted to admin users |

---

## Access Rules

### Public Access

Public users may:

* browse exams
* search exams
* preview exams
* download published exams

### Authenticated User Access

Authenticated users may additionally:

* upload exams
* publish metadata
* manage their uploads

### Admin Access

Admins may additionally:

* moderate uploads
* remove content
* manage visibility states

---

# Upload & File Processing Model

## Upload Lifecycle

```text
Telegram Upload
    ↓
Temporary Upload Session
    ↓
Mini App Metadata Completion
    ↓
Validation
    ↓
Publish Action
    ↓
Public Exam Availability
```

---

## Supported File Types (MVP)

| File Type | Supported |
| --------- | --------- |
| PDF       | Yes       |
| JPG       | Yes       |
| PNG       | Yes       |

Unsupported formats are rejected during upload validation.

---

# Background Tasks & Async Processing

The MVP intentionally avoids heavy background infrastructure.

## Current Async Responsibilities

| Task                 | Execution Model                      |
| -------------------- | ------------------------------------ |
| File upload handling | Telegram webhook + server processing |
| Metadata persistence | Server actions                       |
| File delivery        | CDN/object storage                   |
| Duplicate detection  | Synchronous publish-time validation  |

---

## Explicitly Out of Scope

The following systems are intentionally excluded from MVP:

* OCR pipelines
* AI embeddings
* semantic search indexing
* queue workers
* event streaming systems
* distributed job processors

---

# Data Flow Model

## Upload Flow

```text
Telegram User
    ↓
Telegram Bot
    ↓
Temporary Upload Session
    ↓
Mini App Metadata Form
    ↓
Server Validation
    ↓
Database + Storage Persistence
    ↓
Published Exam
```

---

## Discovery Flow

```text
User Opens Mini App
    ↓
Search / Filter Query
    ↓
Server Query Layer
    ↓
PostgreSQL
    ↓
Paginated Results
    ↓
Preview / Download
```

---

# Invariants

These rules are mandatory architectural constraints.

## Architecture Invariants

1. Business logic must never live inside UI components.

2. Database access must only happen through `lib/data.ts` or dedicated domain query modules.

3. Data mutations must only happen through server actions or API routes.

4. Telegram bot logic must remain isolated inside `lib/bot`.

5. Client components must never contain secrets or privileged authorization logic.

---

## Security Invariants

6. Telegram `initData` must always be verified server-side before trusting user identity.

7. User identity must only originate from verified Telegram data.

8. Supabase Row Level Security must remain enabled in production.

9. Admin-only actions must always be validated server-side.

10. Raw SQL queries must never use unsafe string interpolation.

---

## Data Integrity Invariants

11. Published exams must always contain complete required metadata.

12. Files and metadata must never become orphaned from each other.

13. Deleted exams must always clean up associated storage files.

14. Database schema changes must only happen through committed migration files.

15. Production database modifications must never be performed manually.

---

## Product Invariants

16. The Telegram bot is responsible only for messaging and upload intake.

17. The Mini App is the primary browsing and discovery interface.

18. Features that do not improve exam upload, discovery, preview, or download must not be prioritized during MVP.

19. Search and filtering must remain fast on low-end mobile devices and poor networks.

20. Large exam files must never pass through the Next.js server unnecessarily.
