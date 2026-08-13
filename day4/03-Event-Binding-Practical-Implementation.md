# Day 4 — Practical Implementation: Event Binding

## Learning Hub — Design Direction

The application we are gradually building toward:

```text
Developer Learning Hub
│
├── Angular      [button]
├── TypeScript   [button]
└── C#           [button]
        ↓
Select Technology
        ↓
Load that Technology's Topics
        ↓
Select a Topic
        ↓
Concept / Q&A / Practical Implementation
```

We are **not building the entire design in Day 4**.

Today we are adding the next piece: making the technology buttons respond when the user clicks them.

---

## What We Accomplished Today

Before Day 4, our buttons existed but did not react to clicks:

```text
[Angular] [TypeScript] [C#]
```

Day 4 added Event Binding:

```text
[Angular]
    ↓ click
angularTopics()

[TypeScript]
    ↓ click
typeScriptTopics()

[C#]
    ↓ click
cSharpTopics()
```

We:

1. Kept the three technology buttons created earlier.
2. Added `(click)` Event Binding to each button.
3. Created a TypeScript method for each technology.
4. Confirmed each click can run TypeScript code.
5. Learned that a component property can store the selected technology.
6. Learned how `this.property` changes a property belonging to the current component.
7. Learned that Event Binding can change data, while interpolation displays the changed data.
8. Identified that showing `AngularTopicsComponent` **only after clicking Angular** requires conditional rendering such as `@if`, which we have not learned yet.

---

# Step 1 — Starting `app.ts`

Our app already contained the title and button-disabled property from previous lessons.

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularTopicsComponent } from "./angular-topics/angular-topics.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AngularTopicsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = "Developer Learning Hub";
  disabledButton = false;
}
```

---

# Step 2 — Add Event Methods to `app.ts`

We added three methods:

```typescript
angularTopics() {
  console.log("Next I have link angular component here - so that it displays only angular topics");
}

typeScriptTopics() {
  console.log("Next I have link TypeScript component here - so that it displays only TypeScript topics");
}

cSharpTopics() {
  console.log("Next I have link C# component here - so that it displays only C# topics");
}
```

At this stage:

```text
method exists
    ↓
ready to be called by HTML
```

The console messages are reminders of the future Learning Hub behavior.

---

# Step 3 — Add `(click)` to `app.html`

We connected each button to its method.

```html
<h1>{{ title }}</h1>

<button
  [disabled]="disabledButton"
  (click)="angularTopics()">
  Angular
</button>

<button
  [disabled]="disabledButton"
  (click)="typeScriptTopics()">
  TypeScript
</button>

<button
  [disabled]="disabledButton"
  (click)="cSharpTopics()">
  C#
</button>

<app-angular-topics></app-angular-topics>
```

Now:

```text
Click Angular
      ↓
(click)="angularTopics()"
      ↓
angularTopics()
      ↓
TypeScript code runs
```

---

# Step 4 — Store the Selected Technology

To display which technology was clicked, we need one component property:

```typescript
selectedTechnology = "None";
```

This gives the component somewhere to remember the current selection.

```text
selectedTechnology
        ↓
currently selected technology
```

---

# Step 5 — Change the Property with `this.`

Each method can update the same property.

```typescript
angularTopics() {
  this.selectedTechnology = "Angular";
}

typeScriptTopics() {
  this.selectedTechnology = "TypeScript";
}

cSharpTopics() {
  this.selectedTechnology = "C#";
}
```

Here:

```text
this.selectedTechnology
```

means:

```text
selectedTechnology property
belonging to this App component
```

Example:

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

# Step 6 — Display the Selected Value

Use interpolation in `app.html`:

```html
<p>Selected: {{ selectedTechnology }}</p>
```

Now the complete flow is:

```text
Click TypeScript
        ↓
(click)="typeScriptTopics()"
        ↓
typeScriptTopics()
        ↓
this.selectedTechnology = "TypeScript"
        ↓
{{ selectedTechnology }}
        ↓
Selected: TypeScript
```

---

# Important Discovery

We originally wanted the selected text or Angular topics to appear **only after clicking**.

Event Binding alone does not do that.

With:

```html
<p>Selected: {{ selectedTechnology }}</p>
```

the `<p>` already exists.

Initially:

```text
Selected: None
```

After clicking Angular:

```text
Selected: Angular
```

To conditionally show/remove HTML:

```text
nothing
   ↓ click Angular
Angular content appears
```

we need a later concept:

```text
@if
```

So we did not add that behavior prematurely.

---

# Day 4 Result

We moved the Learning Hub from:

```text
Buttons displayed
```

to:

```text
Buttons displayed
      ↓
User clicks
      ↓
Event Binding
      ↓
TypeScript method runs
      ↓
Component data can change
      ↓
HTML can display the changed value
```

## Concepts Connected So Far

```text
Interpolation
{{ value }}
→ display component data

Property Binding
[property]="value"
→ TypeScript controls HTML property

Event Binding
(event)="method()"
→ user action runs TypeScript

this.property
→ access/change a property belonging to the current component
```

## Next Design Step

The Learning Hub still displays:

```html
<app-angular-topics></app-angular-topics>
```

all the time.

Eventually we want:

```text
Click Angular
      ↓
show AngularTopicsComponent

Click TypeScript
      ↓
show TypeScript topics

Click C#
      ↓
show C# topics
```

That behavior will be added when we learn the Angular concepts needed to control what UI is displayed.
