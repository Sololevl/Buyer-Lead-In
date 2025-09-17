# Buyer Lead Intake App

## 🔹 Overview
The Buyer Lead Intake app allows you to manage buyer leads efficiently. You can import leads via CSV, validate them on both frontend and backend, and store them securely in a PostgreSQL database. The application is built with **Next.js 15.5.3 and **Prisma** ORM.  

Key features:  
- CSV import/export (max 200 rows per import)  
- Row-level error reporting with validation messages  
- Enum normalization and mapping (`BHK`, `Timeline`, `Status`) for csv import 
- Ownership enforcement via `ownerId`   
- Interactive client components for forms  


## Setup
###```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
# Database
DATABASE_URL="postgresql://postgres.<your-db-identifier>:<your-password>@<your-host>:5432/postgres"

### Clone the Repository
```bash
git clone <repo-url>
cd buyerleadintake
###Install dependencies
npm install
npm install next react react-dom @prisma/client zod
npm install -D prisma

--
### Database Setup
npx prisma migrate dev --name init

###run loacally
npm run dev

###Required CSV import format
fullName,email,phone,city,propertyType,bhk,purpose,budgetMin,budgetMax,timeline,source,notes,tags,status

## Design Notes

### Validation
- Input validation is performed on both **frontend** and **backend**:
  - **Frontend validation** provides immediate feedback to users before submission.
  - **Backend validation** (using **Zod** and Prisma) ensures data integrity and prevents invalid entries from being stored in the database.

- Key validation rules:
  - `BHK` is required only for Apartments and Villas.
  - `BudgetMax` must be greater than or equal to `BudgetMin`.
  - `Status` and other enums are normalized and validated before insertion.
  - CSV imports are also validated with the same rules to ensure consistent data.

### SSR vs Client
- All pages are **client components** (`"use client"`).
- No server-side rendering (SSR) is used.
- This approach simplifies dynamic interactions, form handling, CSV uploads, and client-side state management.

### Ownership Enforcement
- Each lead record is tied to a specific `ownerId`.
- The frontend always passes `ownerId` when creating or importing leads.
- The backend enforces `ownerId` during inserts to prevent accidental or malicious assignment to another user.
- Future improvements could involve moving authentication and authorization to the server for enhanced security.

## What's Done vs Skipped

### Done
- **Database & Data Model:** Created the required Prisma data models for Buyer Leads, including enums for `city`, `propertyType`, `BHK`, `timeline`, `source`, and `status`.
- **CSV Import/Export:** Users can import up to 200 rows from CSV and export existing leads. Proper mapping and validation are implemented.
- **Zod Validation:** Both frontend and backend validations are implemented using Zod to ensure data integrity and consistent error reporting.
- **Authentication:** Implemented authentication using **Magic Link** (email-based login) for secure access.
- **View/Edit Data:** Users can view all leads and edit their details. Ownership of leads is enforced via `ownerId`.
- **Search & Filtering:** Added a search bar with filtering functionality to quickly find leads based on different fields (name, city, status, etc.).
- **Status:** Status included in table, but no inline dropdown quick-action in the table.  

### ⏭ Skipped / Future Improvements
- **Server-side Authorization & SSR:** Currently, all pages are client components and authorization is handled on the client. For      production-grade security, server-side authorization could be added.
- **Role-based Access Control:** Multi-user roles and permissions are not implemented yet.
- **Tag Chips with Typeahead:** Not implemented. Tags are stored as arrays but there’s no chip-based UI with typeahead yet.  
- **Optimistic Edits with Rollback:** Edits are applied after API response, no rollback UX is implemented.  
- **File Uploads (`attachmentUrl`):** Not implemented; could be useful for storing related documents (e.g., ID proof, agreements).  

⚠️ **Note:** From the suggested bonus features, I implemented **basic full-text search** but skipped the others due to time constraints. These skipped items are good candidates for future enhancement.


