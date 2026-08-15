# Two-Way Binding

Two-Way Binding keeps an HTML input and a TypeScript property synchronized.

Direction:

```text
TypeScript ⇄ HTML
```

## TypeScript

```typescript
topic = "Learn Angular";
```

## HTML

```html
<input [(ngModel)]="topic">

<p>Current Goal: {{ topic }}</p>
```

If the user changes the input, the `topic` property changes too.

## FormsModule

`ngModel` requires:

```typescript
import { FormsModule } from '@angular/forms';
```

and:

```typescript
imports: [FormsModule]
```

## Flow

```text
topic = "Learn Angular"
        ↓
input displays value
        ↓
user edits input
        ↓
topic changes
        ↓
{{ topic }} updates
```

## Cheat Sheet

```text
[property]
→ TypeScript → HTML

(event)
→ HTML/User → TypeScript

[(ngModel)]
→ TypeScript ⇄ HTML
```
