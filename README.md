# Buyer Lead Intake App

## Overview & Flow
This is a modern, full-stack application designed for real estate professionals to manage buyer leads with efficiency and style. Built with a Next.js frontend and a Supabase/PostgreSQL backend, this CRM provides a seamless, secure, and highly responsive user experience.

The user flow is designed for simplicity and security. A user signs in via a secure magic link sent to their email. Once authenticated, they are taken directly to the main dashboard where they can view, search, and filter all company leads. Users can add new leads or edit/delete leads they personally own, with all data changes reflected in real-time. The application also supports bulk data management through a robust CSV import/export system with row-level validation.

✨ Core Features
Modern UI/UX: A complete visual overhaul featuring a "Command Center" dark theme with yellow and red accents, designed for clarity and aesthetic appeal.

Full CRUD Functionality: Create, Read, Update, and Delete buyer leads with robust ownership rules.

Live Search & Filtering: A dynamic search bar and filter system that updates the lead list in real-time as you type, thanks to debounced API calls for a smooth UX.

URL-Synced State: All active filters and search queries are synced to the URL, allowing for shareable and bookmarkable views.

Secure Magic Link Authentication: Passwordless login system handled by Supabase Auth for a secure and user-friendly experience.

Robust CSV Management:

Import: Bulk import up to 200 leads from a CSV file.

Row-Level Validation: Each row is validated against the schema, with clear, actionable error messages displayed for any invalid entries.

Filtered Export: Export the currently filtered list of leads to a CSV file.

Polished User Experience:

Skeleton Loaders: Sleek, content-aware skeleton loaders provide a smooth loading experience while data is being fetched.

Interactive Elements: Dynamic hover effects, custom modals, and animated icons from lucide-react create an engaging interface.

Responsive Design: The entire application is designed to be fully functional and visually appealing on all devices, from mobile phones to desktops.

🛠️ Tech Stack
Framework: Next.js (App Router)

Language: TypeScript

Database: Supabase (PostgreSQL)

ORM: Prisma

Validation: Zod (for both client and server-side validation)

UI: Tailwind CSS

Icons: Lucide React

Authentication: Supabase Auth

Deployment: Vercel


🚀 Getting Started
Follow these steps to set up and run the project locally.

Prerequisites
Node.js (v18 or later)

npm or yarn

Git

A free Supabase account

1. Clone the Repository
git clone [https://github.com/YourUsername/your-repo-name.git](https://github.com/YourUsername/your-repo-name.git)
cd your-repo-name

2. Install Dependencies
npm install

3. Set Up Supabase & Environment Variables
      Create a new project on Supabase.

      In the project's root, create a new file named .env.

      Copy the contents of .env.example into your new .env file.

      Navigate to Settings > API in your Supabase dashboard to find your URL and anon key.

      Navigate to Settings > Database to find your database connection string.

      Important: It is highly recommended to use the Transaction Pooler URL (the one with port 6543) to avoid common network firewall issues.

      Fill in your .env file with your project's specific credentials. 

4. Database Setup:
npx prisma migrate dev --name init

5. Run loacally:
npm run dev

### Required CSV import format
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
- **Dynamic Dashboard:** A real-time, debounced search and filter system with URL state synchronization is complete. This provides a fast, modern experience by updating the leads list automatically as the user types, eliminating the need for a "submit" button.
- **Database & Data Model:** Created the required Prisma data models for Buyer Leads, including enums for `city`, `propertyType`, `BHK`, `timeline`, `source`, and `status`.
- **CSV Import/Export:** Users can import up to 200 rows from CSV and export existing leads. Proper mapping and validation are implemented.
- **Zod Validation:** Both frontend and backend validations are implemented using Zod to ensure data integrity and consistent error reporting.
- **Authentication:** Implemented authentication using **Secure Link** (email-based login) for secure access.
- **View/Edit Data:** Users can view all leads and edit their details. Ownership of leads is enforced via `ownerId`.
- **Search & Filtering:** Added a search bar with filtering functionality to quickly find leads based on different fields (name, city, status, etc.).
- **Status:** Status included in table.

### ⏭ Skipped / Future Improvements
- **Server-side Authorization & SSR:** Currently, all pages are client components and authorization is handled on the client. For production-grade security, server-side authorization could be added.
- **Role-based Access Control:** Multi-user roles and permissions are not implemented yet.
- **Tag Chips with Typeahead:** Not implemented. Tags are stored as arrays but there’s no chip-based UI with typeahead yet.  
- **Optimistic Edits with Rollback:** Edits are applied after API response, no rollback UX is implemented.  
- **Communication Logging:** Add a feature to log interactions such as calls, emails, or meetings. Each log could include notes and a timestamp, creating a comprehensive and filterable communication history for each lead.


