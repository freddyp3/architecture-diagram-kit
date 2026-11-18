---
name: architecture-diagram-creator
description: >
  Create clean, interactive architecture / system-flow diagrams as a single self-contained HTML file
  (plus PNG export): soft off-white canvas, white rounded cards with colourful flat icons, one accent
  colour that traces the request flow step by step, and drill-down pages for sub-systems. Use when the
  user asks for an "architecture diagram", "system diagram", "flow diagram", a "how the project fits
  together" picture, or a diagram for a README, portfolio, or demo.
---

# Architecture Diagram Creator

You write one small spec file describing the system. The kit turns it into an interactive HTML page
(arrow keys step through the flow; sub-systems open their own page) and PNGs.

`<kit>` below means the folder this file is in.

## Workflow

1. **Understand the system.** Read the project's README and entry points. Write the request flow as a
   numbered story ("user uploads a draft, the API calls the model, ..."). More than about 10 beats means
   too much detail for the overview: move it into a detail page.
2. **Read the look.** Open `<kit>/examples/web-app/flow.png` and `detail.png`, then
   `<kit>/docs/design.md`. Match that feel.
3. **Plan the sizes.** The example's canvas, card and gap sizes fit that example; they are not rules.
   From your story, decide the card count and arrangement, then choose the canvas size and shape, the
   card size, and the spacing that make *this* diagram look good (`docs/design.md`, "Sizing"). Within
   the diagram keep it consistent: one size for every card, one for every collapsed group.
4. **Write the spec.** Copy `<kit>/starter/diagram.js` into the project (e.g. `docs/architecture.diagram.js`)
   and fill it in following `<kit>/docs/spec.md`. `<kit>/examples/web-app/diagram.js` is a full example.
   Icon names: `<kit>/examples/icons.png`. Need one that is missing? `<kit>/docs/icons.md`.
5. **Build.** `python3 <kit>/bin/build.py docs/architecture.diagram.js -o docs/architecture.html`
6. **Look at it and fix it.** Export PNGs and read them: the finished flow, one mid-flow step, and every detail page.
   ```
   <kit>/bin/export-png.sh docs/architecture.html /tmp/end.png "step=end"
   <kit>/bin/export-png.sh docs/architecture.html /tmp/mid.png "step=5"
   <kit>/bin/export-png.sh docs/architecture.html /tmp/detail.png "view=<groupId>&dstep=end"
   ```
   Go through the checklist at the end of `docs/design.md`. Judge the sizing by eye here: if the drawing
   looks lost, cramped or lopsided, change `canvas`, card sizes or spacing. Edit the spec, rebuild, repeat.
7. **Deliver** the spec, the built HTML, and a `step=end` PNG if it is going in a README.

## Rules

- Edit the **spec**, never the built HTML: it is overwritten on every build.
- Do not change the kit (`src/`, `themes/`) to suit one diagram. Project-specific icons go in the spec's
  `icons` field; a different accent colour is a theme (`--theme`). Change the kit only when the user
  asks to change the style for all future diagrams; `README.md` says which file to touch.
- Keep to the design rules in `docs/design.md` unless the user asks otherwise. Sizes are not among
  them: sizing is your call, per diagram, set in the spec. Within one diagram all components of a kind
  are the same size, unless the user asks for different sizes.
