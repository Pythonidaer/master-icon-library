# WEBSITE DESIGN BASELINE — VERSION 1.2

Apply this baseline when designing or modifying my websites. The goal is clear, usable, deliberately designed work that avoids the recognizable default appearance and phrasing of AI-generated websites.

Treat these as starting constraints, not a finished theme. Preserve explicit project requirements and existing branding. Identify intentional exceptions before implementing them.

## 1. START WITH PURPOSE

• Establish the audience, primary task, and information the visitor needs.
• Make the purpose understandable before adding personality.
• Separate decisions about content organization, layout, appearance, and behavior.
• Ask focused questions when missing information materially changes the design. Otherwise, state reasonable assumptions and proceed.

## 2. AVOID AUTOMATIC VISUAL DEFAULTS

Do not automatically use:
• Purple-to-blue gradients, blurred decorative glows, or gradient headlines.
• Floating pill badges, sparkle icons, or abstract blobs.
• Inter or Roboto as the default font.
• Purple/indigo palettes or beige-and-orange alternatives.
• Uniform three- or four-card feature grids.
• Rounded containers, borders, shadows, or glass effects around every content group.
• The stock hero → logos → feature cards → statistics → closing CTA sequence.

Do not replace these defaults with another mandatory recipe, such as serif fonts, green palettes, square buttons, or asymmetry.

## 3. DEFINE PROJECT-SPECIFIC DESIGN CHOICES

• Define typography roles, color roles, spacing, content widths, and component treatments.
• Choose fonts for readability, subject, audience, and identity. A distinctive font alone does not create a brand.
• Use a coherent color system with readable contrast and clear interaction states.
• Use a consistent spacing scale, allowing documented exceptions when content requires them.
• Record important choices with: decision, reason, alternative, and how to check the result.
• Use references to understand useful principles. Do not blindly reproduce an unrelated website.

## 4. LET CONTENT DETERMINE LAYOUT

• Choose section structures after understanding their content.
• Use cards for genuinely parallel items, ordered steps for sequences, and tables for comparisons.
• Use whitespace and alignment before adding containers.
• Match visual emphasis to informational importance.
• Define margins, column gaps, alignment edges, and readable text widths.
• Specify mobile reading order and responsive changes.
• Use asymmetry when it serves hierarchy, not merely to appear different.
• Give every section a distinct purpose. Remove repeated pitches.

Focus and control spacing:
• Reserve space for the full visible extent of a control in its interactive states, including focus outlines and outline offsets. Outlines do not reserve layout space automatically.
• Keep focus indicators clear of adjacent images, text, and controls. Do not let them overlap or become clipped by containers.
• Give dialog close controls a dedicated, sufficiently spaced controls area when needed. Base clearance on the actual outline thickness and offset rather than an arbitrary universal gap.
• Fix the layout or spacing that causes a collision. Do not remove visible keyboard focus to conceal it.

## 5. WRITE CLEAR HEADINGS AND LABELS

• Page headings identify the subject or task.
• Section headings describe what the section contains.
• Navigation labels identify recognizable destinations.
• Avoid automatic cinematic, editorial, metaphorical, or slogan-like wording.
• Avoid formulas such as “Less X. More Y,” “Where X meets Y,” and “This isn’t X. It’s Y.”
• Avoid em dashes as a default stylistic habit.
• Remove redundant eyebrow labels and subheadings.
• Use plain numbers without leading zeros for visible navigation, steps, sections, project labels, and counters: 1, 2, 3, not 01, 02, 03. Do not add zero-padding for decoration or alignment.
• Preserve leading zeros only where a meaningful format requires them, such as dates, times, or fixed-format identifiers. Document intentional project-specific exceptions.

Examples:
“Unlock your potential” → “Plan your website launch.”
“A starting point. Room for identity” → “Baseline design rules.”
“01 / Water studies” → “1 / Water studies.”

## 6. MAKE ACTIONS AND CONSEQUENCES CLEAR

• Button labels describe the action and, when needed, its object.
• Distinguish saving, sending, submitting, copying, and continuing.
• Explain requirements, consequences, and limitations when visitors need them.
• Describe actual capabilities. Do not promise features the interface does not provide.
• Feedback confirms what changed.
• Errors explain the problem and how to resolve it.
• Use consistent terminology for the same object.
• Choose text, an icon, or both deliberately. Do not automatically add an icon to every action.
• Keep visible labels when a symbol’s meaning would otherwise be unclear.
• Give icon-only controls an accessible name on the control itself. A tooltip alone is not an accessible name.

Current menu-control preference:
• Use an icon-only menu trigger and an icon-only close control.
• Keep the pair visually consistent. Do not remove visible “Menu” text while leaving visible “Close” text without an intentional reason.
• Preserve accessible names such as “Open navigation” and “Close navigation.”
• Use real buttons, visible keyboard focus, and usable touch targets.
• This preference does not mean removing labels from unrelated controls.

Current action-button decision:
• Code Quality’s “Explore the examples” button is intentionally text-only.

Examples:
“Start your journey” → “Add a task.”
“Success!” → “Task added: Check the footer links.”

## 7. AVOID GENERIC PROMOTIONAL COPY

• Avoid “unlock,” “elevate,” “seamless,” “supercharge,” “empower,” and “next level” as interchangeable promotional filler.
• Name the audience, supported action, and concrete result.
• Rewrite paragraphs that could describe several unrelated products.
• Do not invent testimonials, customers, logos, statistics, or performance claims.
• Use a relevant example or demonstration when verified evidence is unavailable.
• Clearly identify fictional sample content.
• Add personality deliberately after the meaning is clear.

## 8. ORGANIZE NAVIGATION BEFORE STYLING IT

• Group related destinations.
• Distinguish example selection, navigation destinations, and contextual actions.
• Do not automatically turn a hamburger into a floating dropdown card.
• Do not allow mobile navigation to become several wrapping rows.
• Indicate the current destination.
• Keep labels consistent across desktop and mobile.
• Add new destinations using the existing navigation’s typography, spacing, numbering, interaction treatment, and responsive behavior.
• Do not append a visually unrelated link to an established navigation system.

Preferred mobile starting point:
A full-height vertical side drawer with grouped links, an explicit icon-only close control with an accessible name, and a plain dark overlay behind it.

This is a preference for our baseline, not a requirement to force a drawer onto every website.

Drawer direction:
• Code Quality’s drawer enters from the right. Preserve that decision there.
• For other projects, choose the direction intentionally rather than assuming every drawer must enter from the left.

Design Lab integration:
• Icon Library is item 31 in the regular navigation and should match the preceding items.
• It is also available through Theme Workshop’s Icons panel.

## 9. IMPLEMENT THE MOBILE DRAWER AS A COMPLETE COMPONENT

• The drawer background must cover the full intended website height without a visible bottom gap.
• Keep the drawer surface opaque and its text sharp.
• Use a plain dark backdrop. Do not blur the page behind the menu.
• Allow navigation content to scroll independently when necessary.
• Support close-button, backdrop, and Escape dismissal.
• Keep keyboard focus inside the open drawer and return it to the trigger on close.
• Prevent background interaction and preserve the visitor’s scroll position.
• Respect device safe areas without shortening the background surface.
• Check behavior when browser controls expand or collapse and when the device rotates.
• Prevent focus changes from requesting browser scrolling to an offscreen control during animation. Use preventScroll where appropriate and verify the actual result.
• Prevent the offscreen drawer from introducing horizontal page or overlay scrolling.
• Preserve independent vertical scrolling for navigation content when clipping offscreen geometry.

Implementation lesson from our experiment:
A document-positioned overlay avoided the clipping encountered with the fixed-position versions. Use it as a tested starting point for this site, not as a universal rule for all browsers.

The later focus-scrolling adjustment was implemented as a targeted response to a reported opening glitch. Do not treat that diagnosis or fix as visually confirmed without browser evidence.

## 10. USE BLUR, SHADOW, AND MOTION INTENTIONALLY

• Apply blur beneath a translucent sticky header when content scrolls underneath it.
• Do not apply blur to the menu backdrop.
• Use a restrained edge shadow when it helps distinguish an overlapping panel.
• Avoid decorative shadows on every section.
• For our current baseline, use a one-second drawer slide.
• Support reduced motion.
• Closing during opening must continue from the current position rather than snap to another position.
• Motion must not cause flicker, page jumps, stranded overlays, or lost interaction states.

## 11. BUILD AND REVIEW IN LAYERS

• Establish purpose and content structure.
• Define layout and responsive behavior.
• Choose typography, color, spacing, and component treatments.
• Add real wording and supported interactions.
• Review mobile behavior and accessibility.
• Refine the result based on observed problems.

Use a focused implementation pass, followed by evidence-based revisions. Do not accumulate unrelated overrides.

## 12. DEBUG ROOT CAUSES

• Inspect existing rules and behavior before changing them.
• Replace conflicting implementations rather than stacking more overrides.
• Keep one clear owner for component sizing and state.
• Distinguish the website viewport, device safe areas, browser controls, and embedded-preview boundaries.
• Treat screenshots as evidence, but do not claim they reveal measurements or causes they cannot establish.
• If a fix repeatedly fails, reassess the diagnosis and rebuild the component when warranted.

## 13. VERIFY HONESTLY

• Check mobile layout, text wrapping, overflow, contrast, focus, and button behavior.
• Check focused, hovered, and active controls against surrounding content. Include the automatically focused close button immediately after a dialog opens, keyboard navigation, narrow screens, and increased text size. Confirm focus indicators remain visible, unclipped, and clear of nearby elements.
• Check navigation opening, closing, interruption, scrolling, and viewport changes.
• Syntax checks and mocked behavior tests do not establish visual correctness.
• Do not report a visible issue as fixed without evidence that it is fixed.
• Clearly distinguish implementation completed, code checks passed, and visual behavior verified.
• Record confirmed improvements and user preferences in the baseline.
• A successful deployment establishes that the change was published, not that its appearance or interaction is correct.

## 14. PRESERVE CREATIVE FREEDOM

This baseline prevents automatic choices. It does not prescribe one permanent aesthetic.

Each project should develop its own typography, palette, imagery, composition, components, and voice. Keep useful conventions when they serve the visitor. Make departures intentional and document why.

## 15. USE AN APPROVED, CENTRALIZED ICON SYSTEM

• Choose the icon family deliberately. Do not automatically use whichever library commonly accompanies the framework.
• Use the project’s approved collection and action mappings.
• The same action should use the same approved symbol throughout the project.
• Do not silently introduce another icon family, substitute emoji or text characters, or redraw an existing symbol differently at each call site.
• When an action has no approved icon, use clear text and identify the missing assignment for review.
• Use icons to communicate an action, destination, object, or state. Avoid decorative filler.
• Keep size, color, spacing, and optical alignment consistent where the context calls for consistency.
• Inherit the local text color when appropriate.
• Do not rely on color alone to communicate a state.
• Hide decorative icons from assistive technology when a visible label already names the action.
• Keep icon-only controls accessible through names on the controls themselves.
• Check legibility at small sizes. Equal bounding boxes do not automatically produce equal perceived size or weight.

Current approved family: Johnny UI

Johnny UI is the approved default for Design Lab and Code Quality. It is a project starting point, not a permanent requirement for every future website.

Approved saved geometry:
• Direction: Soft Sign
• Grid: 32 units
• Arrow stem thickness: 7.5
• General icon weight: 4
• Arrowhead height: 23
• Arrow length: 27
• Family corner softness: 0

The selected preview size was 32 CSS pixels. Do not interpret this as requiring every interface icon to render at 32 pixels. Scale icons appropriately for their controls and surrounding typography.

Use the actual saved SVGs rather than approximating their geometry.

If intentionally editing the family:
• Keep arrow stem thickness independent of arrowhead dimensions and general icon weight.
• Apply shared corner softness to companion shapes, including folder corners.
• Review the family together before replacing the approved version.
• Save the revised profile and SVGs as a coherent update.
• Do not reopen the custom workshop as part of routine implementation unless requested.

Canonical production source:
https://github.com/Pythonidaer/design-lab

Relevant files:
• icons/johnny-ui-profile.json
• icons/johnny-ui-collection.json
• johnny-icons.js

Theme exports must include the approved SVGs and profile so the design decisions travel with the exported project.

## 16. VERIFY THE PROJECT AND PRESERVE THE RULES

• Before editing, identify the intended repository, website, branch, and current source.
• Do not assume similarly named hosted copies and GitHub projects are interchangeable.
• My production Design Lab repository is:
https://github.com/Pythonidaer/design-lab
• Read the repository’s AGENTS.md and applicable project instructions.
• The repository baseline is:
https://github.com/Pythonidaer/design-lab/blob/main/WEBSITE_DESIGN_BASELINE.md
• If a required source cannot be accessed, explain what is missing instead of claiming to have followed it.
• Preserve these rules when updating them. Make focused additions or explicit revisions rather than silently replacing the baseline with a shorter summary.
• Record new approved preferences with their project scope, reason, and verification status.

## Decision record — 2026-10-15

| Decision | Reason | Alternative | How to check |
| --- | --- | --- | --- |
| Icon-only menu trigger and close control | Johnny prefers a consistent visual pair without redundant visible words | Visible “Menu” and “Close” labels when needed for the audience | Check both controls, accessible names, focus, and touch interaction |
| Code Quality drawer enters from the right | Explicit user preference for this app | Left-side drawer for a project that calls for it | Open, close, interrupt, rotate, and vary Safari browser controls |
| Explore action has text only | Keep emphasis on the action without an unnecessary symbol | Text plus a purposeful icon | Compare hierarchy and spacing on mobile and desktop |
| Johnny UI is the approved default for these projects | Preserve the user's chosen symbols and geometry | Another intentionally reviewed project family | Compare actual SVGs and profile to the approved selection |
| Icon Library is item 31 in Design Lab | New destinations belong to the existing navigation system | A separate navigation system only with a clear purpose | Check numbering, styling, wrapping, focus, and mobile scrolling |
| Offscreen focus scrolling is suppressed | Address a likely source of the reported opening glitch | Move focus after a suitable state change, with keyboard behavior preserved | Code change deployed; Safari visual confirmation is still pending |
| Plain visible numbering: 1, 2, 3 | User-approved baseline preference across websites; avoid decorative zero-padding | Leading zeros only for meaningful formats or documented project-specific exceptions | Review visible labels and number formatting; preference confirmed, existing sites not audited by this rules-only change |

| Focus indicators have reserved clearance | User screenshot confirmed the original close-button outline overlapped a photograph; prevent similar collisions | Adjust control layout or outline treatment while retaining visible focus | Check automatically focused dialog controls, keyboard focus, narrow screens, and larger text; spacing correction implemented, browser confirmation pending |

This record distinguishes user-approved design preferences from unverified visual fixes. Do not treat deployment or code checks as proof that the reported drawer glitch is resolved.
