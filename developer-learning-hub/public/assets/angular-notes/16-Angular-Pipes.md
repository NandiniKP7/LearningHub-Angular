# 16. Angular Pipes

## Subtopics
- pipe syntax
- uppercase / lowercase / titlecase
- date
- currency
- percent / decimal
- parameters
- chaining
- standalone pipe imports
- pipe vs method

## What it solves

Sometimes data is stored correctly but should **look different when displayed**.

A pipe formats the displayed value without changing the original data.

```text
original value
     ↓
pipe
     ↓
formatted display
```

## Where do we use this?

Mostly in component `.html`.

For standalone components, import the Angular pipe class in the component `.ts` when needed.

## Basic syntax

```html
{{ value | pipeName }}
```

The `|` means: pass this value through the pipe.

## Text pipes

```html
{{ name | uppercase }}
{{ name | lowercase }}
{{ name | titlecase }}
```

Be careful with technical text such as `TypeScript`, `RxJS`, filenames, or commands. Automatic title casing may not be appropriate.

## Date pipe

```html
{{ today | date:'shortDate' }}
```

A value can be formatted using a pipe parameter after `:`.

## Currency

```html
{{ price | currency:'USD' }}
```

## Percent

```html
{{ progress | percent }}
```

If `progress` is `0.25`, the display is approximately `25%`.

## Decimal / number formatting

```html
{{ score | number:'1.1-2' }}
```

The formatting string controls minimum/maximum digits.

## Pipe parameters

```html
{{ value | pipeName:argument }}
```

Multiple:

```html
{{ value | pipeName:arg1:arg2 }}
```

## Chaining pipes

```html
{{ name | lowercase | titlecase }}
```

The output of the first pipe becomes the input of the next.

Order matters.

## Standalone component imports

Example:

```ts
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe]
})
export class ProductCard {}
```

Then:

```html
{{ price | currency:'USD' }}
```

## Pipe vs method vs computed

```text
Pipe
→ display formatting

Component method
→ general component behavior

computed()
→ derived reactive state
```

Use a pipe when the main purpose is reusable display formatting.

## Common mistakes
- Expecting a pipe to change the original TypeScript value.
- Using `titlecase` on technical text that should keep exact capitalization.
- Forgetting required standalone pipe imports.
- Using a pipe for application state calculations.

## Quick reference

```html
{{ value | uppercase }}
{{ value | lowercase }}
{{ value | titlecase }}
{{ value | date:'shortDate' }}
{{ value | currency:'USD' }}
{{ value | percent }}
{{ value | number:'1.1-2' }}
```

## Memory rule

**Pipe = transform a value for display, not change the source data.**
