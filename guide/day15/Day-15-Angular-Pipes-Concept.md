# Day 15 — Angular Pipes

## What Is a Pipe?

A pipe transforms a value **for display in the template**.

```html
{{ value | pipeName }}
```

```text
component value → pipe → formatted value shown in HTML
```

The original TypeScript value is not replaced.

## Example

```typescript
topicTitle = 'angular signals';
```

```html
<p>{{ topicTitle | uppercase }}</p>
```

Displays:

```text
ANGULAR SIGNALS
```

But `topicTitle` is still `angular signals`.

## Common Built-In Pipes

```text
uppercase
lowercase
titlecase
date
currency
percent
```

### uppercase

```html
{{ topicTitle | uppercase }}
```

### lowercase

```html
{{ topicTitle | lowercase }}
```

### titlecase

```html
{{ topicTitle | titlecase }}
```

Example:

```text
angular signal based state
→ Angular Signal Based State
```

### date

```html
{{ today | date }}
```

With an argument:

```html
{{ today | date:'shortDate' }}
```

### currency

```html
{{ price | currency }}
```

## Pipes Inside Interpolation

You already know:

```html
{{ learningTopic() }}
```

Add a pipe:

```html
{{ learningTopic() | titlecase }}
```

```text
{{ }}      → interpolation
|          → send value through pipe
titlecase  → display transformation
```

## Pipes and Signals

Signals are still read with `()`:

```html
{{ learningTopic() | uppercase }}
```

```text
learningTopic()
→ read signal
→ uppercase pipe
→ formatted display
```

## Pipe Arguments

Some pipes accept options:

```html
{{ value | pipeName:argument }}
```

Example:

```html
{{ today | date:'shortDate' }}
```

```text
| → apply pipe
: → provide an argument
```

## Chaining Pipes

A value can pass through multiple pipes:

```html
{{ value | pipeOne | pipeTwo }}
```

The output of the first pipe becomes input to the next.

## Standalone Component Imports

Your components use standalone-style `imports`.

A built-in pipe used in the template may need to be imported.

Example:

```typescript
import { TitleCasePipe } from '@angular/common';
```

Then:

```typescript
@Component({
  imports: [TitleCasePipe]
})
```

Template:

```html
{{ learningTopic() | titlecase }}
```

We will practice the exact import during implementation.

## Pipes vs `computed()`

```text
Pipe
→ format an existing value for display

computed()
→ calculate/derive a value from signals
```

Example:

```text
searchText → computed() → filtered topic array
```

versus:

```text
"angular signals" → titlecase pipe → "Angular Signals"
```

## Learning Hub Connection

Your Learning Hub already displays:

```html
{{ learningTopic() }}
```

and:

```html
{{ item }}
```

We can use those existing values to practice pipes without creating an unrelated feature or breaking working behavior.

# Quick Cheat Sheet

```html
{{ value | uppercase }}
{{ value | lowercase }}
{{ value | titlecase }}
{{ value | date:'shortDate' }}
```

# Day 15 Main Memory Rule

```text
Pipe
→ transforms a value for DISPLAY

It does not automatically change the original TypeScript value.
```

For signals:

```text
signal()
→ pipe
→ formatted display
```
