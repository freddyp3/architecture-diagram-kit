# Icons

All available icons, by name: `examples/icons.png`.

There are two kinds, both plain SVG markup strings:

- **Icons** (`ICONS`): colourful, used on cards and group tiles.
- **Glyphs** (`GLYPHS`): white, used on the accent circle of a result pill.

## Where to add one

- For a single diagram: the `icons` / `glyphs` field of its spec. Prefer this.
- For every future diagram: `src/icons.js`, then regenerate `examples/icons.png` (command in `README.md`).

## Drawing rules

- Draw in a **28 x 28 box centred on (0, 0)**: coordinates run from -14 to 14. Glyphs stay within -10 to 10.
- **Flat and chunky.** Either one filled shape in one palette colour with white details inside, or a
  3 px round-capped stroke. No gradients, no outline around a fill, no thin strokes.
- **One colour per icon**, from the palette in `docs/design.md`. Opacity steps of the same colour are fine.
- It must be readable at 28 px. If it needs explaining, choose a simpler metaphor.
- For a real product, use its official single-colour logo, never a redrawn approximation. Most logo
  paths are drawn on a 24 x 24 grid; wrap them so they fit:
  `<g transform="translate(-14 -14) scale(1.1667)"><path fill="#..." d="..."/></g>`

## Examples

Filled shape with a white detail:

```js
clock:'<circle r="13" fill="#f59e0b"/><path d="M0-7V0l5 3" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
```

Stroke icon, using the `st(colour, pathData, width = 3)` helper available in `src/icons.js`
(in a spec, write the `<path>` out in full):

```js
code:st('#64748b','M-5-9l-9 9 9 9M5-9l9 9-9 9')
```
