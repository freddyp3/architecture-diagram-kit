# Spec reference

A spec is a JavaScript file that defines one object, `DIAGRAM`. It holds a diagram's content and
positions, and nothing about colours or styling.

```js
const DIAGRAM={
 title:'Project name',
 canvas:[1720,900], card:{w:310,h:74},   // optional sizing, defaults shown
 nodes:{...}, groups:{...}, edges:{...}, steps:[...], details:{...},
 icons:{...}, glyphs:{...},   // optional
};
```

All positions and sizes are in canvas units, origin top-left. Every size on this page is a default:
choose what looks right for the diagram (`docs/design.md`, "Sizing").

## `canvas`, `card`: sizing

```js
canvas:[1300,700], card:{w:260}
```

| Field | Meaning |
|---|---|
| `canvas` | `[width, height]` of the overview, default `[1720,900]`. Write it as two whole numbers. The page scales it to fit the window, so a smaller canvas makes everything look larger, and the PNG export is twice this size |
| `card` | the size of every card in `nodes`: any of `w`, `h`, `scale`. Set sizes here, so all cards match |

Detail pages are laid out automatically on their own 1720 x 900 canvas, whatever `canvas` is.

## `title`

Shown in the browser tab and as the back link on detail pages.

## `nodes`: cards

```js
nodes:{ api:{label:'API', icon:'server', x:860, y:330} }
```

| Field | Meaning |
|---|---|
| key (`api`) | id used by `steps` |
| `label` | text on the card, 1-3 words |
| `icon` | icon name (see `examples/icons.png`); omit for a centred text-only card |
| `x`, `y` | **centre** of the card |
| `w`, `h` | width and height of this card only, overriding `card` (default 310 x 74) |
| `scale` | size of the icon and label inside this card only, overriding `card` (default 1) |

Leave `w`, `h` and `scale` off individual cards so they all share the size in `card`. Set them on one
card only when the user asks for cards of different sizes.

A card's borders are at `x ± w/2` and `y ± h/2`. A label needs a width of about
`(94 + 10 per character) x scale` with an icon, so the default card holds about 22 characters.

## `groups`: tinted containers

```js
groups:{ jobs:{label:'background jobs', x:675, y:510, w:350, h:130, tiles:['queue','gear']} }
```

`x`, `y` is the **top-left** corner. Two uses:

- **Container around cards.** Position the cards inside it yourself, leaving the top 40 for the
  caption and equal padding on the other sides. With default cards: 20 side padding, first card centre
  at `group.y + 77`, each next card 90 lower, so a group of two cards is 350 x 224.
- **Collapsed sub-system.** Give it `tiles` (icon names) and an entry with the same id in `details`.
  It then opens a detail page on click or via an `open` step. Tiles are a fixed size, laid out from
  the left 77 apart: 130 high, and 350 wide for four tiles (77 less for each tile fewer).

## `edges`: connectors

```js
edges:{ ask:'M660 330H705', reply:'M860 367V500H660' }
```

Each is an SVG path using only `M` (start), `H` (horizontal to x) and `V` (vertical to y).
Draw it **in the direction the flow travels**: the accent line animates from the path's start to its end.
Start and end exactly on a card or group border.

## `steps`: the story

An ordered list. Each press of the right arrow advances to the next `at`.

| Step | Effect |
|---|---|
| `{at:['api']}` | highlight these nodes/groups. For a container group, list it with its cards: `{at:['store','db','cache']}` |
| `{along:['ask'], dur:.9}` | trace these edges with the accent line over `dur` seconds; several edges animate together |
| `{open:'jobs'}` | enter the detail page of group `jobs`; when it ends, the overview continues |

Alternate `at` and `along`. Anything the flow has not reached yet is shown greyed out.

## `details`: drill-down pages

```js
details:{ jobs:{ title:'background jobs', input:{label:'Job request', icon:'list'}, rows:[
  {steps:[{label:'Queue', icon:'queue'}, {label:'Worker', icon:'gear'}],
   result:'receipts · reports · exports', glyph:'doc'},
]}}
```

A left-to-right pipeline: one `input` card, then each row's `steps` cards, ending in a `result` pill
with a `glyph`. Layout and step-through are automatic. Limits: 1-4 rows, 1-3 steps per row, result text
at most about 45 characters.

## `icons`, `glyphs`: per-diagram additions

```js
icons:{ rocket:'<path d="..." fill="#8b5cf6"/>' }
```

SVG markup added to (or overriding) the library for this diagram only. Drawing rules: `docs/icons.md`.

## URL parameters

For checking a state or exporting it.

| Parameter | Meaning |
|---|---|
| `?step=N`, `?step=end` | overview at step N (index into `steps`) |
| `&u=0.5` | with an `along` step: line half drawn |
| `?view=<groupId>` | open that detail page |
| `&dstep=N`, `&dstep=end` | detail page at step N |

## Errors

A wrong id or icon name shows "Diagram spec error" on the page with the bad name and the valid ones.
