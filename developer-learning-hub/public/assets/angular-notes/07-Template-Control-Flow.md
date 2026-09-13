# 7. Angular Template Control Flow

## Subtopics
- `@if`
- `@else`
- `@else if`
- `@for`
- `track`
- `$index`, `$first`, `$last`, `$even`, `$odd`
- `@empty`
- `@switch`
- `@case`
- `@default`

## What it solves

Control flow decides **which HTML Angular should render**.

TypeScript owns the data. The template decides what to show from that data.

## Where do we use this?

Mostly in the component `.html` template.

The values being checked or looped over usually come from the component `.ts`.

## `@if`, `@else if`, `@else`

```ts
role = 'editor';
```

```html
@if (role === 'admin') {
  <p>Admin dashboard</p>
} @else if (role === 'editor') {
  <p>Editor dashboard</p>
} @else {
  <p>Viewer dashboard</p>
}
```

Only the matching branch renders.

## `@for` and `track`

```ts
products = [
  { id: 1, name: 'Laptop' },
  { id: 2, name: 'Mouse' }
];
```

```html
@for (product of products; track product.id) {
  <p>{{ product.name }}</p>
}
```

`track` tells Angular how to identify each item.

Prefer a stable unique ID when you have one.

## Loop variables

```html
@for (
  product of products;
  track product.id;
  let i = $index
) {
  <p>{{ i + 1 }}. {{ product.name }}</p>
}
```

Useful built-ins:

```text
$index → zero-based position
$first → first item?
$last  → last item?
$even  → even index?
$odd   → odd index?
```

## `@empty`

```html
@for (product of products; track product.id) {
  <p>{{ product.name }}</p>
} @empty {
  <p>No products available.</p>
}
```

## `@switch`

Use it when one value can match several exact choices.

```ts
status = 'shipped';
```

```html
@switch (status) {
  @case ('pending') {
    <p>Preparing order</p>
  }

  @case ('shipped') {
    <p>On the way</p>
  }

  @default {
    <p>Status unavailable</p>
  }
}
```

## When to use what

```text
@if     → condition
@for    → repeat items
@empty  → fallback for empty list
@switch → one value, several exact choices
```

## Common mistakes
- Forgetting `track` in `@for`.
- Tracking by a non-unique value.
- Forgetting `$index` starts at `0`.
- Using `=` when you meant `===`.
- Trying to use a loop variable outside the loop.

## Quick reference

```html
@if (condition) { ... } @else { ... }

@for (item of items; track item.id) {
  {{ item.name }}
} @empty {
  No items
}

@switch (value) {
  @case ('A') { ... }
  @default { ... }
}
```

## Memory rule

**`@if` chooses, `@for` repeats, `track` identifies, `@empty` handles nothing, `@switch` matches choices.**
