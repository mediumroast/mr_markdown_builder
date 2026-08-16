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
```

**Collapsible**:

<details>
	<summary>Summary</summary>
	Content
</details>

# Examples
For a quick tour of every function the module exports, see the generated [Feature Showcase](./examples/FeatureShowcase.md), produced by running `node examples/feature-showcase.js`.

For a more elaborate real-world example, check out [./examples/README.md](./examples/README.md), which is created via the script [./examples/index.js](./examples/index.js), including the related modules, within the [examples](./examples) directory.  

