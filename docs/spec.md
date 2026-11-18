# Spec reference

A spec is a JavaScript file that defines one object, `DIAGRAM`. It holds a diagram's content and
positions, and nothing about colours or styling.

```js
const DIAGRAM={
 title:'Project name',
 nodes:{...}, groups:{...}, edges:{...}, steps:[...], details:{...},
 icons:{...}, glyphs:{...},   // optional
};
```

The canvas is **1720 wide x 900 tall**. All positions are in those units, origin top-left.

## `title`

Shown in the browser tab and as the back link on detail pages.

## `nodes`: cards

```js
nodes:{ api:{label:'API', icon:'server', x:860, y:330} }
```

| Field | Meaning |
|---|---|
| key (`api`) | id used by `steps` |
| `label` | text on the card, 1-3 words, at most about 22 characters |
| `icon` | icon name (see `examples/icons.png`); omit for a centred text-only card |
| `x`, `y` | **centre** of the card |
| `w` | width, default 310. Height is always 74 |

A card's borders are at `x ± 155` and `y ± 37`.

## `groups`: tinted containers

```js
groups:{ rp:{label:'retention prediction', x:797, y:534, w:350, h:130, tiles:['cards','tree']} }
```

`x`, `y` is the **top-left** corner. Two uses:

- **Container around cards.** Position the cards inside it yourself: 20 px side padding, first card
  centre at `group.y + 77`, each next card 90 lower. A group of two cards is 350 x 224.
- **Collapsed sub-system.** Give it `tiles` (up to 4 icon names; size 350 x 130) and an entry with the
  same id in `details`. It then opens a detail page on click or via an `open` step.

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
| `{at:['api']}` | highlight these nodes/groups. For a container group, list it with its cards: `{at:['fe','gem','code']}` |
| `{along:['ask'], dur:.9}` | trace these edges with the accent line over `dur` seconds; several edges animate together |
| `{open:'rp'}` | enter the detail page of group `rp`; when it ends, the overview continues |

Alternate `at` and `along`. Anything the flow has not reached yet is shown greyed out.

## `details`: drill-down pages

```js
details:{ rp:{ title:'retention prediction', input:{label:'Draft features', icon:'list'}, rows:[
  {steps:[{label:'Random forest', icon:'tree'}, {label:'Average 200 trees', icon:'merge'}],
   result:'opening retention · ending retention', glyph:'bars'},
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
