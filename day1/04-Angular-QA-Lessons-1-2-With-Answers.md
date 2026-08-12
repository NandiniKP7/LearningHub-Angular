# Angular Q&A — Lessons 1–2

This file stores the understanding questions and answers separately from the concept notes.

---

# Topic 1 — Angular Application Setup & Architecture

## Q1

What is the difference between:

```text
index.html
```

and:

```text
main.ts
```

in the startup flow?

### Answer

`index.html` is the page Angular loads into the browser.

`main.ts` starts the Angular application and bootstraps the root component.

```text
index.html
    ↓
main.ts
    ↓
root component
```

---

## Q2

What does this mean conceptually?

```typescript
bootstrapApplication(AppComponent);
```

### Answer

It tells Angular which component should start as the root of the application.

```text
bootstrapApplication(AppComponent)
                ↓
        Start AppComponent
```

---

## Q3

Why is `AppComponent` called the root component?

### Answer

Because it is the first/main component Angular bootstraps. Other UI components can then be used underneath it.

```text
AppComponent
    ↓
Application UI
```

---

## Q4

Given:

```typescript
title = 'Developer Learning Hub';
```

where does `title` live?

- A. Browser
- B. HTML
- C. Component TypeScript class
- D. `main.ts`

### Answer

**C. Component TypeScript class**

```typescript
export class AppComponent {
  title = 'Developer Learning Hub';
}
```

The component owns the value. The HTML template can read and display it.

---

## Q5

Explain this flow in your own words:

```text
main.ts
   ↓
AppComponent
   ↓
HTML template
   ↓
Browser
```

### Answer

`main.ts` starts Angular and bootstraps the root component.

The root component connects to its HTML template.

The HTML template displays the UI in the browser.

```text
main.ts
   ↓
starts root component
   ↓
component uses HTML template
   ↓
browser displays UI
```

---

# Topic 2 — String Interpolation

## Q6

Given:

```typescript
course = 'Angular';
```

how would you display the value inside an `<h2>`?

### Answer

```html
<h2>{{ course }}</h2>
```

Browser:

```text
Angular
```

---

## Q7

What is the difference between:

```html
<h1>title</h1>
```

and:

```html
<h1>{{ title }}</h1>
```

### Answer

```html
<h1>title</h1>
```

displays the literal word:

```text
title
```

But:

```html
<h1>{{ title }}</h1>
```

reads the value of the `title` property from the component.

---

## Q8

Given:

```typescript
title = 'Developer Learning Hub';
```

and:

```html
<h1>{{ title }}</h1>
```

what happens in the browser if TypeScript changes to:

```typescript
title = 'My Training App';
```

Explain why.

### Answer

The browser displays:

```text
My Training App
```

because:

```html
{{ title }}
```

reads the current value of `title` from the component.

```text
title = 'My Training App'
          ↓
      {{ title }}
          ↓
My Training App
```

---

## Q9 — Debugging

TypeScript:

```typescript
currentFocus = 'Angular';
```

HTML:

```html
<p>{{ currentfocus }}</p>
```

What is wrong?

### Answer

The property name does not match.

TypeScript has:

```typescript
currentFocus
```

but HTML uses:

```html
currentfocus
```

Property names are case-sensitive.

Correct:

```html
<p>{{ currentFocus }}</p>
```

---

## Q10 — Tricky

What is the difference between:

```html
{{ title }}
```

and:

```html
{{ 'title' }}
```

### Answer

```html
{{ title }}
```

reads the `title` property from the component.

```html
{{ 'title' }}
```

is a string and displays the literal text:

```text
title
```

---

# Quick Review

```text
index.html
    ↓
main.ts
    ↓
bootstrap root component
    ↓
component TypeScript
    ↓
HTML template
    ↓
browser
```

```text
TypeScript

title = "Developer Learning Hub"

        ↓

HTML

{{ title }}

        ↓

Browser

Developer Learning Hub
```
