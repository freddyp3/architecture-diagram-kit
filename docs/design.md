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
4. **Plain words.** Labels are 1-3 words. Title case for things ("Web app"), lowercase for group
   captions and results ("background jobs"). No labels on lines, no legends, no paragraphs. If a
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
- Snap to a grid you choose: equal spacing between card centres along a row, equal spacing between rows.
- Centre the whole drawing, with the left and right margins equal and the top and bottom margins equal.
- Lines are horizontal or vertical only, with one or two bends. If a line needs more, move a card.
- Lines never pass under a card. Lines leaving the same side of a card are at least 60 apart.
- No arrowheads: direction comes from the animation and the left-to-right order.
- Label too long? Shorten it first. If it is already as plain as it can be, widen the cards.

## Sizing

Sizes are yours to judge. The numbers in the example and the starter (1720 x 900 canvas, 310 x 74
cards, 45 gaps) suit a diagram of that shape; they are defaults, not rules. Size each diagram so it
looks good for its own content, using `canvas`, `card` and the per-card `w`, `h`, `scale` in the spec.

- **Fit the canvas to the drawing.** Lay the drawing out first, then set `canvas` so the drawing
  fills most of it with comfortable margins. A three-card diagram on the default canvas looks lost; a
  fourteen-card one looks crammed. A smaller canvas makes everything appear larger, a bigger one
  gives more room. The shape is free too: wide for a long pipeline, squarer for a hub.
- **Keep it readable where it will be shown.** A README shows the PNG about 800 px wide, so the wider
  the canvas, the smaller the labels end up. Past roughly 2200 wide, cut cards or move detail onto a
  detail page before growing the canvas further.
- **Size cards to their labels.** Pick one width that holds the longest label with padding to spare
  and use it for every ordinary card (`card:{w:...}`). Uniform cards look calmer than a width per label.
- **Vary size only to say something.** A hub or the one component the diagram is about can be larger
  (`w`, `h`, `scale`); a minor endpoint can be smaller. Two or three sizes at most.
- **Space by proportion.** Gaps between cards are clearly smaller than the cards, and consistent.
  Margins are clearly larger than the gaps. Rows sit far enough apart that lines between them have
  visible length.
- **Size groups to their contents**, with the same padding on every side of the cards or tiles.

## Checklist before delivering

- [ ] The steps tell the story start to finish and end back at the start, or at the output.
- [ ] Finished-flow PNG (`step=end`): nothing overlaps, no line crosses a card, margins are even.
- [ ] Sizing suits this diagram: the drawing fills the canvas without crowding it, labels are readable
      at the size it will be shown, every label has padding, and any size difference is deliberate.
- [ ] Mid-flow PNG: visited items in colour, unvisited greyed out, only the current item in the accent.
- [ ] Every detail-page row ends in a result pill and no label is clipped.
- [ ] The accent appears only on flow and results. No second accent, arrowheads or legends.
- [ ] Neighbouring icons differ in colour.
