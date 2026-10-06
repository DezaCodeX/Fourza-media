<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/0b25c606-47ac-44fa-b8de-db2ccef52d59

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Gallery images

Add supported image files (`.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif`) under `public/gallery/` in a category folder, such as `public/gallery/weddings/` or `public/gallery/college-events/`. The Vite gallery module discovers files and category labels automatically during development and production builds. Image alt text is derived from the filename; use descriptive filenames for accessible labels. Existing curated gallery entries and their optimized previews are maintained in `src/data/gallery.ts`.
