# Property Binding

Property Binding lets TypeScript control an HTML property.

## Syntax

```html
[property]="value"
```

Direction:

```text
TypeScript → HTML
```

## Disabled Button

```typescript
disabledButton = false;
```

```html
<button [disabled]="disabledButton">
  Angular
</button>
```

## Image

```typescript
imageUrl = "/Angular.png";
```

```html
<img [src]="imageUrl">
```

Static images can be stored in:

```text
public/
```

## Class Binding

```typescript
selected = true;
```

```html
<p [class.selected]="selected">Angular</p>
```

## Style Binding

```typescript
fontSize = "20px";
```

```html
<p [style.font-size]="fontSize">Angular</p>
```

## Cheat Sheet

```text
{{ value }}
→ display text

[property]="value"
→ control HTML property
```
