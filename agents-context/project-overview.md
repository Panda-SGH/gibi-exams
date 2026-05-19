# Project Overview

## Overview

Gibi Exams is a Telegram-first exam sharing platform for Ethiopian university students. The system allows students to upload, organize, discover, preview, and download past exam papers through a Telegram bot and a connected Telegram Mini App. Students send exam files to the bot or upload through mini app, complete structured metadata inside the mini app, and publish exams into a searchable public library. Other students can browse exams; search by title; filter by university, department, course, year, semester, exam type; preview files before downloading; and retrieve files either directly to their phone or through dedicated Telegram bot chat interface. The MVP focuses on making exam access fast, reliable, mobile-friendly, and simple under real Ethiopian network conditions.

## Goals

Make past exam papers easy to discover from one centralized platform.
Eliminate dependency on scattered Telegram channels and groups.
Allow students to upload and publish exams with structured metadata.
Make search and filtering fast enough for mobile users on slow networks.
Ensure users can preview exams before downloading them.
Support a fully mobile-first Telegram Mini App experience.
Keep the product simple and focused on the core workflow:
upload exams
discover exams
preview exams
download exams
Build a scalable technical foundation using Next.js, Supabase, and grammY.
Prevent broken uploads, orphaned files, and inconsistent metadata.
Maintain a clean architecture that supports future iteration without major rewrites.

## Core User Flow

### Upload Flow

#### Option 1 — Upload Through Telegram Bot

1. User opens the Telegram bot.
2. User sends or forwards an exam file to the bot.
3. Bot receives the file and creates a temporary upload session.
4. Bot responds with a confirmation message and a button to open the Mini App.
5. User opens the Mini App.
6. User fills in required metadata:
   - title
   - university
   - department
   - course name
   - semester/year
   - exam type
   - optional notes
7. System validates metadata and file association.
8. User publishes the exam.
9. System stores metadata in Supabase and links it to the uploaded file.
10. Exam becomes publicly searchable in the exams feed.

#### Option 2 — Upload Directly Inside Mini App

1. User opens the Telegram Mini App.
2. User navigates to the upload page.
3. User selects or drags an exam file from their device.
4. System uploads the file to storage and creates a temporary upload session.
5. User fills in required metadata:
   - title
   - university
   - department
   - course name
   - semester/year
   - exam type
   - optional notes
6. System validates the uploaded file and metadata.
7. User publishes the exam.
8. System stores metadata in Supabase and links it to the uploaded file.
9. Exam becomes publicly searchable in the exams feed.

### Exam Discovery Flow

User opens the Telegram Mini App.
User lands on the exams discovery page.
User scrolls through exams or uses search.
User applies filters to narrow results.
User opens an exam detail/preview page.
User previews the file and reviews metadata.
User selects a download option:
send to Telegram (bot chat interface)
download to phone
System delivers the file through storage/CDN or Telegram delivery.

## Features

### Authentication & User Identity

Telegram Mini App authentication
Telegram initData verification
Automatic user creation/sync
Session handling
User profile association with uploads

### Telegram Bot System

File intake through Telegram bot
Forwarded file support
Upload session creation
Deep linking into Mini App
Upload confirmation messaging

### Upload System

File upload workflow
Structured metadata forms
Metadata validation
Draft upload handling
Publish workflow
Duplicate upload prevention basics

### Exam Discovery

Exams feed
pagination
Search functionality
Filtering system
Optimized mobile browsing experience

### Search & Filtering

Search by exam title
University filters
Department filters
course filters
Semester/year filters
Exam type filters

### Exam Preview & Downloads

preview
Metadata display
Unsupported file fallback handling
Send-to-Telegram download flow
Direct device download

### User Dashboard

Uploaded exams list
Pending uploads
Basic account information

### Admin & Moderation

Exam moderation tools
Visibility management
Basic content management
Upload review capability

### Infrastructure & Platform

Supabase Postgres database
S3-compatible file storage
CDN-backed file delivery
Database migrations
RLS security policies
Deployment configuration

## In Scope

### The MVP will include:

Telegram bot for file intake
Telegram Mini App interface
Telegram authentication
Exam upload workflow
Structured exam metadata
Public exams feed
Search functionality
Filtering functionality
Exam preview system
Download system
User uploads dashboard
Admin moderation tools
Responsive mobile-first UI
Supabase database and storage integration
Secure backend validation
CDN-based file delivery

## Out of Scope

### The MVP will NOT include:

OCR or text extraction from images
AI-powered or semantic search
Comments or discussions
Likes, reactions, or voting systems
Chat or messaging features
Gamification or reputation systems
Offline-first support
PDF annotation tools
Real-time collaboration
Multi-language support
Recommendation systems
Social feeds
Public user profiles
Advanced analytics
Native mobile applications
Desktop-specific experiences
Machine learning features

## Success Criteria

### The project is considered complete for MVP when:

Users can successfully send exam files to the Telegram bot.
Uploaded files can be linked to structured metadata inside the Mini App.
Published exams appear in the public exams feed.
Users can search exams and receive relevant results quickly.
Users can filter exams by university, department, semester, and exam type.
Users can preview supported files before downloading.
Users can download exams both through Telegram and directly to their device.
Authentication securely validates Telegram users server-side.
Database and storage remain synchronized without orphaned records.
The app works reliably on low-end mobile devices and slow network conditions.
All major loading, error, and empty states are handled.
The deployment process works from a clean repository clone.
Core architecture rules are enforced:
business logic separated from UI
secure server-side validation
isolated bot logic
reusable UI components
The application can support real student uploads without manual intervention.
The core workflow feels fast, simple, and reliable from upload to download.