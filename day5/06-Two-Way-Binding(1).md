# Two-Way Binding

Two-Way Binding keeps an **HTML input and a TypeScript property synchronized**.

Direction:

```text
TypeScript ⇄ HTML
```

---

# Where Do We Use Two-Way Binding?

The property lives in:

```text
TypeScript (.ts)
```

The editable input lives in:

```text
HTML (.html)
```

`[(ngModel)]` connects both directions.

```text
TypeScript property
       ⇅
HTML input
```

---

# Simple Example

### TypeScript

```typescript
topic = "Learn Angular";
```

### HTML

```html
<input [(ngModel)]="topic">

<p>Current Goal: {{ topic }}</p>
```

Initially:

```text
topic = "Learn Angular"
        ↓
input displays Learn Angular
```

When the user edits the input:

```text
User types Learn TypeScript
        ↓
[(ngModel)]
        ↓
topic becomes Learn TypeScript
        ↓
{{ topic }}
        ↓
Current Goal updates
```

---

# `FormsModule`

`ngModel` requires:

```typescript
import { FormsModule } from '@angular/forms';
```

and:

```typescript
imports: [FormsModule]
```

Flow:

```text
FormsModule
     ↓
makes ngModel available
     ↓
[(ngModel)]
```

---

# Why Is It Two-Way?

Property Binding gives:

```text
TypeScript → HTML
```

Event Binding gives:

```text
HTML/User → TypeScript
```

Two-Way Binding gives:

```text
TypeScript ⇄ HTML
```

---

# Learning Hub Connection

We added:

```typescript
topic = "Learn Angular";
```

and:

```html
<input [(ngModel)]="topic">
<p>Current Goal: {{ topic }}</p>
```

So the Learning Hub goal changes immediately as the user types.

---

# Cheat Sheet

```text
[property]
→ TypeScript → HTML

(event)
→ HTML/User → TypeScript

[(ngModel)]
→ TypeScript ⇄ HTML

FormsModule
→ required for ngModel
```
