Quora Question and Keyword Search — Detailed Instructions

Overview
--------
This project is a minimal React + TypeScript frontend (Vite) called "Quora Question and Keyword Search". It helps you construct Google search queries to find Quora questions by selecting question patterns and keywords. The UI is intentionally simple and responsive, and it uses Tailwind CSS for styling.

Core features implemented
------------------------
- Optional "Quora Space or Topic" input (included as a quoted phrase when filled).
- Question pattern groups with expandable option lists (How, Can, What, Is/Are, Has/Does/Anyone, Where).
- "Other" patterns: a comma-separated input for custom question patterns.
- Custom keyword / phrase input (added as a quoted phrase when present).
- Live-updating query preview that shows the final Google query in real time.
- Buttons to Reset All, Search on Google (opens a new tab), and Copy Query to clipboard.
- LocalStorage persistence for the last-used topic, patterns, other-patterns text, and custom keyword.
- Dark mode toggle (persisted) and fully responsive layout.

Files added/modified
--------------------
- Added: `INSTRUCTIONS.md` (this file)
- Modified: `package.json` — added Tailwind + PostCSS devDependencies
- Added: `tailwind.config.cjs` — Tailwind configuration (content paths, dark mode)
- Added: `postcss.config.cjs` — PostCSS configuration for Tailwind and Autoprefixer
- Modified: `src/index.css` — now includes Tailwind directives and a couple of small app-specific rules
- Modified: `src/App.tsx` — replaced default template with the Quora query builder UI

How to install and run
----------------------
1. Install dependencies (this will install Tailwind and PostCSS):

   npm install

2. Start the dev server:

   npm run dev

3. Open the app in your browser (Vite will log the dev URL, usually http://localhost:5173).

Notes about Tailwind
--------------------
- Tailwind and PostCSS have been added as devDependencies. The main CSS file (`src/index.css`) now uses the Tailwind directives (@tailwind base, components, utilities).
- Dark mode uses the `class` strategy — toggling dark mode adds/removes the `dark` class on the HTML element.

LocalStorage keys
-----------------
- `quora-search-state` — stores topic, customKeyword, selectedPatterns, and otherPatternsText (JSON).
- `quora-search-dark` — stores dark mode boolean as a string (`"true"` / `"false"`).

Behavior details
----------------
- The generated query always starts with `site:quora.com`.
- Quoted phrases are added for the topic and the custom keyword/phrase when provided.
- Selected patterns and any comma-separated custom patterns from the "Other" input are included in the query inside parentheses, joined with `OR`, each wrapped in quotes. Example:

  site:quora.com "AI agents" ("how do" OR "how can" OR "what is")

- When there are no selected patterns and no other custom patterns, the preview will show the base `site:quora.com` along with any quoted topic/keyword if present.

Accessibility and UX notes
--------------------------
- All inputs are controlled React components that update the preview in real time.
- The group-level checkboxes become indeterminate when some (but not all) child options are selected.
- Copy-to-clipboard provides brief visual feedback.
- Reset All clears inputs and removes the saved state in localStorage for a clean slate.

Extending the app
------------------
- Add more groups or patterns by editing the PATTERN_GROUPS constant in `src/App.tsx`.
- Export/import saved query presets via JSON to keep more than the single last configuration.

If anything breaks after installing, run `npm install` again and restart the dev server.

Enjoy!
