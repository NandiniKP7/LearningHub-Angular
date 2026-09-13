# 5. Event Binding

## Subtopics
- `(event)` syntax
- `(click)`
- component methods
- `this.property`
- changing component state
- `$event`
- input / keyboard events
- event → method → state

## What it solves

Event binding lets Angular respond to something the user does.

```text
User / HTML → TypeScript
```

## Where do we use this?

| File | Job |
|---|---|
| Component `.html` | Listen for the event |
| Component `.ts` | Method that handles the event |

## Basic syntax

```html
(event)="method()"
```

Example:

```ts
export class CounterComponent {
  count = 0;

  increment(): void {
    this.count++;
  }
}
```

```html
<button (click)="increment()">Add</button>
<p>Count: {{ count }}</p>
```

Flow:

```text
click
 ↓
increment()
 ↓
count changes
 ↓
template displays new value
```

## What does `this.` mean?

Inside TypeScript:

```ts
this.count++;
```

`this` means the current component instance.

In the HTML template, use:

```html
{{ count }}
```

not `this.count`.

## `$event`

Use `$event` when the method needs information about the browser event.

```html
<input (input)="onInput($event)">
```

```ts
onInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}
```

`$event` is Angular's template variable for the event that occurred.

## Common events

```text
(click)   → mouse/button click
(input)   → input value changes while typing
(change)  → value change is committed
(keyup)   → key released
(keydown) → key pressed
(submit)  → form submitted
```

## Property vs event binding

```text
[property] → TypeScript → HTML
(event)    → HTML/User → TypeScript
```

## Common mistakes
- Writing `method` when you intended to call `method()`.
- Using `this.` in the HTML template.
- Using `$event` when the method does not need event information.
- Forgetting that the method must belong to the template's component.

## Quick reference

```html
<button (click)="save()">Save</button>
<input (input)="onInput($event)">
```

## Memory rule

**`()` = user event → TypeScript method.**
