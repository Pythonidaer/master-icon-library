# Master Icon Library decisions

Updated: 2026-10-15 (America/New_York)

Repository: https://github.com/Pythonidaer/master-icon-library
GitHub branch: main
Hosted site: https://master-icon-library.codefolio-work.chatgpt.site

The full Website Design Baseline 1.2 from design-practice is preserved in WEBSITE_DESIGN_BASELINE.md. PROJECT_DESIGN_ADDITIONS.md adds the explicit user rule against emojis and text-character icon substitutes. AGENTS.md requires future changes to read both.

## Decisions

| Decision | Reason | Alternative | How to check |
| --- | --- | --- | --- |
| Direct headings: Browse icon libraries; Saved icons; Using icons efficiently | Name the task instead of using slogans | Expressive wording only if it adds concrete meaning | Read every heading and action in context |
| Helvetica Neue / Helvetica / Arial system fallback | Neutral readable reference tool; no external font stylesheet or font requests | A deliberately chosen self-hosted typeface | Review wrapping, fallback rendering, and network requests on phone and desktop |
| Neutral white/gray canvas and charcoal actions | Keep monochrome and multicolor icon artwork primary | An intentionally selected branded accent | Review active states, focus, and contrast |
| Small 2px interface corners | Restrained control geometry for a reference tool; neither pills nor a forced sharp-corner theme | Squared controls or another documented radius | Review controls and overlapping panels at mobile size |
| Tiles remain for libraries and icons | These are parallel catalog entries, where a grid directly supports comparison | Dense list/table for metadata-heavy tasks | Review scanning and touch interaction |
| Lucide SVG control family; plain text external links | Deliberate consistent geometry and no emojis or character icons | Another approved SVG family | Inspect saved SVG sources and labels; check accessible names |
| Header links without a hamburger or drawer | Three short local destinations fit a simple navigation row | A full-height drawer if destination count grows | Review at 320px and increased text size; compact row may scroll horizontally rather than wrap |
| Static reserved-size skeletons | Preserve grid geometry without decorative shimmer or fake progress | Real progress display or restrained drawing animation | Check before/after geometry on slow network; static icon placeholders match tile height |
| Keep pagination pending user review | A bounded 96-icon DOM and predictable browsing | Load more or virtualized infinite scrolling | Review next/previous, filtering, keyboard focus, and large sets |
| Name indexes plus content-hashed SVG chunks of up to 256 icons | Avoid downloading whole collections to render one page; protect against stale mixed data | Per-icon files or API batching | Tests verify coverage, chunk limits, index references, and actual serialized byte counts |
| Show full JSON size and gzip estimates | Make measured storage payload distinct from an app's actual icon usage | Display live browser transfer timings | Verify bytes against generated files; never label estimates as network measurements |
| No third-party icon API calls | Serve bundled licensed data predictably from this site | Runtime API for a different product with unknown icon names | Inspect request URLs on a fresh browser session |
| Bounded parsed-data session cache | Avoid retaining every opened SVG collection indefinitely | A configurable persistent cache | Tests verify reuse, eviction, retry, and required-chunk fetching |
| Keep native SVG art and collection-specific variants | Preserve library comparisons and completeness | Do not normalize the icon artwork to the control family's appearance | Compare source counts and names against pinned dependency data |

## Verification

Production build and eight automated checks passed, including full source-name coverage, chunk/index integrity, measured JSON and gzip sizes, data-client caching/retry, SVG modification, and JSX conversion. A later CSS-only spacing revision was included in the final build.

Browser automation is unavailable in this environment. Source, build, and data checks do not establish mobile Safari geometry, keyboard focus appearance, text-size behavior, or absence of visual layout shifts. Skeletons reserve space by design; their actual appearance remains for device review.

## Preserved scope

The baseline's Johnny UI default applies to Design Lab and Code Quality. This new icon-reference project deliberately uses Lucide for its own controls while retaining every collection's original artwork in the catalog. Shore's Helvetica choice, square Contact button, reference dropdown, and reveal animations are not automatically copied as mandatory components here.

The new no-emojis rule applies to design and interface copy. All control glyphs are real SVGs or clear text. The icon catalog can still show SVG artwork supplied by its original libraries.

## Load more and reference navigation — 2026-10-15

- GitHub is now the primary working source, as requested. The last published ChatGPT-hosted source was already synchronized into this repository before these changes. Updating GitHub does not automatically update that separately hosted copy.
- Replaced Previous/Next pagination with Load more. The initial batch is 96 icons; each request adds up to 96 more. Existing SVGs stay mounted while new chunks load. Append failures preserve existing tiles and offer retry. Query, collection, variant, and library changes reset the batch limit.
- Show the number of displayed icons and the filtered total. Loading placeholders are appended below existing tiles instead of replacing the entire grid. Pointer activation preserves browsing position; keyboard activation moves focus to the first newly added icon once ready.
- Adapted the actual design-practice navigation from commit 2a050335fac6cd3b191e1f6510df823f3143736b. Use a 68px sticky header, 14px blur, 160% saturation, 78% background opacity increasing to 92% after 8px scroll, and a subtle scrolled border.
- At 1080px and below, a circular hamburger toggle opens one full-width dropdown below the header. The header is frosted; the dropdown stays solid white, matching the reference's readability correction. No backdrop, focus trap, or page scroll lock.
- The 44px toggle is a touch-size adaptation of the reference's circular control. Its real SVG lines animate to an X over 250ms; the dropdown fades and rises 8px over 220ms. This explicitly selected reference hamburger is an exception to the saved Lucide control family; it introduces no emojis or character icons.
- Closed mobile links are inert and hidden from assistive technology. Escape returns focus to the toggle; selecting a destination closes the dropdown; outside pointer/focus and breakpoint changes close it. Reduced-motion preferences remove the transitions. Desktop retains the same horizontal navigation list.
- Main tile styling and bullet separators remain unchanged while Johnny reviews alternatives.

Verification at commit preparation: source review completed and regression tests added for retained SVG identity, append-only fetch planning, filter resets, and complete-batch ordering. The local execution environment is unavailable. GitHub Actions performs production build and tests; browser/mobile Safari verification remains pending.

## Mobile toolbar and content cleanup — 2026-10-15

User screenshots showed competing title/count columns, repetitive introductory wording, an oversized search field, and inconsistent spacing before the icon tiles.

- Removed the home breadcrumb, introductory helper paragraphs, title-side counts, duplicate “33 collections” row, and the total-size explanation above the tiles. Size explanations remain on Considerations.
- Use one page heading (“Icon libraries”, selected library name, or “Saved icons”). Retain one results count above the icon grid and the useful Load more count below it.
- Removed the visible slash shortcut hint. The existing keyboard shortcut still works on desktop.
- Search and toolbar selects share an explicit 44px height. Reset native search input padding/appearance so Safari does not add extra height. Use 16px mobile text to preserve readable controls without focus zoom.
- Replace the homepage's clipped horizontal category tabs with a compact category dropdown. Place icon search above two aligned dropdowns on mobile; use aligned controls in one row when space permits. Collapse the home search/category pair on very narrow screens.
- Remove repeated source prefixes beneath icons when the selected library has only one source collection. Retain prefixes for mixed-source grids and saved icons.
- Consolidated the original toolbar rules rather than appending conflicting overrides. The approved header/menu source and its CSS are unchanged.

Verification: source review and production build checks; mobile Safari appearance still requires device review. No icon catalog or loading behavior was changed.

## Sortable sizes, consistent previews, and automatic scrolling — 2026-10-15

- Library data sizes now sort by name, raw JSON bytes, gzip estimate, and total request count. Header buttons toggle ascending/descending order; aria-sort communicates the selected ordering. Sorting uses numeric byte counts, not rounded display strings, and leaves the source catalog unchanged.
- Restore the filtered library count below the homepage toolbar, using the same section-meta area as the icon count on library pages. Keep the removed technical helper sentence out of that area.
- The old preview picker accepted four or five common-name matches without filling the remainder. Replace it with a shared six-preview selector that skips blank SVGs and duplicate alias artwork, prefers comparable subjects, and fills remaining slots from valid collection icons. Full collection contents remain unchanged.
- User selected infinite scrolling instead of Load more. A sentinel 240px below the viewport boundary triggers one next batch of up to 96 icons. In-flight guards prevent duplicate requests; previously displayed tiles remain mounted. Pause on failures and while the inspector or comparison is open. A visible retry action handles failure.
- A manually activated fallback remains accessible to keyboard/screen-reader users, and visible for browsers without IntersectionObserver. Automatic scrolling does not take keyboard focus or reset the scroll position. Existing keyboard focus handling applies only to explicit manual activation.
- The grid is not virtualized in this iteration. Data requests remain chunked and cached, but mounted SVG tiles grow during very long browsing sessions; virtualization remains a future performance option rather than a claim about this implementation.

Verification: production build, full source/catalog coverage and six-preview assertions, numeric sorting tests, preview fallback tests, and existing batch/cache/export checks. Browser/mobile Safari interaction testing is unavailable in this environment and remains for device review.
