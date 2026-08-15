# Property Binding

Property Binding lets **TypeScript control an HTML property**.

Direction:

```text
TypeScript → HTML
```

---

# Where Do We Use Property Binding?

The value is stored in the component:

```text
TypeScript (.ts)
```

The HTML binds one of its properties to that value:

```text
HTML (.html)
```

Syntax:

```html
[property]="value"
```

Flow:

```text
TypeScript value
       ↓
[property]
       ↓
HTML property
```

---

# Disabled Button

### TypeScript

```typescript
disabledButton = false;
```

### HTML

```html
<button [disabled]="disabledButton">
  Angular
</button>
```

Flow:

```text
disabledButton
      ↓
[disabled]
      ↓
button enabled/disabled
```

---

# Image Source

### TypeScript

```typescript
imageUrl = "/Angular.png";
```

### HTML

```html
<img [src]="imageUrl">
```

Static images can be stored in:

```text
public/
```

Flow:

```text
imageUrl
   ↓
[src]
   ↓
image displayed
```

---

# Class Binding

```typescript
selected = true;
```

```html
<p [class.selected]="selected">
  Angular
</p>
```

If `selected` is true, the CSS class is applied.

---

# Style Binding

```typescript
fontSize = "20px";
```

```html
<p [style.font-size]="fontSize">
  Angular
</p>
```

---

# Learning Hub Connection

Our buttons already use:

```html
[disabled]="disabledButton"
```

and the Angular image uses:

```html
[src]="imageUrl"
```

---

# Cheat Sheet

```text
[property]="value"
→ TypeScript → HTML

[disabled]
→ control button state

[src]
→ control image source

[class...]
→ control CSS class

[style...]
→ control style
```
