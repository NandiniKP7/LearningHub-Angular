# 6. Two-Way Binding


## What problem does this solve?

Sometimes an HTML input should display a TypeScript value and also
update that value when the user types. Two-way binding keeps both sides
synchronized.

**Direction:** TypeScript ⇄ HTML

## 1. A real-world example

Imagine a profile form with a display-name field. The input starts with
the saved name. When the user edits it, the component property and a
live preview should update automatically.

## 2. First understand the two directions

Property binding sends a value to HTML:

``` html
<input [value]="displayName">
```

Event binding can read changes from HTML:

``` html
<input (input)="onNameInput($event)">
```

Two-way binding combines the idea of reading and updating a value.
Angular's `ngModel` provides a convenient way to do this for form
controls.

## 3. Import FormsModule

`ngModel` is provided by Angular's forms package. A standalone component
must make `FormsModule` available to its template.

``` ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  displayName: string = 'Ada';
}
```

The TypeScript import brings `FormsModule` into the file. The
decorator's `imports` array makes its directives available to the
template.

## 4. Use \[(ngModel)\]

``` html
<label for="display-name">Display name</label>
<input id="display-name" [(ngModel)]="displayName">

<p>Preview: {{ displayName }}</p>
```

Initially, the input contains `Ada` and the preview displays `Ada`. If
the user types `Grace`, the component's `displayName` becomes `Grace`,
and the preview updates.

``` text
TypeScript displayName = 'Ada'
          ↓
Input displays Ada
          ↓
User types Grace
          ↓
ngModel updates displayName
          ↓
Interpolation displays Grace
```

## 5. Why the syntax looks like \[()\]

``` html
[(ngModel)]="displayName"
```

The square brackets represent the value flowing into the control, and
the parentheses represent changes flowing back. This is often called
"banana in a box."

Conceptually, it is similar to:

``` html
<input
  [ngModel]="displayName"
  (ngModelChange)="displayName = $event">
```

`ngModelChange` emits the updated model value. The combined syntax is
the convenient shorthand.

## 6. Two-way binding vs interpolation

``` html
<p>{{ displayName }}</p>
```

Interpolation only displays the value. It does not let the user edit it.

``` html
<input [(ngModel)]="displayName">
```

Two-way binding connects an editable control to the property. The same
property can then be displayed elsewhere with interpolation.

## 7. Important rules and common mistakes

-   Import `FormsModule` and add it to the standalone component's
    `imports`.
-   Use `[(ngModel)]="property"` for two-way binding with supported form
    controls.
-   The property must exist in the component class.
-   Do not put interpolation inside the binding:
    `[(ngModel)]="{{ displayName }}"` is incorrect.
-   `[(ngModel)]` is not the only form approach. Template-driven and
    reactive forms are covered in later topics.
-   When using `ngModel` inside a form, Angular's form registration
    rules may require a `name` attribute or standalone model
    configuration. Forms fundamentals will explain this in detail.
-   Two-way binding does not mean every Angular property automatically
    synchronizes in both directions.

## Quick reference

``` ts
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule]
})
export class AppComponent {
  displayName: string = 'Ada';
}
```

``` html
<input [(ngModel)]="displayName">
<p>{{ displayName }}</p>
```

**Memory rule:** `[()]` = value goes to the input and changes come back
to TypeScript.
