# String Interpolation

String Interpolation lets the HTML template **display data stored in the component TypeScript**.

---

# Where Do We Use Interpolation?

The value is stored in:

```text
Component TypeScript (.ts)
```

and displayed in:

```text
Component HTML (.html)
```

Flow:

```text
TypeScript property
       ↓
{{ property }}
       ↓
HTML displays value
```

---

# Simple Example

### TypeScript

```typescript
title = "Developer Learning Hub";
```

### HTML

```html
<h1>{{ title }}</h1>
```

Browser:

```text
Developer Learning Hub
```

---

# Literal Text vs Component Property

```html
<h1>title</h1>
```

displays:

```text
title
```

But:

```html
<h1>{{ title }}</h1>
```

means:

```text
Find the title property
in this component
and display its value
```

---

# Case Sensitivity

TypeScript:

```typescript
title = "Developer";
```

HTML must use:

```html
{{ title }}
```

not:

```html
{{ Title }}
```

Property names are case-sensitive.

---

# Simple Expressions

Interpolation can evaluate simple expressions:

```html
{{ count + 1 }}
```

```html
{{ firstName + " " + lastName }}
```

Keep larger logic in TypeScript.

---

# Learning Hub Connection

```typescript
title = "Developer Learning Hub";
```

```html
<h1>{{ title }}</h1>
```

Flow:

```text
App component
title property
      ↓
{{ title }}
      ↓
Developer Learning Hub
```

---

# Cheat Sheet

```text
{{ value }}
→ display component data

.ts
→ owns the value

.html
→ reads/displays the value
```
