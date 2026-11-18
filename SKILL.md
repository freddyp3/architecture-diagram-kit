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
3. **Write the spec.** Copy `<kit>/starter/diagram.js` into the project (e.g. `docs/architecture.diagram.js`)
   and fill it in following `<kit>/docs/spec.md`. `<kit>/examples/web-app/diagram.js` is a full example.
   Icon names: `<kit>/examples/icons.png`. Need one that is missing? `<kit>/docs/icons.md`.
4. **Build.** `python3 <kit>/bin/build.py docs/architecture.diagram.js -o docs/architecture.html`
5. **Look at it and fix it.** Export PNGs and read them: the finished flow, one mid-flow step, and every detail page.
   ```
   <kit>/bin/export-png.sh docs/architecture.html /tmp/end.png "step=end"
   <kit>/bin/export-png.sh docs/architecture.html /tmp/mid.png "step=5"
   <kit>/bin/export-png.sh docs/architecture.html /tmp/detail.png "view=<groupId>&dstep=end"
   ```
   Go through the checklist at the end of `docs/design.md`. Edit the spec, rebuild, repeat.
6. **Deliver** the spec, the built HTML, and a `step=end` PNG if it is going in a README.

## Rules

- Edit the **spec**, never the built HTML: it is overwritten on every build.
- Do not change the kit (`src/`, `themes/`) to suit one diagram. Project-specific icons go in the spec's
  `icons` field; a different accent colour is a theme (`--theme`). Change the kit only when the user
  asks to change the style for all future diagrams; `README.md` says which file to touch.
- Keep to the design rules in `docs/design.md` unless the user asks otherwise.
