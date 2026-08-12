# Day 3 — Property Binding

## Concept

### What Problem Does Property Binding Solve?

We already know how to display text from TypeScript:

```typescript
title = "Developer Learning Hub";
```

```html
<h1>{{ title }}</h1>
```

Interpolation displays a value as **text**.

Sometimes we want TypeScript to control an **HTML element property**.

Example:

```typescript
buttonDisabled = true;
```

We want that value to control whether a button is disabled.

This is where **property binding** is used.

---

## Property Binding Syntax

```html
[property]="value"
```

Example:

```html
<button [disabled]="buttonDisabled">
  Start Learning
</button>
```

TypeScript:

```typescript
buttonDisabled = true;
```

```text
buttonDisabled = true
        ↓
[disabled]="buttonDisabled"
        ↓
button disabled
```

---

## What Do the Square Brackets Mean?

```html
[disabled]
```

The square brackets tell Angular to bind that HTML property to a value from the component.

```text
Component TypeScript
        ↓
      value
        ↓
[property]
        ↓
HTML element
```

---

## Interpolation vs Property Binding

### Interpolation

Displays a value as text.

```typescript
title = "Developer Learning Hub";
```

```html
<h1>{{ title }}</h1>
```

```text
title → {{ title }} → text on screen
```

### Property Binding

Controls an HTML element property using a component value.

```typescript
buttonDisabled = true;
```

```html
<button [disabled]="buttonDisabled">
  Start Learning
</button>
```

```text
buttonDisabled → [disabled] → button property
```

---

## Another Example

TypeScript:

```typescript
imageUrl = "assets/angular.png";
```

HTML:

```html
<img [src]="imageUrl">
```

```text
imageUrl → [src] → image src property
```

---

## Direction of Data

```text
TypeScript
    ↓
Property Binding
    ↓
HTML property
```

So property binding moves data:

```text
TypeScript → HTML
```

---

# Cheat Sheet

```typescript
buttonDisabled = true;
```

```html
<button [disabled]="buttonDisabled">
  Start Learning
</button>
```

```text
{{ value }}
→ display text

[property]="value"
→ control an HTML property
```
