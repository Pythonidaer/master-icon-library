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

## Dark canvas and footer — 2026-10-16

- User selected the Musculoskeletal reference's darker background while keeping white tiles. Use its recorded #0E0F12 canvas, #16181C elevated surface, and #F4F6F8 foreground. Keep the existing typography, layout, and small interface radii.
- Header remains frosted, using the same 78%/92% opacity and blur against the new dark canvas. The mobile dropdown remains opaque, now #16181C with light text. Menu geometry and behavior are unchanged.
- White library/icon tiles, search fields, selectors, inspector, and comparison panels retain dark text and local light-surface color tokens. The theme does not recolor the icon artwork. Native controls on these surfaces use a light color scheme.
- Simplify the footer to a prominent catalog-derived total and two plain links: GitHub and Icon sources. Remove repeated branding, tool names, and the build date. A small caption explains that the count includes variants and aliases. The total uses every library regardless of the active filter, not the displayed subset.
- Footer spacing stacks naturally on mobile and reserves extra clearance only when the comparison tray is active. Browser theme-color matches the dark canvas.

Verification: production build and calculated foreground/background contrast checks. Deployment does not establish mobile Safari visual correctness; device review remains necessary.


## Compact library rows and filter chips — 2026-10-15

- User selected compact single-column white library rows at all widths. Put the name and adjacent category at the left, bold total at the right, six 32px previews in one strip, and one size line below. Remove set counts, dot separators, raw-size duplication, and the detached category eyebrow. Raw sizes remain in Considerations.
- Label the single size line “gzipped estimate”; these build-time estimates are not measured network transfers. Keep the scope explanation in Considerations.
- Search takes the full toolbar width. Categories use horizontally scrolling chips with one-tap filtering and aria-pressed state. Library/saved pages use the same component for collection and variant filters, retaining all existing options. Omit the collection group for single-source libraries and variant groups without options. Native selects remain only in the inspector where they configure artwork.
- Chips use explicitly requested rounded geometry. Horizontal scrollers reserve focus-outline clearance, keep options in a single line, and let focused/selected options scroll into view. Selected chips use a white surface and bold text; library rows stay white through hover/press, with a stronger border instead of gray shading that resembles a disabled state.
- Loading placeholders share the new row structure and six-preview strip. Menu, icon coverage, and automatic loading remain intact.

Verification: production build, catalog/batch/export regression checks, and source review. Mobile Safari layout, chip scrolling, focus, and increased-text behavior still require device review.


## Dense individual icon views — 2026-10-15

- Apply the user's four-column square layout to both library and saved-icon grids on mobile. Use six, eight, then ten columns as the viewport grows. Each tile has a 28px icon and an 11px single-line ellipsized name; full name and source remain accessible and visible in the detail sheet. Mixed-source grids include the source prefix in the same truncated label.
- Replace white icon tiles with #1C2026 surfaces and light currentColor artwork. Preserve native fixed-color artwork, using a small light matte beneath such artwork so dark painted details remain readable. Homepage library rows remain white. Export and inspector defaults are unchanged.
- Remove repeated favorite-star controls. Saving/removing is a labeled action in the inspector, and only saved tiles display a small filled dot. Empty-state instructions now describe this workflow.
- Keep the last opened tile selected using an accent border, inset stroke, and faint tint after the sheet closes. Expose the current tile semantically and preserve keyboard focus indicators.
- Reduce the library/saved heading to 24px, with the unfiltered icon total beside it, without dot separators. Keep displayed/filtered counts above the grid.
- Search and filter chips stay sticky immediately below the 68px site header. The opaque toolbar stays below header navigation and dialogs in the stacking order. A measured toolbar height provides scroll clearance for focused tiles. Loading placeholders use matching square geometry. Infinite scroll and complete icon coverage are preserved.

Verification: production build, catalog/batch/export regression tests, source review, and text contrast calculations. Per-screen capacity depends on viewport and visible filter groups; 20–24 is not a verified device measurement. Safari sticky behavior, enlarged text, tile selection, and touch interaction still require device review.


## Mobile considerations and quiet footer — 2026-10-15

- Replace the approach comparison table with stacked cards, each naming what loads and when to use it. Mark direct React imports as the usual starting point and full-collection loading as avoid-by-default.
- Order the page Approach, Steps, Sizes, then Sources; add jump-link chips. Lead with one brief whole-library-size callout. Avoid promising a fixed few-kB cost without measuring the selected artwork/build. Put technical definitions and transfer caveats in a collapsed “How we measure” disclosure.
- Bold each step's actionable opening, brighten body copy to #C4CBD4, and tighten reading line-height to 1.55. Native details provides keyboard and disclosure semantics.
- Use a two-column size table that fits phone width: library and selected measure, with numerical totals and decorative linear bars sharing the same maximum. Chips switch gzip estimate, raw bytes, and full-library requests. Separate name/value sort buttons toggle ascending/descending, backed by existing numeric sorting. Announce current column ordering through aria-sort and caption.
- Source links have full-width 48px touch rows and the actual bundled Lucide external-link SVG. This is an explicit requested use of an external-link icon, not a Unicode substitute.
- Make the footer total a quiet 13px line, with user-requested dot punctuation here and a small count qualification. Footer navigation adds Back to libraries and Considerations alongside GitHub and Icon sources, with a divider, 48px targets, and safe-area-aware bottom clearance.

Verification: production build, existing catalog and numeric sorting tests, and source checks. Browser/mobile Safari wrapping, jump positions, disclosures, and touch geometry remain for device review.


## Round 3: navigation, windowing, styles, and inspector — 2026-10-16

- Fix refresh returning home with query-string routes (?library=lucide, ?page=saved, ?page=considerations), using pushState/popstate on the existing GitHub Pages entry point. Session snapshots retain filters, available item limit, and scroll per destination. Restore after the current route's index has loaded, and preserve the scroll offset while opening/closing the inspector.
- Replace the accumulated SVG DOM with a measured virtual window: visible rows plus three overscan rows on either side. Only these SVGs are resolved, plus one retained focused tile. Arrow keys, Home/End, and Tab move within available results and mount the next focused tile. SVG chunks remain in the bounded existing cache. Infinite scroll increases available names by 96; a live sticky count reports available/filtered totals. Failure offers explicit Retry/Load more, Back to top appears after two viewports, and all essential footer destinations remain in the menu.
- The old variantTags helper matched subject words anywhere in names; it generated misleading Lucide filters. Browsing styles now come from collection-declared suffix metadata, with explicit Tabler and legacy Heroicons rules. Size-qualified style names are grouped by style. Count chips before applying the style/topic selection; omit style groups below 5% and omit the row unless multiple eligible styles remain. All named icons/aliases remain available under All styles.
- Add counted Topic chips using source categories when available and clearly scoped subject-name matching for Arrows, Media, Weather, and Devices. Topics are navigation aids, not claims that every collection provides native tags. Search stays primary; Style and Topic remain labeled secondary controls. Filtering resets the available-name limit and the grid position.
- Collapsing secondary filters responds to scroll direction, preserving keyboard-focused controls. Search/count remain sticky, with a stronger bottom edge after scrolling. Resize measurements update grid geometry and focus clearance. Main-grid scroll anchoring is disabled to prevent the browser counteracting the changed filter height.
- Use one dark surface family for library rows, controls, inspector, and comparisons. Use #91B9FF for focus, selected borders, and links; fixed-color artwork keeps its palette with a small contrast matte. CurrentColor previews use the light foreground.
- Mobile inspector is an 85dvh bottom sheet with a handle, drag-down dismissal beyond 90px, explicit close button, inert background, focus containment, and scroll restoration. Its controls scroll while Copy SVG, Copy JSX, and Download remain pinned below. Save/Compare are secondary. Dark/Light/Checkerboard preview choices, custom color/background, Reset, larger range tracks/thumbs, flip toggle chips, and genuine stroke controls remain available.
- Show React import snippets only where generated names are verified against actual installed react-icons exports (Lucide, Phosphor, Tabler). Other collections keep complete SVG/JSX export; do not invent component names or promise a universal component API. The inspector names the library and source prefix.

Verification: regenerated complete catalog, production build, 22 regression tests including route parsing, style thresholds, source-style matching, topic matching, and bounded virtual windows. Browser interaction checks follow deployment; native iPhone Safari, touch dragging, and keyboard-open viewport behavior still require device review.
