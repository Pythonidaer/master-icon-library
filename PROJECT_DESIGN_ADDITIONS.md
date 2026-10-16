# Master Icon Library design additions

Applies to the interface, navigation, labels, feedback, loading states, documentation examples of interface copy, and future design changes in this repository.

## No emojis

- Never use emojis in this website's design or interface copy.
- Do not use Unicode arrows, stars, magnifying glasses, crosses, sparkle marks, or similar text characters as substitutes for interface icons. This includes symbols that a browser may render as emoji, even when they look monochrome elsewhere.
- Do not append an arrow character to external links. Clear text labels are sufficient unless an SVG external-link icon has a specific purpose.
- Use real SVGs from the deliberately selected interface icon family when an icon is useful. Use plain text when an icon adds no meaning.
- Keep icon-only controls accessible through names on the buttons themselves. Hide decorative SVGs from assistive technology.
- Icon artwork inside the catalog remains the collection's original SVG content; the interface must not substitute emoji glyphs for that artwork.

## Scope and preservation

Read WEBSITE_DESIGN_BASELINE.md together with this file before editing. The full baseline is preserved from Pythonidaer/design-practice; do not replace it with a shorter summary. This addition overrides any inferred permission to decorate this project with emojis or text-character icons.

This site uses Lucide SVGs for its own controls, not Johnny UI. That is an intentional project-specific family choice; the preserved baseline scopes the Johnny UI default to Design Lab and Code Quality. Do not change the icon collections being browsed to match the interface family.

Record design decisions and verification limits in DESIGN_DECISIONS.md.

## Explicit navigation adaptation

The user selected the design-practice dropdown for this project. Use its frosted sticky header, animated real-SVG hamburger, and solid mobile dropdown. The hamburger is an intentional exception to the saved Lucide control shapes; no emojis or text-character icon substitutes are allowed. Keep the dropdown opaque for readability. This component is a nonmodal disclosure, not the baseline's optional full-height drawer.
