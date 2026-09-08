# 7. Angular Template Control Flow

**Revision date:** September 8, 2026 · **Planned learning time:** 2–3 days

## What problem does it solve?
Control flow decides which HTML Angular renders. TypeScript stores the data; the template uses that data to show conditions, repeated items, and fallbacks. These examples are generic; the Learning Hub implementation belongs in the practical revision file.

## 1. `@if`, `@else if`, `@else`
Use `@if` when content depends on a condition.

```ts
isLoggedIn = true;
role = 'editor';
```
```html
@if (isLoggedIn) {
  <p>Welcome back!</p>
} @else {
  <p>Please sign in.</p>
}
```
Only the matching branch is rendered. For several conditions, use `@else if`:

```html
@if (role === 'admin') {
  <p>Admin dashboard</p>
} @else if (role === 'editor') {
  <p>Editor dashboard</p>
} @else {
  <p>Viewer dashboard</p>
}
```
Conditions are checked in order. `@else` is optional. Use `===` for comparison, not `=` for assignment.

### Reusing a value with `as`
```html
@if (user.profile; as profile) {
  <p>{{ profile.name }}</p>
}
```
The alias is available inside the block and avoids repeating the expression. This is a useful extra feature, not a prerequisite for today's exercises.

## 2. `@for` and `track`
Use `@for` to repeat HTML for an iterable collection.

```ts
products = [
  { id: 101, name: 'Laptop' },
  { id: 102, name: 'Mouse' }
];
```
```html
@for (product of products; track product.id) {
  <p>{{ product.name }}</p>
}
```
`product` is the current loop item. `track` is required and tells Angular how to identify items when the collection changes. Prefer a stable unique ID for object lists. For unique primitive strings, `track product` is reasonable. `track $index` is suitable for truly static lists, but can cause unnecessary DOM reuse or changes when items are inserted, removed, or reordered. Avoid non-unique tracking keys.

**Memory rule:** `@for` repeats; `track` identifies.

## 3. Contextual variables
Angular provides information about the current iteration.

| Variable | Meaning |
|---|---|
| `$index` | Position, starting at 0 |
| `$count` | Total number of items |
| `$first` | True for the first item |
| `$last` | True for the last item |
| `$even` | True at even zero-based indexes |
| `$odd` | True at odd zero-based indexes |

```html
@for (product of products; track product.id; let i = $index) {
  <p>
    {{ i + 1 }}. {{ product.name }}
    @if ($first) { <span>First</span> }
    @if ($last) { <span>Last</span> }
  </p>
}
```
`i + 1` creates human-friendly numbering. The first item has index 0, so `$even` is true for it. You can use `$even` or `$odd` for alternating styles:

```html
@for (product of products; track product.id) {
  <p [class.alternate]="$even">{{ product.name }}</p>
}
```

## 4. `@empty`
`@empty` renders when the collection has no items. It belongs immediately after `@for`.

```html
@for (product of products; track product.id) {
  <p>{{ product.name }}</p>
} @empty {
  <p>No products available.</p>
}
```

## 5. `@switch`, `@case`, `@default`
Use `@switch` when one value has several exact possibilities.

```ts
orderStatus = 'shipped';
```
```html
@switch (orderStatus) {
  @case ('pending') {
    <p>Preparing your order</p>
  }
  @case ('shipped') {
    <p>Your order is on the way</p>
  }
  @case ('delivered') {
    <p>Delivered</p>
  }
  @default {
    <p>Status unavailable</p>
  }
}
```
Cases use strict equality. There is no JavaScript-style fallthrough or `break`. `@default` is optional.

## When to use what
- `@if`: a condition, range, or multiple different expressions.
- `@for`: repeat HTML for a collection.
- `@empty`: fallback for an empty collection.
- `@switch`: compare one value against several exact choices.

## Common mistakes
- Forgetting `track`.
- Using a non-unique ID for tracking.
- Forgetting that `$index` starts at zero.
- Confusing `=` with `===`.
- Trying to use a loop variable outside its scope.

## Quick reference
```html
@if (condition) { ... } @else { ... }

@for (item of items; track item.id; let i = $index) {
  {{ i + 1 }}
} @empty { ... }

@switch (value) {
  @case ('A') { ... }
  @default { ... }
}
```

## Retrieval checkpoint
Explain when to choose `@if` versus `@switch`, why a stable tracking ID matters, and what `$first`, `$last`, `$even`, and `$odd` mean. Reconstruct a numbered list with an empty-state message.
