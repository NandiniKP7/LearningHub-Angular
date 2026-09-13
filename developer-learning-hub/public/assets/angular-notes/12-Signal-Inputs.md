# 12. Signal Inputs

## Subtopics
- `input()` as a signal
- read with `()`
- typed / default / required inputs
- parent binding
- input signal vs writable signal
- computed from inputs

## What it solves

A signal input lets a child receive parent-owned data using Angular's signal API.

You already learned the parent → child idea. This topic focuses on how that input behaves as a signal.

## Where do we use this?

| File | Job |
|---|---|
| Child `.ts` | Declares `input()` |
| Child `.html` | Reads input with `()` |
| Parent `.html` | Binds the value |
| Parent `.ts` | Owns the value |

## Basic connection

### Child

```ts
productName = input.required<string>();
```

```html
<p>{{ productName() }}</p>
```

### Parent

```ts
selectedName = 'Laptop';
```

```html
<app-product-card
  [productName]="selectedName">
</app-product-card>
```

## Input variations

```ts
name = input('Unknown');              // default
quantity = input<number>(1);          // typed default
description = input<string>();        // may be undefined
productId = input.required<number>(); // required
```

## Parent writable signal → child input

Parent:

```ts
selectedName = signal('Laptop');
```

```html
<app-product-card
  [productName]="selectedName()">
</app-product-card>
```

The parent owns the writable signal. The child receives the current value.

## Input signal vs writable signal

```ts
productName = input.required<string>(); // parent-owned
isExpanded = signal(false);             // child-owned
```

Both are read with `()`.

Only the writable signal has `set()` and `update()`.

## Computed from inputs

```ts
price = input.required<number>();
quantity = input(1);

total = computed(() =>
  this.price() * this.quantity()
);
```

```html
<p>Total: {{ total() }}</p>
```

## Ownership

Do not change parent-owned data inside the child.

If the child needs the parent to change something:

```text
child output
   ↓
parent receives event
   ↓
parent updates its state
```

## Common mistakes
- Reading an input without `()`.
- Trying to `set()` an input.
- Forgetting a required parent binding.
- Copying an input into another writable signal just to keep two values synchronized.

## Quick reference

```ts
value = input.required<string>();
optional = input('Default');
derived = computed(() => this.value().toUpperCase());
```

## Memory rule

**`input()` is a read-only signal whose value is owned by the parent.**
