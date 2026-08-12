# Day 2 — Components Q&A with Answers

## Q1. Why do we split an Angular application into smaller components?

**Answer:**  
Having everything in one component makes that component responsible for too much. Splitting the UI into components makes the application easier to organize and manage.

---

## Q2. What are the three main parts of a component, and what does each one do?

**Answer:**

```text
TypeScript → data + behavior
HTML       → UI
CSS        → styling
```

---

## Q3. What does `@Component` tell Angular?

**Answer:**  
`@Component` tells Angular that the class is an Angular component and provides information about the component.

---

## Q4. What does `selector` do?

**Answer:**  
The selector gives the component an HTML name that can be used to display that component.

Example:

```typescript
selector: 'app-angular-topics'
```

becomes:

```html
<app-angular-topics></app-angular-topics>
```

---

## Q5. Given this selector, how do you write the component in HTML?

```typescript
selector: 'app-angular-topics'
```

**Answer:**

```html
<app-angular-topics></app-angular-topics>
```

---

## Q6. What does `templateUrl` point to?

**Answer:**  
The HTML file belonging to the component.

```typescript
templateUrl: './angular-topics.component.html'
```

---

## Q7. What does `styleUrl` point to?

**Answer:**  
The CSS file belonging to the component.

```typescript
styleUrl: './angular-topics.component.css'
```

---

## Q8. What is `imports: []` used for?

**Answer:**  
It lists the dependencies or other components that this standalone component needs to use.

---

## Q9. Match each file with its purpose.

**Answer:**

```text
angular-topics.component.ts   → data + behavior
angular-topics.component.html → UI
angular-topics.component.css  → styling
```

---

## Q10. What is an Angular component?

**Answer:**  
An Angular component represents a part of the UI. It uses TypeScript for data and behavior, HTML for the UI, and CSS for styling.

---

# Calling One Component from Another

## Q11. Why is creating `AngularTopicsComponent` alone not enough to display it inside `App`?

**Answer:**  
`App` must know about the component and its HTML must use the component's selector.

---

## Q12. What import do we add to `app.ts`?

**Answer:**

```typescript
import { AngularTopicsComponent }
  from './angular-topics/angular-topics.component';
```

---

## Q13. After importing it, where do we add `AngularTopicsComponent`?

**Answer:**  
Inside the `imports` array of the root `App` component.

```typescript
imports: [AngularTopicsComponent]
```

---

## Q14. What do we place inside `app.html`?

**Answer:**

```html
<app-angular-topics></app-angular-topics>
```

---

## Q15. Explain the component connection.

**Answer:**

```text
AngularTopicsComponent
        ↓
defines selector
        ↓
App imports AngularTopicsComponent
        ↓
app.html uses selector
        ↓
AngularTopicsComponent appears
```

---

## Q16. Which component is the parent?

**Answer:**  
`App` is the parent.

---

## Q17. Which component is the child?

**Answer:**  
`AngularTopicsComponent` is the child.

---

## Q18. Why is `App` the parent?

**Answer:**  
Because the `App` template contains the selector for `AngularTopicsComponent`.

```html
<app-angular-topics></app-angular-topics>
```

So:

```text
App
PARENT
   ↓
<app-angular-topics>
   ↓
AngularTopicsComponent
CHILD
```
