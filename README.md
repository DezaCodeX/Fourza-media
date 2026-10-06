# Fourza Media

Fourza Media uses Vite, React, Express, and Supabase. The Express server serves the site and provides the enquiry and authenticated admin APIs.

## Local setup

1. Install Node.js dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set the server-only Supabase service role key, SMTP settings, and admin bootstrap credentials.
3. Apply [`supabase/migrations/202610060001_fourza_enquiries.sql`](supabase/migrations/202610060001_fourza_enquiries.sql) to the Supabase project.
4. Run `npm run dev`. The app is served at `http://localhost:3000`.

`ADMIN_LOGIN_EMAIL` and a password of at least 12 characters in `ADMIN_LOGIN_PASSWORD` create the first dashboard account when the server starts. The password is salted and hashed before it is stored. After the first account is created, changing those environment values will not reset its password.

SMTP and Supabase secrets must stay in `.env` and must never use the `VITE_` prefix. Set `ADMIN_EMAIL` as the recipient fallback; an authenticated admin can override it under `/admin` → Settings. When the recipient field is empty, the server uses `ADMIN_EMAIL`.

Run `npm run build` to produce the frontend bundle and `npm start` to run the production Express server. The hosting platform must run the Node server rather than serve `dist` as a static-only site, because enquiry handling and the admin dashboard depend on `/api`.

## Gallery images

Add supported image files (`.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif`) under `public/gallery/` in a category folder, such as `public/gallery/weddings/` or `public/gallery/college-events/`. The Vite gallery module discovers files and category labels automatically during development and production builds. Image alt text is derived from the filename; use descriptive filenames for accessible labels. Existing curated gallery entries and their optimized previews are maintained in `src/data/gallery.ts`.
