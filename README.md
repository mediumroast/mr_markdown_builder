# Introduction
A fork of the venerable yet archived [markdown-builder](https://github.com/Chalarangelo/markdown-builder) with improvements including, but not limited to:
- Tables
- Quotes
- Task lists
- Inline code blocks 
- Long code blocks
- Badges from shields.io
- GeoJson and TopoJson support
- Collapsible summary/details blocks
The motivation behind maintaining this fork is to use the result in the Mediumroast, Inc. application and we did not want to start a new module from scratch when this one already exixted.

## Usage
```bash
npm install --save mr_markdown_builder
```

Using `mr_markdown_builder`:
```js
const markdown = require('mr_markdown_builder')

markdown.hX(3, '3rd Header') // ### 3rd Header
```

## API

All functions are exported flat on the top-level module — there are no `headers`/`emphasis`/`lists`/`misc` namespaces to destructure.

### Headers
Use the `h1`,`h2`,`h3`,`h4`,`h5`,`h6` or `hX` to generate a markdown header. Calling `hX` with a level above `6` returns a `h6` Header.

```js
const markdown = require('mr_markdown_builder')

markdown.h1('1st Header') // # 1st Header
markdown.h2('2nd Header') // ## 2nd Header
markdown.h3('3rd Header') // ### 3rd Header
markdown.hX(5, '5th Header using hX') // ##### 5th Header using hX
```

### Emphasis
```js
const markdown = require('mr_markdown_builder')

markdown.b('bold text')
markdown.i('italic text')
markdown.s('strikethrough text')
markdown.ic('inline code block text')
markdown.cb('long code block text')
markdown.cb('const x = 1', 'js') // fenced with a language tag, for syntax highlighting
```

### Lists
```js
const markdown = require('mr_markdown_builder')

let a = ['Item 1', 'Item 2']
// ordered list
markdown.ol(a)
// 1. Item 1
// 2. Item 2
markdown.ol(a, (item) => item.toUpperCase()) // use callbacks to alter each item
// 1. ITEM 1
// 2. ITEM 2

// unordered List
markdown.ul(a)
markdown.ul(a, (item) => item.toUpperCase())

// task list — pass plain strings for unchecked items, or { text, checked } for a mix
markdown.tl(a)
markdown.tl(a, (item) => item.toUpperCase())
markdown.tl([{ text: 'Done', checked: true }, { text: 'Not done', checked: false }])
// - [x] Done
// - [ ] Not done

// Nesting: embed a rendered ul()/ol()/tl() call inside an item's text —
// continuation lines are automatically indented to stay part of that item
markdown.ul([`Parent item\n${markdown.ul(['Nested A', 'Nested B']).trimEnd()}`])
// * Parent item
//   * Nested A
//   * Nested B
```

### Tables
```js
const markdown = require('mr_markdown_builder')

// header separator defaults to unaligned columns
markdown.tableHeader(['Name', 'Role'])

// pass 'left', 'center', or 'right' per column to align it
markdown.tableHeader(['Name', 'Role'], ['left', 'center'])
```

### Miscellaneous

```js
const markdown = require('mr_markdown_builder')

// Images
let alt = 'image of lights', url = 'https://www.w3schools.com/w3css/img_lights.jpg', title = 'lights'
markdown.image(alt, url)
markdown.image(alt, url, title)

// Collapsible summary/details block
markdown.collapsible('Summary', 'content');

// Github Anchor
markdown.anchor('A header with /*() special-characters!'); // #a-header-with--special-characters

// Link
markdown.link('Github', 'https://github.com/flxwu')

// horizontal rule
markdown.hr()

// Quote (each line of a multi-line string is prefixed)
markdown.quote('A quote')
markdown.quote('Line 1\nLine 2')

// GitHub alert: a blockquote with a [!TYPE] marker. type must be one of
// NOTE, TIP, IMPORTANT, WARNING, or CAUTION
markdown.alert('NOTE', 'Something worth calling out.')

// Footnotes: an inline reference, and the definitions block rendered wherever
// you place it (there's no auto-numbering — you supply each id)
markdown.footnoteRef('1') // [^1]
markdown.footnoteDefs([{ id: '1', text: 'The footnote text.' }]) // [^1]: The footnote text.

// Named anchor, independent of any heading
markdown.namedAnchor('my-anchor') // <a name="my-anchor"></a>

// Underline, subscript, superscript (GFM has no dedicated syntax, so these render as HTML)
markdown.ins('underlined')
markdown.sub('subscript')
markdown.sup('superscript')

// Force a hard line break within a paragraph
markdown.br()

// GitHub shorthand
markdown.mention('octocat') // @octocat
markdown.issueRef(42) // #42
markdown.emoji('tada') // :tada:
markdown.colorSwatch('#1d9bf0') // `#1d9bf0` — GitHub renders a swatch next to a valid hex/rgb/hsl value

// Math (LaTeX)
markdown.mathInline('E = mc^2') // $E = mc^2$
markdown.mathBlock('E = mc^2') // $$\nE = mc^2\n$$

// Hide content in the rendered output
markdown.comment('not visible when rendered')
```

**Collapsible**:

<details>
	<summary>Summary</summary>
	Content
</details>

### Diagrams

```js
const markdown = require('mr_markdown_builder')

// GeoJSON: GitHub renders a fenced ```geojson``` block as an interactive map
markdown.geojson({ type: 'Feature', geometry: { type: 'Point', coordinates: [-117.08, 32.93] }, properties: {} })

// TopoJSON, same idea
markdown.topojson({ type: 'Topology', objects: {}, arcs: [] })

// Mermaid: GitHub renders a fenced ```mermaid``` block as a diagram
markdown.mermaid('graph TD;\n  A-->B;')
```

# Examples
Every file under [examples/](./examples) is generated by a script that calls this module — none of it is hand-written. See the [Examples Index](./examples/INDEX.md) for the full list at a glance, or regenerate everything at once with:
```bash
npm run examples
```

Individually:
- [Feature Showcase](./examples/FeatureShowcase.md) — every exported function, in one page (`node examples/feature-showcase.js`)
- [Headers & Emphasis](./examples/HeadersAndEmphasis.md) — including fenced code blocks with a syntax-highlighting language tag (`node examples/headers-and-emphasis.js`)
- [Lists](./examples/ListsExample.md) — ordered, unordered, and task lists, including checked task items and nesting (`node examples/lists-example.js`)
- [Tables](./examples/TablesExample.md) — with and without column alignment (`node examples/tables-example.js`)
- [Links, Images & Miscellaneous](./examples/LinksAndMedia.md) — links, images, anchors, quotes, GitHub alerts, footnotes, badges, underline/sub/superscript, hard breaks, mentions, issue refs, emoji, color swatches, math, and comments (`node examples/links-and-media.js`)
- [Diagrams: GeoJSON, TopoJSON & Mermaid](./examples/GeoblocksExample.md) (`node examples/geoblocks-example.js`)
- [Company Directory](./examples/README.md) — a more elaborate, real-world example built from JSON company/interaction data (`node examples/index.js`)

