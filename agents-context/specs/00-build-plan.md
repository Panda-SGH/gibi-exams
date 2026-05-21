1. **Project Foundation & Deployment Skeleton**
   **Builds:**
   - Next.js app setup
   - TypeScript configuration
   - Tailwind CSS
   - shadcn/ui installation
   - ESLint/Prettier
   - Environment configuration
   - Base folder structure
   - Vercel deployment setup
   - Basic Supabase client setup
   - Basic grammY bot bootstrap

   **Visible Result:**
   A deployed Mini App shell and a running Telegram bot responding to a basic health/ping command.

   **Dependencies:**
   None.

---

2. **Database & Storage Foundation**
   **Builds:**
   - Supabase project configuration
   - PostgreSQL schema
   - `users`, `uploads`, `exams`, `universities`, `departments` tables
   - Storage buckets
   - Initial migrations
   - RLS policies
   - Database indexes
   - Shared TypeScript database types

   **Visible Result:**
   Database and storage infrastructure fully provisioned and inspectable in Supabase with migrations committed.

   **Dependencies:**
   - Unit 1

---

3. **Telegram Authentication & User Sync**
   **Builds:**
   - Telegram initData verification
   - Auth route handler
   - Session handling
   - Automatic user creation/sync
   - User identity context in Mini App

   **Visible Result:**
   Opening the Mini App authenticates the Telegram user and shows personalized identity/state.

   **Dependencies:**
   - Unit 1
   - Unit 2

---

4. **Telegram Bot File Intake Flow**
   **Builds:**
   - Telegram webhook route
   - File receiving
   - Forwarded file support
   - Temporary upload session creation
   - Upload confirmation messaging
   - Deep link into Mini App

   **Visible Result:**
   User can send a file to the bot and receive a working “Continue in Mini App” flow.

   **Dependencies:**
   - Unit 1
   - Unit 2
   - Unit 3

---

5. **Upload Metadata Draft Flow**
   **Builds:**
   - Upload page
   - Metadata form UI
   - Validation
   - Draft persistence
   - University/department/course inputs
   - Mobile-first upload experience

   **Visible Result:**
   User can open the Mini App after upload and complete/save exam metadata drafts.

   **Dependencies:**
   - Unit 3
   - Unit 4

---

6. **Exam Publishing Pipeline**
   **Builds:**
   - Publish action
   - Metadata persistence finalization
   - Storage-file linkage
   - Visibility states
   - Duplicate upload prevention basics
   - Published exam records

   **Visible Result:**
   User can publish an exam and make it available publicly in the system.

   **Dependencies:**
   - Unit 5

---

7. **Exams Feed & Mobile Browsing**
   **Builds:**
   - Homepage/feed
   - Exam card UI
   - Pagination
   - Loading/empty/error states
   - Responsive mobile browsing experience

   **Visible Result:**
   Users can browse published exams in the Mini App.

   **Dependencies:**
   - Unit 6

---

8. **Search & Filtering System**
   **Builds:**
   - Search by title/course
   - University filters
   - Department filters
   - Semester/year filters
   - Exam type filters
   - Optimized query patterns

   **Visible Result:**
   Users can quickly narrow and locate relevant exams.

   **Dependencies:**
   - Unit 7

---

9. **Exam Preview Experience**
   **Builds:**
   - PDF preview
   - Image preview
   - Metadata display
   - Unsupported file fallback handling
   - Preview page routing

   **Visible Result:**
   Users can inspect exams before downloading.

   **Dependencies:**
   - Unit 7

---

10. **Download & Delivery System**
    **Builds:**

- Direct device download
- Send-to-Telegram download flow
- CDN-backed delivery integration
- Secure file access handling

**Visible Result:**
Users can reliably retrieve exam files from preview pages.

**Dependencies:**

- Unit 9

---

11. **User Dashboard (“Me” Page)**
    **Builds:**

- Uploaded exams list
- Pending uploads list
- Basic account information
- User-specific queries

**Visible Result:**
Users can manage and review their uploads.

**Dependencies:**

- Unit 6
- Unit 7

---

12. **Admin Moderation System**
    **Builds:**

- Admin dashboard routes
- Upload review tools
- Visibility management
- Basic content moderation actions
- Admin authorization enforcement

**Visible Result:**
Admins can review, approve, hide, or manage uploaded exams.

**Dependencies:**

- Unit 6
- Unit 7
- Unit 11

---

13. **Production Hardening & Operational Readiness**
    **Builds:**

- Environment separation checks
- Final RLS verification
- Storage cleanup handling
- Error logging
- Performance optimizations
- Deployment validation
- Final security review

**Visible Result:**
System is production-ready, deployable from a clean clone, and operationally stable.

**Dependencies:**

- All previous units
