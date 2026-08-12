# String Interpolation

## 1. Concept

### What Problem Are We Solving?

Our component has information:

```typescript
title = "Developer Learning Hub";
```

The user needs to see that information in the browser.

The HTML template needs a way to read the value from the component.

Angular provides **string interpolation**.

---

## Basic Syntax

```html
{{ value }}
```

Example:

```html
<h1>{{ title }}</h1>
```

Read this as:

> Get the current value of `title` from the component and display it as text.

---

## Visual Flow

```text
AppComponent TypeScript

title = "Developer Learning Hub"
              │
              ▼
          {{ title }}
              │
              ▼
        HTML Template
              │
              ▼
           Browser

Developer Learning Hub
```

---

## Hard-Coded HTML vs Interpolation

### Hard-coded text

```html
<h1>title</h1>
```

Browser:

```text
title
```

The word `title` is treated as normal HTML text.

### Interpolation

TypeScript:

```typescript
title = "Developer Learning Hub";
```

HTML:

```html
<h1>{{ title }}</h1>
```

Browser:

```text
Developer Learning Hub
```

Angular reads the value of `title` from the component.

---

## What Happens When the Value Changes?

TypeScript:

```typescript
title = "My Training App";
```

The HTML can remain:

```html
<h1>{{ title }}</h1>
```

Browser:

```text
My Training App
```

The template displays the current value of the component property.

---

## Component → Template → Browser

```text
Component TypeScript
        │
        │ title
        ▼
     {{ title }}
        │
        ▼
   HTML Template
        │
        ▼
      Browser
```

---

# Cheat Sheet

### TypeScript

```typescript
title = "Developer Learning Hub";
```

### HTML

```html
{{ title }}
```

### Result

```text
Developer Learning Hub
```

```text
TypeScript                         HTML

title = "Developer Learning Hub"  →  {{ title }}
                                      ↓
                               Developer Learning Hub
```

> Q&A is stored separately in the Angular Q&A README.
