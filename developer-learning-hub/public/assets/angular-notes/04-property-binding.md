# 4. Property Binding

## Subtopics
- `[property]` syntax
- TypeScript → HTML
- `[disabled]`
- `[src]`
- boolean binding
- `[class]` basics
- `[style]` basics
- static assets

## What it solves

Interpolation displays text. Property binding lets TypeScript **control an HTML property**.

```text
TypeScript → HTML property
```

## Where do we use this?

| File | Job |
|---|---|
| Component `.ts` | Stores the value |
| Component `.html` | Binds the value with `[]` |
| Component `.css` | Styles used by class bindings |
| `public/` | Static files such as images |

## Basic syntax

```html
[property]="expression"
```

Square brackets tell Angular to evaluate the expression.

## Image source

```ts
imageUrl = '/Angular.png';
```

```html
<img [src]="imageUrl" alt="Angular logo">
```

If an image is in `public/Angular.png`, the browser path is normally `/Angular.png`.

## Boolean property

```ts
isDisabled = true;
```

```html
<button [disabled]="isDisabled">Save</button>
```

Use a real boolean, not the string `"true"`.

## Static value vs binding

```html
<img src="/Angular.png">
```

The value is fixed.

```html
<img [src]="imageUrl">
```

The value comes from TypeScript.

## Class binding

```ts
isActive = true;
```

```html
<p [class.active]="isActive">Current item</p>
```

```css
.active {
  font-weight: bold;
}
```

## Style binding

```ts
fontSize = 20;
```

```html
<p [style.font-size.px]="fontSize">Hello</p>
```

## Property binding vs interpolation

```html
<p>{{ imageUrl }}</p>
```

Displays the URL as text.

```html
<img [src]="imageUrl">
```

Uses the URL as the image source.

## Common mistakes
- Forgetting the square brackets.
- Passing `"false"` to a boolean property.
- Using interpolation when the goal is to control an element property.
- Forgetting that `public/` assets are served from the app root.

## Quick reference

```html
<img [src]="imageUrl">
<button [disabled]="isDisabled">Save</button>
<p [class.active]="isActive">Item</p>
<p [style.color]="textColor">Hello</p>
```

## Memory rule

**`[]` = TypeScript value → HTML property.**
