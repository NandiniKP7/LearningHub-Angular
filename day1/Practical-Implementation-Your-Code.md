# Practical Implementation — Lesson 1

## What We Built

Display the Learning Hub title using Angular string interpolation.

```text
TypeScript
   ↓
HTML
   ↓
Browser
```

---

## Files Changed

```text
src/app/app.ts
src/app/app.html
```

---

## `app.ts`

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = "Developer Learning Hub"
}
```

---

## `app.html`

```html
<h1>{{ title }}</h1>
```

---

## Flow

```text
app.ts

title = "Developer Learning Hub"
        ↓
app.html

{{ title }}
        ↓
Browser

Developer Learning Hub
```

---

## Result

```text
Developer Learning Hub
```
