# Meowtion Graphics

The AI motion graphics studio — a kantix.ai-style site built from scratch for MeowSamOP DZN Studio.

- Landing page (`/`) in the motion-graphics-studio style
- Template showcase (`/templates`) with 12 original animated SVG templates and live previews
- Video maker (`/make`): pick a template → write a brief → AI writes the copy → animated preview → download as WebM
- AI copywriter proxy (`api/customize.js`) calls xKiro (`meituan/longcat-2.5-preview:free`); key lives only in the `XKIRO_API_KEY` Vercel env var
- All templates are original SMIL-animated SVGs — no external assets, no Kantix code

## Env vars
- `XKIRO_API_KEY` — xKiro API key (all environments)

## Local dev
Open `public/index.html` directly for the static pages; the maker needs `/api/customize`, so run `vercel dev` for the full flow.
