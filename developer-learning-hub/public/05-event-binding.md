# 5. Event Binding


## What problem does this solve?

Property binding sends values from TypeScript to HTML. Event binding
lets Angular respond when a user clicks, types, or presses a key.

**Direction:** User/HTML → TypeScript

## 1. A real-world example

Imagine a shopping cart. Clicking "Add to cart" should increase the cart
count. The click happens in HTML, but the count is stored and changed in
TypeScript.

## 2. Basic syntax

``` html
(event)="method()"
```

Parentheses tell Angular to listen for the named event. The expression
on the right runs when the event occurs.

## 3. Define a property and method in TypeScript

``` ts
export class AppComponent {
  cartCount: number = 0; // Initial number of items.

  addToCart(): void {
    this.cartCount = this.cartCount + 1;
  }
}
```

`addToCart()` is a method. `void` means it does not return a value.
`this.cartCount` refers to the property belonging to the current
component.

## 4. Connect the click in HTML

``` html
<button (click)="addToCart()">Add to cart</button>
<p>Items: {{ cartCount }}</p>
```

``` text
User clicks button
       ↓
(click) runs addToCart()
       ↓
this.cartCount changes
       ↓
Interpolation displays the new count
```

The paragraph already exists when the page loads. The event changes its
displayed value; it does not create the paragraph.

## 5. What does `this.` mean?

``` ts
cartCount: number = 0;

addToCart(): void {
  this.cartCount = 1;
}
```

`this` refers to the current component instance. We are changing the
existing property, not declaring a new variable.

Inside the component's TypeScript method, use `this.cartCount`. In the
HTML template, use `cartCount` without `this`.

## 6. Common browser events

  Event         When it occurs
  ------------- -----------------------------------------------------
  `(click)`     An element is clicked.
  `(input)`     The value of an input changes as the user edits it.
  `(change)`    A change is committed, depending on the control.
  `(keyup)`     A keyboard key is released.
  `(keydown)`   A keyboard key is pressed.
  `(submit)`    A form is submitted.

Example:

``` html
<button (click)="addToCart()">Add</button>
```

## 7. What is `$event`?

`$event` is Angular's special template variable containing information
about the event that occurred.

``` html
<input (input)="onInput($event)">
```

The method receives the browser event:

``` ts
onInput(event: Event): void {
  console.log(event);
}
```

The parameter name `event` is our choice. `$event` is the special name
used in the template.

### Reading an input's value

A browser event has a target, but TypeScript only knows that it is a
general `EventTarget`. We can assert that the target is an HTML input:

``` ts
onInput(event: Event): void {
  const input = event.target as HTMLInputElement;
  console.log(input.value);
}
```

-   `event.target` is the element that produced the event.
-   `as HTMLInputElement` tells TypeScript which element type we expect.
-   `.value` reads the current text.

This is useful when a requirement needs the actual input value. A
simpler click handler does not need `$event`.

## 8. Property binding vs event binding

  Binding    Direction                Example
  ---------- ------------------------ ---------------------------
  Property   TypeScript → HTML        `[disabled]="isDisabled"`
  Event      HTML/User → TypeScript   `(click)="addToCart()"`

## Important rules

-   Parentheses mean event binding: `(event)="expression"`.
-   The method must exist in the component's template context.
-   `method()` calls the method; `method` refers to it without calling
    it.
-   Use `this.property` inside TypeScript methods to access component
    properties.
-   `$event` is available when event information is needed.
-   Changing a property updates existing bindings; showing/hiding
    elements conditionally is covered by template control flow later.

## Quick reference

``` ts
count: number = 0;

increment(): void {
  this.count++;
}
```

``` html
<button (click)="increment()">Add</button>
<p>{{ count }}</p>
```

**Memory rule:** Parentheses `()` = user action → TypeScript method.
