# Learning Hub --- Practical Implementation & Revision

One growing practical reference. Concept notes stay in
`developer-learning-hub/public/`. This file belongs in the
repository-root `PracticalImplementation/` folder.

This guide uses the previously shared application code and historical
exercises. Verify each example against the latest checkout before
editing. No new features are required.

## Topic 1 --- Application Setup & Architecture

### What we built

The existing Angular application, its root component, static assets, and
application configuration.

### Launch

From the repository root:

``` bash
cd developer-learning-hub
npm install
npm start
```

For an existing installation, skip `npm install`. If the start script
differs, inspect `package.json` and use `npx ng serve`. Open the address
printed by the server, normally http://localhost:4200.

### Trace the startup

``` text
Browser → index.html → main.ts
→ bootstrapApplication(root component, appConfig)
→ root template → child components / routed view
```

Inspect `src/index.html`, `src/main.ts`, `src/app/app.config.ts`, the
root component, and `src/app/app.routes.ts`. The build system loads the
application JavaScript; `app.config.ts` supplies application-wide
providers. `angular.json` configures the workspace/build; `package.json`
contains dependencies and scripts.

### Code comments

Beside the existing bootstrap call, add:

``` ts
// Starts Angular with the root component and application-wide configuration.
// The root template is the entry point for the visible application.
```

Do not replace existing bootstrap code.

### Checkpoint

Explain the purpose of each startup file and run the existing app
without creating a new project.

## Topic 2 --- Components

### What we built

The root page, technology topic lists, reusable topic cards, and topic
notes. Each component owns its template and behavior.

### Current architecture to trace

``` text
Root App
  → Router outlet
      → AngularTopicsComponent
          → TopicCard (repeated)
      → TopicNotes (selected topic route)
```

The router selects a page; a selector places a directly imported child
inside its parent template.

Inspect `angular-topics.component.ts/.html`,
`topic-card.component.ts/.html`, the root component, and
`app.routes.ts`.

### Connection

Find the TypeScript import of `TopicCard`, the decorator's
`imports: [TopicCard]`, and `<app-topic-card>` in the parent HTML. The
first imports the class into TypeScript; the second makes it available
to the template; the selector places the child.

### Comments

``` ts
// Makes TopicCard available to this component's HTML template.
imports: [TopicCard],
```

``` html
<!-- Reuse one card component for each topic.
     The parent supplies data; the card owns its display and interactions. -->
```

Add these only where they match current code. Input/output details
belong to later topics.

### Checkpoint

Trace one parent-child connection and explain why importing a class
alone does not render it.

## Topic 3 --- String Interpolation

### What we built

Component properties supply text displayed by HTML.

Earlier application code:

``` ts
title = 'Angular Topics';
```

``` html
<h1>{{ title }}</h1>
```

Confirm the current lines before editing.

### Flow

``` text
Component property → {{ expression }} → displayed value
```

Names are case-sensitive. Literal `title` is text; `{{ title }}` reads
the property. Simple expressions are allowed.

### Comment

``` ts
// Page heading displayed by this component's template.
title = 'Angular Topics';
```

### Checkpoint

Find two interpolations and identify their TypeScript sources.

## Topic 4 --- Property Binding

### What we built

TypeScript controls HTML properties, including an image source, disabled
state, classes, and styles.

Earlier current-app example:

``` ts
imageUrl = '/Angular.png';
```

``` html
<img class="angular-logo" [src]="imageUrl" alt="Angular logo" />
```

The static image is stored in `public/`; confirm its current URL.

### Historical exercises

``` ts
disabledButton = false;
selected = true;
fontSize = '20px';
```

``` html
<button [disabled]="disabledButton">Angular</button>
<p [class.selected]="selected">Angular</p>
<p [style.font-size]="fontSize">Angular</p>
```

These are practice examples, not a claim that all remain in the app. The
cleaned concept notes also show `[style.font-size.px]="fontSize"` with a
numeric value.

### Comment

``` ts
// URL of the static logo used by the Angular topics template.
imageUrl = '/Angular.png';
```

### Checkpoint

Trace the logo binding and explain disabled, class, and style binding.
Revisit style binding in a small later exercise.

## Topic 5 --- Event Binding

### What we built

HTML user actions run TypeScript methods and can change component state.

### Historical exercise

``` ts
selectedTechnology = 'None';

angularTopics(): void {
  this.selectedTechnology = 'Angular';
}
```

``` html
<button (click)="angularTopics()">Angular</button>
<p>Selected: {{ selectedTechnology }}</p>
```

The paragraph already exists; the event changes its value. Conditional
rendering is separate.

### Current-app search example

Earlier code used:

``` ts
onSearch(event: Event): void {
  this.searchText.set(
    (event.target as HTMLInputElement).value
  );
}
```

``` html
<input
  type="text"
  [value]="searchText()"
  (input)="onSearch($event)"
/>
```

Confirm the current code before adding comments. This is explicit
property and event binding, not ngModel.

### Flow

``` text
User types → input event → $event → onSearch
→ event.target identifies the input
→ input.value supplies text → searchText updates
→ dependent UI can update
```

### Comment

``` ts
// Reads the text from the input that triggered the event.
// Updating the signal lets the search-dependent UI react.
```

`as HTMLInputElement` tells TypeScript that the target has a `.value`
property. `this` refers to the current component instance.

### Checkpoint

Trace one click and one input event. Explain `method()` versus `method`,
`$event`, `event.target`, and `this.property`.

## Topic 6 --- Two-Way Binding

### What we practiced

An editable learning goal and live preview, synchronized through
ngModel.

### Historical exercise

``` ts
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  // Keep the existing component metadata.
})
export class App {
  topic = 'Learn Angular';
}
```

``` html
<input [(ngModel)]="topic">
<p>Current Goal: {{ topic }}</p>
```

This is illustrative historical code, not a replacement for the current
root component. FormsModule must be imported into the standalone
component and listed in its decorator imports.

### Flow

``` text
Initial TS value → input
User edits input → ngModel updates TS property
→ interpolation displays the new value
```

### Current-code check

Search for `ngModel` and `FormsModule`. If the old exercise has been
removed, record it as historical practice. Do not reintroduce it just to
match the notes.

### Comment, only if ngModel remains

``` ts
// Makes ngModel available to this standalone component's template.
```

### Checkpoint

Explain FormsModule, write `[(ngModel)]="topic"`, and describe both
directions.

## How Topics 1--6 Work Together

``` text
Angular starts the root component
→ a component renders its template
→ interpolation displays a value
→ property binding controls an HTML property
→ user action triggers an event
→ TypeScript updates state
→ Angular updates the relevant UI
```

Two-way binding is a convenient connection for supported editable
controls, not a replacement for every property/event binding.

Reconstruct the Angular topics page: identify its component, title,
logo, search input, handler, and child card. Trace typing to the
displayed list. Later signal and control-flow lessons explain the
remaining details.

## Code Commenting Rules

Comment why a connection exists or how data moves, not obvious syntax.
Add a few comments beside the relevant code.

Good:

``` ts
// Read-only topic data comes from the shared service.
// The template uses it to build the list of cards.
```

Avoid:

``` ts
// Declare a string variable.
```

Preserve existing behavior, imports, routes, and naming. Do not copy
historical code over newer implementations. Review the diff and run the
app after changes.

## Safe Cleanup and Check-in

-   [ ] Confirm all six permanent Concept READMEs remain in
    `developer-learning-hub/public/`.
-   [ ] Compare old day1--day5 concept notes with permanent notes;
    preserve useful missing explanations.
-   [ ] Compare old practical notes with this file; preserve unique
    useful exercises and explanations.
-   [ ] Inspect the latest application code and update historical
    references where needed.
-   [ ] Add meaningful comments to actual TypeScript/HTML files.
-   [ ] Run the app and verify existing pages and interactions.
-   [ ] Review `git diff` for accidental changes.
-   [ ] Commit this README and code comments.
-   [ ] Only then remove redundant day1--day5 folders and commit the
    cleanup.

The old folders are not yet certified safe to delete. Keep day6 and
later folders until their revision material is consolidated.

## Revision Checkpoint

Topics 1--6 have been reviewed verbally. Current-code tracing, comments,
and preservation verification remain. Mark roadmap topics complete only
after their practical checkpoints. Carry unfinished work forward without
adding new features.

## Future Revision Sections

Append Topic 7 and later topics to this same file as they are revised.
Do not create another daily practical README.
