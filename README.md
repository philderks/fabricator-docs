# Fabricator Docs

Documentation site for [Fabricator](https://github.com/philderks/Fabricator), built with [Fumadocs](https://fumadocs.dev/) and Next.js.

## Local development

```bash
npm install
npm run dev
```

The development server starts at `http://localhost:3000`.

## Quality checks

```bash
npm test
npm run lint
npm run types:check
npm run build
```

The production build is a static export written to `out/`. Run `npm run preview` after building to serve it locally.

Documentation pages live in `content/docs/`. Sidebar order is configured in `content/docs/meta.json`; the application shell and Fumadocs integration live under `src/app/`.
