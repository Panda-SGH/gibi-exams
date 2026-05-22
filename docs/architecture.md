# Architecture

## Overview

Gibi Exams is a Telegram-first exam discovery and sharing platform for Ethiopian university students. The system combines a Telegram bot for file intake with a Telegram Mini App for browsing, metadata management, previewing, and downloading exam files.

The architecture is designed around:

- mobile-first usage
- clear ownership boundaries
- server-controlled security
- scalable file delivery
- simple and maintainable feature isolation

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

| Folder                             | Responsibility                                                             |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `app/`                             | Application routes, pages, API route handlers, server actions entry points |
| `app/api/webhook/[webhook-secret]` | Telegram webhook ingestion only                                            |
| `app/api/auth/`                    | Telegram initData verification and session creation                        |
| `app/upload/`                      | Upload metadata flow                                                       |
| `app/me/`                          | User dashboard and upload management                                       |
| `app/admin/`                       | Admin-only moderation and management tools                                 |
| `components/`                      | Reusable presentational UI components only                                 |
| `components/ui/`                   | Shared shadcn/ui primitives                                                |
| `context/`                         | React context providers and shared UI state                                |
| `hooks/`                           | Reusable React hooks                                                       |
| `lib/actions.ts`                   | Server-side mutations only                                                 |
| `lib/data.ts`                      | Centralized database querying and read access                              |
| `lib/utils.ts`                     | Shared utility functions                                                   |
| `lib/bot/`                         | All Telegram bot-specific logic                                            |
| `lib/bot/handlers/`                | Individual Telegram update handlers                                        |
| `lib/supabase/`                    | Supabase client wrappers and configuration                                 |
| `supabase/`                        | Migrations, schema, RLS policies, local Supabase config                    |

---

## Storage & Delivery Responsibilities

### Database vs File Storage vs Cache

| Layer                | Purpose                              | Examples                                         |
| -------------------- | ------------------------------------ | ------------------------------------------------ |
| PostgreSQL Database  | Structured relational data           | users, exams, uploads, universities, departments |
| Object Storage       | Binary file persistence              | PDFs, JPGs, PNGs                                 |
| CDN / Delivery Layer | Accelerated signed file delivery     | Exam previews and downloads                      |
| In-memory/UI Cache   | Temporary frontend interaction state | filters, pagination                              |

---

### Database Responsibilities

The PostgreSQL database stores:

- users
- exams
- uploads
- universities
- departments
- moderation states
- publish states
- ownership relationships
- audit timestamps

#### Example Tables

| Table        | Purpose                    |
| ------------ | -------------------------- |
| users        | Telegram-linked users      |
| exams        | Published exam metadata    |
| uploads      | Upload lifecycle tracking  |
| universities | Normalized university data |
| departments  | Department taxonomy        |

---

### File Storage Responsibilities

Object storage stores:

- PDF files
- JPG files
- PNG files
- temporary upload files
- future preview assets

Files are never stored directly inside the database.

Storage objects are accessed through backend-controlled signed URLs.

Files may exist in temporary upload state before becoming publicly discoverable exams.

Large files must never pass through the Next.js server unnecessarily.

---

### Cache Responsibilities

The system intentionally minimizes caching complexity during MVP.

Cache may include:

- frontend filter state
- pagination state
- lightweight query caching
- CDN edge caching

The system does not implement:

- offline synchronization
- distributed cache infrastructure
- AI embedding cache
- semantic indexing cache

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

- server-side validation
- Supabase Row Level Security
- ownership checks
- admin role checks

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

- browse exams
- search exams
- preview exams
- download published exams

### Authenticated User Access

Authenticated users may additionally:

- upload exams
- publish metadata
- manage their uploads

### Admin Access

Admins may additionally:

- moderate uploads
- remove content
- manage visibility states

---

# Upload & File Processing Model

## Upload Lifecycle

```text
Telegram Upload
    ↓
Temporary Upload Session Created
    ↓
Telegram file_id Stored
    ↓
Mini App Metadata Completion
    ↓
Publish Action
    ↓
Server Downloads File From Telegram
    ↓
Validation
    ↓
Upload To Object Storage
    ↓
Public Exam Availability
```

---

## Upload Session Model

Temporary upload sessions represent files received by the bot
before publication.

An upload session:

- belongs to a single user
- stores Telegram file metadata and telegram_file_id
- remains private until published
- does not yet create a public exam
- may be abandoned safely without consuming permanent storage
- may expire after a retention period

---

## Upload Session States

| State     | Meaning                      |
| --------- | ---------------------------- |
| pending   | file received from Telegram  |
| draft     | metadata editing in progress |
| published | exam successfully published  |
| rejected  | validation failed            |
| deleted   | upload removed from system   |

---

## Supported File Types (MVP)

| File Type | Supported |
| --------- | --------- |
| PDF       | Yes       |
| JPG       | Yes       |
| PNG       | Yes       |

Unsupported formats are rejected during validation.

---

## Validation Responsibilities

Validation includes:

- supported MIME type verification
- file size limits
- required metadata validation
- upload ownership verification
- Telegram file accessibility verification
- duplicate detection
- successful storage upload verification

---

## File Storage Policy

Before publication:

- files remain temporarily managed by Telegram
- the system stores telegram_file_id references only

After publication:

- files are downloaded from Telegram
- files are uploaded into platform-controlled object storage
- published exams are served from CDN/object storage

Files are stored in their original uploaded format.

| Upload Type | Stored As |
| ----------- | --------- |
| PDF         | PDF       |
| JPG         | JPG       |
| PNG         | PNG       |

Files are not converted between formats during MVP.

---

## Preview Policy

Previews are rendered directly from original uploaded files.

| File Type | Preview Method        |
| --------- | --------------------- |
| PDF       | native/browser viewer |
| JPG/PNG   | image renderer        |

No OCR, thumbnail generation, preprocessing pipelines,
or image transformations exist in MVP.

---

# Background Tasks & Async Processing

The MVP intentionally avoids heavy background infrastructure.

## Current Async Responsibilities

| Task                     | Execution Model                      |
| ------------------------ | ------------------------------------ |
| Telegram file intake     | Telegram webhook + server processing |
| Metadata persistence     | Server actions                       |
| Publish-time file import | synchronous server processing        |
| File delivery            | CDN/object storage                   |
| Duplicate detection      | synchronous publish-time validation  |

---

## Duplicate Detection

Duplicate detection happens during publish action.

MVP duplicate detection uses:

- file hash comparison
- lightweight metadata similarity checks

The goal is to prevent obvious duplicate uploads
without introducing expensive processing systems.

---

## Cleanup Policy

Unpublished upload sessions may be automatically removed
after a retention period.

Published exams are considered permanent unless deleted
by admins or upload owners.

---

## Explicitly Out of Scope

The following systems are intentionally excluded from MVP:

- OCR pipelines
- AI embeddings
- semantic search indexing
- queue workers
- event streaming systems
- distributed job processors
- automatic thumbnail generation
- file format conversion pipelines
- image preprocessing systems# Data Flow Model

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
