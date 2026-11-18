# Design guide

What the diagrams should look and feel like. Exact colour values are in `themes/default.css` and
component styling in `src/diagram.css`; this guide explains the intent behind them.

Reference images: `examples/web-app/flow.png` (mid-flow), `overview.png` (finished) and `detail.png`.

## The feel

Calm, friendly, product-page quality: a diagram from a well-designed SaaS landing page, not an
engineering whiteboard and not a UML tool.

## Principles

1. **Lots of air.** 6-8 cards on the overview, 10 at most. Empty canvas is part of the look.
2. **One story, one accent.** The accent colour means only "the flow is here now" or "this is a
   result". Never decoration. Never a second accent.
3. **Colour lives in the icons.** Canvas, cards and lines are neutral; each icon is a small flat shape
   in one saturated colour. That contrast keeps it lively without being busy.
4. **Plain words.** Labels are 1-3 words. Title case for things ("MCP server"), lowercase for group
   captions and results ("retention prediction"). No labels on lines, no legends, no paragraphs. If a
   line needs a label to make sense, restructure.
5. **Soft, not flat.** Rounded corners, hairline borders, a faint shadow. The active card lifts
   slightly and glows in the accent colour.
6. **Progressive disclosure.** The overview shows who talks to whom. How a sub-system works goes on its
   detail page, where each row ends in its *output*, in the reader's words.

## Colour roles

| Role | Tokens | Where |
|---|---|---|
| Neutral | `--bg --card --border --line --ink` | canvas, cards, resting connectors, text |
| Not reached yet | `--muted --dim-fill --dim-mark` | everything the flow has not visited |
| Accent | `--accent` and the `--accent-*` family, `--tile-border` | current step, traced path, groups, results |
| Icon palette | in `src/icons.js` | emerald `#10b981`, amber `#f59e0b`, orange `#fb923c`, rose `#f43f5e`, pink `#ec4899`, sky `#0ea5e9`, indigo `#6366f1`, violet `#8b5cf6`, red `#ef4444`, lime `#a3e635`, slate `#64748b` |

A new theme should keep the neutrals quiet and pick an accent vivid enough to stand out against the
grey connectors. `themes/indigo.css` shows the six tokens to override.

## Layout rules

- Main flow reads **left to right** along one row. Returns and side branches go **below**.
- Snap to a grid: card centres 355 apart horizontally (310 card + 45 gap), rows about 170 apart.
- Margins on the overview: at least 140 left and right, 180 top and bottom. Centre the whole drawing.
- Lines are horizontal or vertical only, with one or two bends. If a line needs more, move a card.
- Lines never pass under a card. Lines leaving the same side of a card are at least 60 apart.
- No arrowheads: direction comes from the animation and the left-to-right order.
- Label too long? Shorten the label; do not widen the card.

## Checklist before delivering

- [ ] The steps tell the story start to finish and end back at the start, or at the output.
- [ ] Finished-flow PNG (`step=end`): nothing overlaps, no line crosses a card, margins are even.
- [ ] Mid-flow PNG: visited items in colour, unvisited greyed out, only the current item in the accent.
- [ ] Every detail-page row ends in a result pill and no label is clipped.
- [ ] The accent appears only on flow and results. No second accent, arrowheads or legends.
- [ ] Neighbouring icons differ in colour.
