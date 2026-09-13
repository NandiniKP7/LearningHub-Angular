# 17. Custom Pipes

## Subtopics
- `@Pipe`
- `PipeTransform`
- `transform()`
- typed input / output
- arguments
- standalone import / use
- pure pipe concept

## What it solves

Angular has built-in pipes, but sometimes your application needs its own reusable display rule.

Example:

```text
wireless keyboard
      ↓ custom pipe
Product: wireless keyboard
```

## Where do we use this?

| File | Job |
|---|---|
| `*.pipe.ts` | Defines custom pipe |
| Component `.ts` | Imports the pipe |
| Component `.html` | Uses the pipe |

## Create a custom pipe

```ts
import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'productLabel',
  standalone: true
})
export class ProductLabelPipe
  implements PipeTransform {

  transform(value: string): string {
    return `Product: ${value}`;
  }
}
```

## Important parts

```text
@Pipe
→ tells Angular this class is a pipe

name
→ name used after |

PipeTransform
→ transformation contract

transform()
→ receives value and returns result
```

## Use it in a standalone component

Component TypeScript:

```ts
@Component({
  imports: [ProductLabelPipe]
})
export class ProductCard {}
```

Component HTML:

```html
{{ productName | productLabel }}
```

## Typed input and output

```ts
transform(value: number): string {
  return `Score: ${value}`;
}
```

Read it as:

```text
number in → string out
```

## Pipe arguments

```ts
transform(
  value: string,
  label: string
): string {
  return `${label}: ${value}`;
}
```

Template:

```html
{{ productName | productLabel:'Featured' }}
```

The value before `|` becomes the first `transform()` argument.

Values after `:` become additional arguments.

## Chaining with a built-in pipe

```html
{{ productName
  | titlecase
  | productLabel:'Featured Product'
}}
```

Each pipe receives the previous pipe's result.

## Pure pipe concept

Custom pipes are pure by default.

That means Angular normally reevaluates them when their input/reference or arguments change.

Avoid making a pipe impure unless there is a clear reason.

## Custom pipe vs component method

```text
Reusable display transformation
→ custom pipe

General component behavior
→ method
```

Do not create a pipe for every function.

## Common mistakes
- Forgetting to import the custom pipe into a standalone component.
- Using the class name instead of the pipe's `name` in HTML.
- Returning the wrong type from `transform()`.
- Putting business/state logic into a display pipe.

## Quick reference

```ts
@Pipe({
  name: 'label',
  standalone: true
})
export class LabelPipe implements PipeTransform {
  transform(value: string): string {
    return `Label: ${value}`;
  }
}
```

```html
{{ value | label }}
```

## Memory rule

**Custom pipe = your reusable display transformation.**
