# Loading and browsing options

Status: Load more is now implemented in batches of up to 96 icons. Static reserved-size skeletons remain in place; additional placeholders appear below existing results. Pagination and infinite scrolling are retained below as comparison options.

## Loading screens

| Option | Fit for this interface | Trade-offs |
| --- | --- | --- |
| Static skeleton tiles | Recommended default. Reserve the same grid columns and icon-tile height; replace placeholders with SVGs without a full-screen interruption. | Shows structure but does not communicate exact completion. Actual layout behavior needs device review. |
| Segmented progress meter | A restrained game-like treatment: small rectangular segments above the grid, paired with a factual status such as “Loading 2 of 4 data files.” | File completion can be measured, but files have different sizes, so file count is not byte progress. Byte percentage requires a known total and streamed response accounting. It must not claim 100% until parsing and rendering are ready. |
| Animated outline icon | A small Lucide-style shape drawn while loading, alongside the stable skeleton grid. | An indeterminate activity cue, not progress. Respect reduced-motion preference. Adds motion without reducing the network work. |

Avoid simulated percentages, mandatory mini-games, full-screen loaders for page changes, excessive shimmer, and artificial minimum waits. Use a clear retry action after failure. Cached data should appear promptly rather than waiting for an animation.

## Pagination and alternatives

Yes: Previous, Next, and a page indicator such as “1 of 4” are pagination.

| Pattern | Benefit | Cost |
| --- | --- | --- |
| Pagination | Predictable location and bounded rendered content; straightforward jump-to-page controls | Repeated clicks interrupt visual scanning. Shareable positions also require URL state, which the current browser does not yet provide. |
| Load more | Appends the next batch without moving the visitor to the top; clear user control over additional downloads | More clicks than automatic loading; the DOM grows unless older content is virtualized. |
| Infinite scrolling | Continuous visual browsing; can prefetch near the bottom with IntersectionObserver | Easy to lose position or overshoot; restoring history and keyboard focus takes care; the footer becomes hard to reach; memory and DOM size grow without limits. |
| Hybrid | Automatically append the first few batches, then show Load more | Balances continuity and intentional loading but introduces an extra behavioral rule to explain. |

Current choice: Load more is the selected alternative for this catalog. If continuous scrolling is preferred after testing, pair it with virtualization, saved scroll/filter position, a visible count, a retry control, and an accessible manual loading fallback. Virtualization means only nearby tiles remain mounted, rather than keeping thousands of SVGs in the DOM.

Fetching data and rendering tiles are separate costs. Changing to infinite scrolling alone does not reduce either cost. The current name-index/chunk approach already avoids full-library downloads and can support any of these browsing patterns.

## Sources

- https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- https://web.dev/articles/virtualize-long-lists-react-window
- https://web.dev/articles/optimize-cls/
- https://lucide.dev/guide/react/
- https://iconify.design/docs/icon-components/
