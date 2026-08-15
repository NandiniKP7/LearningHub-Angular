# Day 4 — Event Binding

## Concept

Event Binding lets a user action in HTML run TypeScript code.

```text
User action in HTML
        ↓
Event Binding
        ↓
TypeScript method
```

## Syntax

```html
(event)="method()"
```

Example:

```html
<button (click)="angularTopics()">Angular</button>
```

```typescript
angularTopics() {
  console.log("Angular selected");
}
```

```text
Click Angular
    ↓
(click)
    ↓
angularTopics()
    ↓
TypeScript code runs
```

## What Do Parentheses Mean?

```html
(click)
```

Parentheses tell Angular to listen for an event.

```html
(click)="angularTopics()"
```

means:

```text
Listen for click
      ↓
Run angularTopics()
```

---

# Changing Data After a Click

Running a method is only one part of Event Binding.

The method can also change data stored in the component.

## 1. Declare a Component Property

```typescript
selectedTechnology = "None";
```

This property belongs to the component.

Initially:

```text
selectedTechnology
        ↓
      "None"
```

## 2. Change That Property Inside a Method

```typescript
angularTopics() {
  this.selectedTechnology = "Angular";
}
```

We are **not creating another variable** here.

We are changing the existing `selectedTechnology` property.

```text
selectedTechnology = "None"
        ↓
Click Angular
        ↓
angularTopics()
        ↓
this.selectedTechnology = "Angular"
        ↓
selectedTechnology = "Angular"
```

---

# What Does `this.` Mean?

Example:

```typescript
export class App {
  selectedTechnology = "None";

  angularTopics() {
    this.selectedTechnology = "Angular";
  }
}
```

Inside the method:

```typescript
this.selectedTechnology
```

means:

```text
this
 ↓
current App component
 ↓
selectedTechnology property
```

So:

```typescript
this.selectedTechnology = "Angular";
```

means:

> Change the `selectedTechnology` property belonging to this `App` component.

---

# Display the Changed Property

The HTML can display the property using interpolation:

```html
<p>Selected: {{ selectedTechnology }}</p>
```

Complete flow:

```text
selectedTechnology = "None"
        ↓
Selected: None

Click Angular
        ↓
(click)="angularTopics()"
        ↓
angularTopics()
        ↓
this.selectedTechnology = "Angular"
        ↓
{{ selectedTechnology }}
        ↓
Selected: Angular
```

---

# Important — Why Is Text Already Visible Before the Click?

This HTML:

```html
<p>Selected: {{ selectedTechnology }}</p>
```

already exists when the page loads.

So initially:

```text
Selected: None
```

After clicking Angular:

```text
Selected: Angular
```

Event Binding changes the **value**.

It does not make the `<p>` itself appear only after clicking.

```text
Event Binding
→ reacts to an event
→ runs a method
→ can change data
```

Showing or hiding HTML based on a condition requires conditional rendering such as `@if`, which we will learn separately.

---

# Property Binding vs Event Binding

## Property Binding

```html
<button [disabled]="disabledButton">Angular</button>
```

```text
TypeScript → HTML
```

```text
[] → Property Binding
```

## Event Binding

```html
<button (click)="angularTopics()">Angular</button>
```

```text
HTML/User → TypeScript
```

```text
() → Event Binding
```

---

# Learning Hub Connection

We currently have:

```text
Developer Learning Hub

[Angular] [TypeScript] [C#]
```

Day 4 adds:

```text
Click button
    ↓
Run TypeScript method
    ↓
Change selectedTechnology
    ↓
Display changed value
```

Later, conditional rendering will let the selected technology control which component is displayed.

---

# Cheat Sheet

```typescript
selectedTechnology = "None";

angularTopics() {
  this.selectedTechnology = "Angular";
}
```

```html
<button (click)="angularTopics()">Angular</button>

<p>Selected: {{ selectedTechnology }}</p>
```

```text
(event)="method()"
→ Event Binding

this.property
→ property belonging to the current component

(click)
→ listen for click

{{ property }}
→ display the current property value
```
