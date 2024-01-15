# mr_markdown_builder
A fork of the venerable yet archived version of markdown-builder

## Usage
```bash
npm install --save mr_markdown_builder
```

Using `markdown-builder` is quite easy:
```js
const markdown = require('markdown-builder');
const { headers } = markdown;

headers.hX(3, '3rd Header') // ### 3rd Header
```

## API

### Headers
Use the `h1`,`h2`,`h3`,`h4`,`h5`,`h6` or `hX` to generate a markdown header. Calling `hX` with a level above `6` returns a `h6` Header.

```js
const markdown = require('markdown-builder')
const { headers } = markdown

headers.h1('1st Header') // # 1st Header
headers.h2('2nd Header') // ## 2nd Header
headers.h3('3rd Header') // ### 3rd Header
headers.hX(5, '5th Header using hX') // ##### 5th Header using hX
```

### Emphasis
```js
const markdown = require('markdown-builder')
const { emphasis } = markdown

emphasis.b('bold text')
emphasis.i('italic text')
emphasis.s('strikethrough text')
```

### Lists
```js
const markdown = require('markdown-builder')
const { lists } = markdown

let a = ['Item 1', 'Item 2']
// ordered list
lists.ol(a)
// 1. Item 1
// 2. Item 2
lists.ol(a, (item) => item.toUpperCase()) // use callbacks to alter each item
// 1. ITEM 1
// 2. ITEM 2

// unordered List
lists.ul(a)
lists.ul(a, (item) => item.toUpperCase())
```

### Miscellaneous

```js
const markdown = require('markdown-builder')
const { misc } = markdown

// Images
let alt = 'image of lights', url = 'https://www.w3schools.com/w3css/img_lights.jpg', title = 'lights'
misc.image(alt, url)
misc.image(alt, url, title)

// Collapsible summary/details block
misc.collapsible('Summary', 'content');

// Github Anchor
misc.anchor('A header with /*() special-characters!'); // #a-header-with--special-characters

// Link
misc.link('Github', 'https://github.com/flxwu')

// horizontal rule
misc.hr()

```

**Collapsible**:

<details>
	<summary>Summary</summary>
	Content
</details>



#### A header with /*() special-characters!
