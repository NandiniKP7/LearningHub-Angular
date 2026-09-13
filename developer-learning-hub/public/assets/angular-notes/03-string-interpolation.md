# 2. String Interpolation

## Subtopics
- component properties
- `{{ }}` syntax
- literal vs property
- case sensitivity
- simple template expressions

## What it solves

A component stores data in TypeScript. String interpolation lets the HTML **display that data**.

```text
TypeScript value → HTML text
```

## Where do we use this?

| File | What goes there? |
|---|---|
| Component `.ts` | Property/value |
| Component `.html` | `{{ property }}` |

## Basic syntax

### Component TypeScript

```ts
export class ProfileComponent {
  name = 'Ada';
  age = 25;
}
```

### Component HTML

```html
<h2>{{ name }}</h2>
<p>Age: {{ age }}</p>
```

Browser:

```text
Ada
Age: 25
```

## Literal text vs property

```html
<p>name</p>
```

Displays the word:

```text
name
```

But:

```html
<p>{{ name }}</p>
```

displays the value stored in the `name` property.

## Case sensitivity

If TypeScript contains:

```ts
firstName = 'Ada';
```

use:

```html
{{ firstName }}
```

Not:

```html
{{ FirstName }}
```

## Simple expressions

```ts
firstName = 'Ada';
lastName = 'Lovelace';
count = 4;
```

```html
<p>{{ firstName + ' ' + lastName }}</p>
<p>{{ count + 1 }}</p>
```

Keep complicated logic in TypeScript instead of putting large expressions in HTML.

## Complete flow

```text
component.ts
name = 'Ada'
    ↓
component.html
{{ name }}
    ↓
Browser
Ada
```

## Common mistakes
- Forgetting `{{ }}`.
- Using the wrong property name or capitalization.
- Putting heavy calculations in the template.
- Using interpolation when you actually need to control an HTML property such as `disabled` or `src`.

## Quick reference

```ts
message = 'Hello';
```

```html
<p>{{ message }}</p>
```

## Memory rule

**`{{ }}` = read a TypeScript value and display it as text in HTML.**
