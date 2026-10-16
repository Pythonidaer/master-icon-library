# Master Icon Library

A minimal React reference for choosing icons for future projects. Start with a grid of 33 libraries, browse every bundled icon, then inspect, customize, download, or save a shortlist.

## Use it

- Select a library tile. Search by name, narrow to a source collection, and filter named native variants.
- Every collection is complete for the exact dependency versions in `package-lock.json`. The first catalog contains **178,795 named icons, variants, and aliases** across 33 library tiles. Counts include alternate sizes, weights, styles, historical versions, and aliases; they are not counts of unique designs.
- Browse an initial 96 icons; scrolling near the bottom automatically appends the next batch without returning to the top. A retry button appears after failures, and a keyboard-accessible manual fallback remains available. Icons are generated locally and served with the site. Name indexes load for the selected library; only the SVG chunks needed for the requested batch are fetched. There is no live icon API dependency.
- Select an icon to edit size, foreground, rotation, flips, opacity, scale, offsets, and animation. Genuine stroked SVGs expose width, cap, join, and dash controls. SVG palettes and secondary opacity appear when present. Native weights and filled styles are discrete variants, not simulated strokes on filled artwork.
- Preview on any background. Copy SVG, JSX, or the icon identifier, or download a customized SVG. Background color stays in the preview.
- Star icons to keep a shortlist in this browser. Compare up to four customized icons side by side.
- `/` focuses search. Escape closes the inspector. The inspector traps keyboard focus and restores it on close.

## Coverage

Lucide; Phosphor; Tabler; Heroicons (current and v1); Iconoir; Font Awesome Free (versions 4–7); Ant Design; Bootstrap; Boxicons (current and v2); Circum; css.gg; Feather; Flat Color; Octicons; Grommet; IcoMoon Free; Ionicons; Line Awesome; Material (Material Design Icons, Material Design Light, Google Material Icons, Material Symbols and Material Symbols Light); Radix; Remix; Simple Line; Themify; Typicons; VS Code Icons and Codicons; Simple Icons; Devicons; Game Icons; Weather Icons; Carbon; Fluent; Unicons; IconPark.

React Icons and Iconify are data/integration tools, not extra visual libraries, so they are linked as sources rather than duplicate library tiles.

## Scope and licensing

- Font Awesome Pro and other paid styles are not bundled; a separate license and authorized assets are required.
- Bundled collections expose the complete data in the pinned sources, not a guarantee that every upstream release has already reached those sources. Rebuild after updating dependencies to refresh.
- Controls edit actual SVG features. This is not a replica of every upstream JavaScript component API. For example, Material Symbols' bundled discrete variants are available, but a variable font's continuous axes are not. Arbitrary component props, library-specific event handlers, and custom third-party icon uploads are outside this browser's scope.
- Native variant matching uses naming conventions; related variants with unrelated names remain accessible through search and the full collection grid.
- Each source collection's license and attribution link is shown inside the browser. Preserve the applicable upstream license/attribution when reusing icons. Brand usage can carry additional trademark restrictions.
- Favorites are local to this browser and device. No account, database, or analytics.
- Animation starts only when explicitly selected in the inspector. Exported SVGs include that animation.

## Working source

This repository is the primary working source. It contains the React app, full catalog generator, pinned dependencies, tests, and documentation from the last published ChatGPT preview, plus subsequent GitHub changes. The ChatGPT-hosted copy is a separate published snapshot and does not update automatically when this repository changes.

Mobile navigation uses the design-practice hamburger disclosure: frosted sticky header, solid dropdown, and one shared desktop/mobile link list. Main tile separators remain unchanged pending design review.

## Development

Requires Node 22+.

```sh
npm ci
npm run build
npm test
npm run dev
```

Build once before the first dev session to generate `public/data/`. The data generator resolves all Iconify aliases and transforms, then adds the full Themify and original Devicons exports from React Icons. It writes content-hashed name indexes and SVG chunks (up to 256 icons per chunk), with measured serialized JSON byte counts and build-time gzip estimates. Vite outputs the static app to `dist/`.

Tests compare every included source collection name against the installed upstream data, verify chunk/index references and measured JSON/gzip sizes, validate every icon's dimensions, and check data fetching/cache/retry behavior, SVG transforms, JSX attribute conversion, palette edits, stroke handling, and native variant grouping. Codicons' intentionally blank icon is retained.

GitHub Pages deployment is included. Enable **Settings → Pages → Source → GitHub Actions** if Pages is not already enabled. The relative Vite base works under `/master-icon-library/` and at a domain root.

## Sources

- https://iconify.design/
- https://github.com/iconify/icon-sets
- https://react-icons.github.io/react-icons/

## Verification

Production build and automated checks run before publication. Browser visual QA was unavailable in the authoring environment; review layout and interactions on your phone and desktop.

## Design and performance guidance

- [WEBSITE_DESIGN_BASELINE.md](WEBSITE_DESIGN_BASELINE.md): full preserved baseline, version 1.2.
- [PROJECT_DESIGN_ADDITIONS.md](PROJECT_DESIGN_ADDITIONS.md): no emojis or text-character UI icons.
- [AGENTS.md](AGENTS.md): project instructions for future changes.
- [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md): applied decisions, scoped exceptions, and verification limits.
- [LOADING_AND_BROWSING_OPTIONS.md](LOADING_AND_BROWSING_OPTIONS.md): loader alternatives and pagination, Load more, and infinite-scroll trade-offs.

The homepage shows each library's full generated JSON size and gzip estimate. The Considerations page explains request patterns, tree shaking, local SVGs, runtime APIs, caching, and production measurement. These figures are neither npm package installation sizes nor the payload added when a production React app imports a few icons.

## Catalog browsing updates

The homepage displays the filtered library count below its filters. Every library tile shows six distinct preview SVGs; short preferred-icon matches are filled with additional valid icons. The Considerations size table sorts by name, raw JSON bytes, estimated gzip bytes, or total data requests; selecting the same column reverses direction.

Infinite scrolling uses IntersectionObserver with a 240px preload margin. It requests one 96-icon batch at a time, pauses on error or while the inspector/comparison is open, and retains existing tiles during loading. It is not yet virtualized: tiles accumulate as you continue scrolling, so windowed rendering remains a possible improvement for very long browsing sessions.
