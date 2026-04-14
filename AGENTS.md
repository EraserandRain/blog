# Repository Guidelines

## Project Structure & Module Organization
- `docs/` contains the published content, organized by section folders such as `docs/frontend/`, `docs/backend/`, `docs/ops/`, and `docs/others/`.
- `docs/.vitepress/` holds the active VitePress config, theme entry point, and shared theme settings.
- `docs/components/` stores reusable Vue single-file components used inside Markdown, such as `docs/components/card.vue`.
- `.vuepress/` and `backup/` are legacy/reference material from earlier site iterations; only change them when intentionally maintaining the old setup.
- `public/` is the generated build output from VitePress and should not be edited by hand.

## Build, Test, and Development Commands
- `pnpm install` installs dependencies from `pnpm-lock.yaml`.
- `pnpm docs:dev` starts the local VitePress authoring server.
- `pnpm docs:build` generates the production site into `public/`; run this before opening a pull request.
- `pnpm docs:preview` serves the built site for a final smoke check.
- `bash deploy.sh` rebuilds and force-pushes the generated site to GitHub Pages; use it only for intentional deployments.

## Coding Style & Naming Conventions
- Write Markdown in UTF-8 with concise frontmatter and clear heading structure.
- Keep file and directory names lowercase. Prefer kebab-case for evergreen topics, for example `mysql-safe-config.md`, and preserve existing date-based note names when extending a series.
- Follow the existing site-code style in `.vitepress/`: 4-space indentation, single quotes, and small focused config/modules.
- Prefer updating shared config or reusable Vue components over copying repeated markup into multiple Markdown files.

## Testing Guidelines
- There is no automated unit-test suite in this repository; `pnpm docs:build` is the required verification step.
- For navigation, theme, or component changes, also run `pnpm docs:dev` or `pnpm docs:preview` and check links, menus, and embedded Vue components manually.
- When adding a new page, confirm it is reachable from navigation, index pages, or in-page links.

## Commit & Pull Request Guidelines
- Recent history mostly uses Conventional Commit prefixes such as `feat:` and `perf:`; prefer `docs:` for content and theme-only updates.
- Keep commit subjects short and imperative, and avoid placeholder messages like `testing...`.
- Pull requests should include a brief summary, affected paths, local verification performed, and screenshots for visible UI or theme changes.
- Link related issues, notes, or deployment context when applicable.
