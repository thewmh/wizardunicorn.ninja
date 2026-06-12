# Building and Deploying

## Prerequisites

- **Node.js 20** (matches the version used in CI — see `.github/workflows/main.yml`)
- Install dependencies from the `astro/` directory:

  ```
  cd astro && npm ci
  ```

## Local Development

**Astro dev server** (active build):

```
# from astro/
npm run dev
```

Starts the Astro dev server with hot reload at `http://localhost:4321`.

**Jekyll dev server** (legacy — see [Jekyll (Legacy)](#jekyll-legacy) below):

```
# from repo root
npm run serve
```

## Build

Run from the `astro/` directory:

```
npm run build
```

This runs `astro check` (TypeScript type-check) followed by `astro build`. Output is written to `astro/dist/`.

To preview the production build locally:

```
npm run preview
```

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/main.yml`).

**Trigger:** push to `main`

**Steps:**
1. Checks out the repo on `ubuntu-latest` with Node 20
2. Runs `npm ci` in `astro/`
3. Runs `npm run build` in `astro/`, producing `astro/dist/`
4. Deploys `astro/dist/` to the `dev` branch using `peaceiris/actions-gh-pages@v3`

GitHub Pages is configured to serve the `dev` branch at `wizardunicorn.ninja`. There is no manual deploy step.

## Jekyll (Legacy)

Jekyll source files (`_data/`, `_includes/`, `_layouts/`, `_sass/`, `blog/`, etc.) remain in the repo root for reference. They are **not** built or deployed. The active build is Astro only.
