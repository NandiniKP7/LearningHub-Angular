# Topic 17 — Custom Pipes

**Revision date:** September 10, 2026  
**Planned learning time:** 1–2 days

## What problem does a custom pipe solve?

Angular already gives us built-in pipes such as:

```html
{{ name | uppercase }}
{{ price | currency:'USD' }}
{{ today | date:'shortDate' }}
```

But sometimes the display transformation we need is specific to our application.

For example, suppose we store:

```text
wireless keyboard
```

but want to display:

```text
Product: wireless keyboard
```

Angular does not have a built-in `productLabel` pipe for that rule.

We can create our own **custom pipe**.

```text
value
  ↓
our custom transformation
  ↓
formatted value for the template
```

A custom pipe lets us create a reusable display transformation with our own rules.

---

# 1. Built-In Pipe vs Custom Pipe

A built-in pipe is provided by Angular.

```html
{{ productName | uppercase }}
```

A custom pipe is created by us.

```html
{{ productName | productLabel }}
```

The template syntax is still the same:

```text
value | pipeName
```

The difference is who defines the transformation.

```text
Built-in pipe
→ Angular provides the transformation

Custom pipe
→ we define the transformation
```

---

# 2. The Main Parts of a Custom Pipe

A basic custom pipe looks like this:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productLabel'
})
export class ProductLabelPipe implements PipeTransform {

  transform(value: string): string {
    return `Product: ${value}`;
  }
}
```

There are three important pieces:

```text
@Pipe
PipeTransform
transform()
```

We will look at each one.

---

# 3. `@Pipe`

Angular needs to know that our class is a pipe.

We mark the class with:

```ts
@Pipe({
  name: 'productLabel'
})
```

`@Pipe` is Angular metadata.

It tells Angular:

```text
This class is an Angular pipe.
```

The `name` determines what we write in the template.

```ts
name: 'productLabel'
```

Template:

```html
{{ productName | productLabel }}
```

Connection:

```text
@Pipe name
productLabel
     ↓
template
| productLabel
```

---

# 4. `PipeTransform`

Our pipe class can implement Angular's `PipeTransform` interface:

```ts
export class ProductLabelPipe implements PipeTransform {
}
```

This tells TypeScript that this class is intended to follow Angular's pipe transformation structure.

The important method is:

```ts
transform()
```

So:

```text
PipeTransform
→ contract for a pipe transformation

transform()
→ method that performs the transformation
```

---

# 5. `transform()`

The `transform()` method receives the value coming from the template.

Example:

```ts
transform(value: string): string {
  return `Product: ${value}`;
}
```

Template:

```html
{{ productName | productLabel }}
```

If:

```ts
productName = 'wireless keyboard';
```

then conceptually:

```text
wireless keyboard
       ↓
transform(value)
       ↓
Product: wireless keyboard
```

The returned value is what the template displays.

---

# 6. Typed Input and Output

Look closely at:

```ts
transform(value: string): string
```

There are two type positions.

```text
value: string
→ input to the pipe must be a string

): string
→ transform() returns a string
```

So:

```ts
transform(value: string): string
```

can be read as:

> Receive a string and return a string.

Another pipe could receive a number:

```ts
transform(value: number): string {
  return `Score: ${value}`;
}
```

Here:

```text
input  → number
output → string
```

The input and output types do not have to be identical.

Typing the method helps TypeScript check the custom pipe logic.

---

# 7. Custom Pipe Arguments

Built-in pipes can receive arguments:

```html
{{ price | currency:'USD' }}
```

Custom pipes can do the same.

Suppose we want the caller to choose the label.

Instead of always displaying:

```text
Product: wireless keyboard
```

we may want:

```text
Item: wireless keyboard
```

or:

```text
Featured Product: wireless keyboard
```

Our pipe can accept an additional argument:

```ts
transform(value: string, label: string): string {
  return `${label}: ${value}`;
}
```

Template:

```html
{{ productName | productLabel:'Item' }}
```

Flow:

```text
productName
→ value parameter

'Item'
→ label parameter
```

So Angular effectively gives `transform()`:

```text
value = productName
label = 'Item'
```

and the pipe returns:

```text
Item: wireless keyboard
```

---

# 8. Multiple Arguments

A custom pipe can accept more than one argument.

Example:

```ts
transform(
  value: string,
  label: string,
  showColon: boolean
): string {
  if (showColon) {
    return `${label}: ${value}`;
  }

  return `${label} ${value}`;
}
```

Template:

```html
{{ productName | productLabel:'Item':true }}
```

Remember the syntax:

```text
|
→ apply the pipe

:
→ pass an argument
```

Mapping:

```html
{{ productName | productLabel:'Item':true }}
```

to:

```ts
transform(
  value,
  label,
  showColon
)
```

Conceptually:

```text
productName → value
'Item'      → label
true        → showColon
```

---

# 9. Standalone Custom Pipes

Modern Angular applications commonly use standalone APIs.

A custom pipe can explicitly be standalone:

```ts
@Pipe({
  name: 'productLabel',
  standalone: true
})
```

Then a standalone component can import it:

```ts
imports: [ProductLabelPipe]
```

The connection is:

```text
custom pipe file
      ↓
export pipe class
      ↓
component .ts
imports pipe class
      ↓
@Component imports
      ↓
component .html
uses pipe name
```

You will see the complete files together at the end of this README.

---

# 10. Pure Pipes

Angular pipes are **pure by default**.

This is an important concept, but the basic idea is simpler than the name sounds.

A pure pipe is designed for transformations where the result depends on its input value and arguments.

Example:

```text
"keyboard"
    ↓
productLabel
    ↓
"Product: keyboard"
```

If the input changes:

```text
"monitor"
```

Angular can evaluate the pipe for the new input.

## Why does Angular use pure pipes?

Angular tries to avoid unnecessary work.

If the relevant input has not changed, Angular does not need to repeatedly perform the same pure transformation.

Think:

```text
same input
→ same transformation
→ no reason to repeatedly redo unnecessary work
```

---

# 11. Pure Pipes and Objects / Arrays

There is one important detail.

With objects and arrays, Angular's pure-pipe change detection cares about the value/reference changing rather than arbitrary internal mutation.

Suppose we have an array:

```ts
products = ['Laptop', 'Monitor'];
```

Mutating the existing array:

```ts
this.products.push('Keyboard');
```

keeps the same array object/reference.

But replacing it:

```ts
this.products = [...this.products, 'Keyboard'];
```

creates a new array reference.

This distinction matters when pure pipes receive arrays or objects.

For now, remember:

```text
primitive value changes
→ easy to detect

new object/array reference
→ change can be detected

mutating the same object/array in place
→ can be a problem for a pure pipe
```

This is also one reason immutable update patterns are useful.

---

# 12. What About `pure: false`?

Angular allows a pipe to be configured as impure:

```ts
@Pipe({
  name: 'somePipe',
  pure: false
})
```

An impure pipe can be evaluated much more frequently.

That can be useful in special cases, but it can also create unnecessary work.

For your current level, the rule is:

```text
Default
→ keep custom pipes pure

pure: false
→ special case
→ use cautiously
```

Do not add:

```ts
pure: false
```

just because an object or array is not updating as expected.

First check whether the data should be updated immutably.

---

# 13. When Should We Create a Custom Pipe?

A custom pipe is useful when:

```text
1. We need a display transformation

2. Angular does not already provide the transformation

3. The transformation can be reused

4. It makes the template easier to understand
```

Example:

```html
{{ productName | productLabel }}
```

can communicate the display intention more clearly than putting formatting logic directly into the template.

But not every function belongs in a pipe.

A custom pipe is mainly for transforming values for presentation.

Application behavior, state changes, API calls, and event handling belong elsewhere.

---

# 14. Custom Pipe vs Component Method

Suppose we create:

```ts
formatProductName(name: string): string {
  return `Product: ${name}`;
}
```

and use:

```html
{{ formatProductName(productName) }}
```

That works conceptually, but if this is a reusable display transformation, a pipe communicates the purpose more clearly:

```html
{{ productName | productLabel }}
```

Think:

```text
Custom pipe
→ reusable display transformation

Component method
→ general component behavior/logic
```

Do not create a custom pipe for every method.

Ask:

> Is this fundamentally a reusable transformation of a value for display?

If yes, a custom pipe may be appropriate.

---

# 15. Complete Custom Pipe Example

Now put the pieces together.

We will create a pipe that receives a product name and a label.

The template will display:

```text
Featured Product: Wireless Keyboard
```

## File: `product-label.pipe.ts`

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productLabel',
  standalone: true
})
export class ProductLabelPipe implements PipeTransform {

  transform(value: string, label: string): string {
    return `${label}: ${value}`;
  }
}
```

### What each part does

```ts
import { Pipe, PipeTransform } from '@angular/core';
```

imports the Angular features needed to define the pipe.

```ts
@Pipe({
  name: 'productLabel',
  standalone: true
})
```

tells Angular:

```text
This class is a pipe.

Template name
→ productLabel

Standalone
→ can be imported by a standalone component
```

```ts
export class ProductLabelPipe implements PipeTransform
```

creates and exports the pipe class.

```ts
transform(value: string, label: string): string
```

means:

```text
value
→ string being transformed

label
→ string argument

return type
→ string
```

Finally:

```ts
return `${label}: ${value}`;
```

creates the displayed result.

---

# 16. Complete Component Example

Now use the custom pipe in a standalone component.

## File: `product-card.component.ts`

```ts
import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { ProductLabelPipe } from '../pipes/product-label.pipe';

@Component({
  selector: 'app-product-card',
  imports: [
    TitleCasePipe,
    ProductLabelPipe
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  productName = 'wireless keyboard';
}
```

There are two pipes available to this template:

```ts
TitleCasePipe
```

which Angular provides, and:

```ts
ProductLabelPipe
```

which we created.

Both are placed in:

```ts
imports: [
  TitleCasePipe,
  ProductLabelPipe
]
```

---

# 17. Complete Template Example

## File: `product-card.component.html`

```html
<h2>Product Details</h2>

<p>
  {{ productName | titlecase }}
</p>

<h3>Custom Pipe</h3>

<p>
  {{ productName | titlecase | productLabel:'Featured Product' }}
</p>
```

The first display uses only Angular's built-in pipe:

```html
{{ productName | titlecase }}
```

Result:

```text
Wireless Keyboard
```

The second expression chains two pipes:

```html
{{ productName | titlecase | productLabel:'Featured Product' }}
```

Follow the value:

```text
productName
→ "wireless keyboard"

titlecase
→ "Wireless Keyboard"

productLabel:'Featured Product'
→ transform(
     "Wireless Keyboard",
     "Featured Product"
   )

result
→ "Featured Product: Wireless Keyboard"
```

So the page displays approximately:

```text
Product Details

Wireless Keyboard

Custom Pipe

Featured Product: Wireless Keyboard
```

---

# 18. Complete File Connection

The important part is seeing how the files connect.

```text
product-label.pipe.ts
│
│  @Pipe
│  name: 'productLabel'
│  transform(...)
│
↓
ProductLabelPipe exported
│
↓
product-card.component.ts
│
│  import { ProductLabelPipe }
│
│  @Component({
│    imports: [ProductLabelPipe]
│  })
│
↓
product-card.component.html
│
│  {{ productName | productLabel:'Featured Product' }}
│
↓
transform() receives the value + argument
│
↓
formatted string is returned
│
↓
browser displays the result
```

That is the full custom-pipe flow.

---

# Where Do We Use Each Part?

## Pipe TypeScript file

```ts
@Pipe(...)
export class ProductLabelPipe implements PipeTransform {
  transform(...) {
    ...
  }
}
```

This defines the transformation.

## Component TypeScript file

```ts
import { ProductLabelPipe } from '../pipes/product-label.pipe';

@Component({
  imports: [ProductLabelPipe]
})
```

This makes the standalone pipe available to the component template.

## Component HTML file

```html
{{ value | productLabel:'Label' }}
```

This uses the custom pipe.

---

# Common Mistakes

### 1. Forgetting `@Pipe`

Without the decorator, Angular does not know the class is a pipe.

### 2. Using a different template name

If the pipe says:

```ts
name: 'productLabel'
```

the template uses:

```html
| productLabel
```

### 3. Forgetting to import the custom pipe

A standalone component must have the pipe available in its imports.

### 4. Confusing the value with arguments

```html
{{ productName | productLabel:'Featured' }}
```

maps to:

```text
productName
→ transform value

'Featured'
→ additional argument
```

### 5. Leaving `transform()` untyped

Prefer clear types:

```ts
transform(value: string, label: string): string
```

instead of unnecessarily using `any`.

### 6. Using a pipe for application behavior

Pipes should primarily transform values for presentation.

They should not become a place for unrelated component behavior, API calls, or state-management logic.

### 7. Setting `pure: false` unnecessarily

Pure pipes are the default.

Use impure pipes only when there is a specific reason and you understand the performance implications.

---

# Quick Reference

Basic custom pipe:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productLabel',
  standalone: true
})
export class ProductLabelPipe implements PipeTransform {

  transform(value: string): string {
    return `Product: ${value}`;
  }
}
```

With argument:

```ts
transform(value: string, label: string): string {
  return `${label}: ${value}`;
}
```

Template:

```html
{{ productName | productLabel:'Featured Product' }}
```

Standalone component:

```ts
import { ProductLabelPipe } from '../pipes/product-label.pipe';

@Component({
  imports: [ProductLabelPipe]
})
```

Pure pipe:

```text
default behavior
→ pure
```

Impure pipe:

```ts
@Pipe({
  name: 'somePipe',
  pure: false
})
```

Use cautiously.

---

# Main Memory Rule

```text
Custom pipe
→ our reusable display transformation

@Pipe
→ tells Angular this class is a pipe

name
→ name used after | in HTML

PipeTransform
→ pipe transformation contract

transform()
→ receives value
→ performs transformation
→ returns result

:
→ passes arguments

typed transform()
→ clear input / argument / output types

standalone pipe
→ imported by standalone component

pure pipe
→ default
→ Angular reevaluates based on input/reference/argument changes

pure: false
→ impure
→ special case
→ use cautiously
```

---

# Retrieval Checkpoint

Before marking Topic 17 complete, answer these without reading:

1. Why would we create a custom pipe instead of using a built-in pipe?
2. What does `@Pipe` tell Angular?
3. How does the `name` inside `@Pipe` connect to the HTML?
4. What is `PipeTransform`?
5. What does `transform()` receive and return?
6. In `transform(value: string): string`, what do the two `string` types mean?
7. How does an argument in the template reach `transform()`?
8. How would two custom-pipe arguments be written in HTML?
9. How does a standalone component make a custom pipe available to its template?
10. What does it mean that pipes are pure by default?
11. Why can mutating the same array/object reference matter for a pure pipe?
12. What is `pure: false`, and why should it be used cautiously?
13. When is a custom pipe more appropriate than a component method?
14. In the complete example, trace `productName` from the template through both pipes to the displayed result.

**Reading the README alone does not complete the topic.**  
The practical implementation should come after you can explain the custom-pipe flow.
