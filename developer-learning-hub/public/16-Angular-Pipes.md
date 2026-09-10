# Topic 16 — Angular Pipes

**Revision date:** September 10, 2026  
**Planned learning time:** 1–2 days

## What problem do pipes solve?

Applications often store data in one form but need to **display** it differently.

For example, TypeScript may contain:

```ts
productName = 'wireless keyboard';
```

But the UI may need to show:

```text
Wireless Keyboard
```

We could change the original value, but often we do **not** want to change our actual data just to make it look better on the screen.

Angular pipes solve this display-formatting problem.

```text
original value
      ↓
     pipe
      ↓
formatted value shown in HTML
```

The original TypeScript value remains unchanged.

---

# 1. What Is a Pipe?

A pipe transforms a value for display in an Angular template.

Basic syntax:

```html
{{ value | pipeName }}
```

Example:

```ts
productName = 'wireless keyboard';
```

Template:

```html
<p>{{ productName | uppercase }}</p>
```

Displayed:

```text
WIRELESS KEYBOARD
```

But the TypeScript property is still:

```text
wireless keyboard
```

Think:

```text
TypeScript value
→ pipe
→ display formatting
```

A pipe does not normally mean:

```text
change the original stored value
```

---

# 2. Understanding the `|` Syntax

You already know interpolation:

```html
{{ productName }}
```

A pipe is added inside interpolation:

```html
{{ productName | uppercase }}
```

Break it apart:

```text
{{ }}
→ interpolation

productName
→ value

|
→ send the value through a pipe

uppercase
→ pipe being used
```

Read:

```html
{{ productName | uppercase }}
```

as:

> Take `productName`, pass it through the `uppercase` pipe, and display the result.

---

# 3. `uppercase`

The `uppercase` pipe displays text using uppercase letters.

```ts
message = 'hello angular';
```

```html
{{ message | uppercase }}
```

Displays:

```text
HELLO ANGULAR
```

The original `message` is still:

```text
hello angular
```

---

# 4. `lowercase`

The `lowercase` pipe displays text using lowercase letters.

```ts
message = 'HELLO ANGULAR';
```

```html
{{ message | lowercase }}
```

Displays:

```text
hello angular
```

---

# 5. `titlecase`

The `titlecase` pipe formats text so words are displayed in title case.

```ts
productName = 'wireless mechanical keyboard';
```

```html
{{ productName | titlecase }}
```

Displays approximately:

```text
Wireless Mechanical Keyboard
```

This is useful for human-readable labels and headings.

Be careful with technical text such as:

```text
app.component.ts
input()
ng serve
```

Automatic title casing is not always appropriate for code-like values.

---

# 6. `date`

Applications usually store dates as date values, timestamps, or date strings, but users may need a readable representation.

Example:

```ts
today = new Date();
```

Template:

```html
{{ today | date }}
```

Angular formats the date for display.

A date pipe can also receive a formatting parameter:

```html
{{ today | date:'shortDate' }}
```

or:

```html
{{ today | date:'longDate' }}
```

The important concept is:

```text
date value
   ↓
date pipe
   ↓
display format
```

The pipe does not need us to replace the original `Date` value.

---

# 7. `currency`

The `currency` pipe formats a number as currency.

```ts
price = 1299.99;
```

```html
{{ price | currency }}
```

It can also receive a currency-code parameter:

```html
{{ price | currency:'USD' }}
```

or:

```html
{{ price | currency:'EUR' }}
```

Conceptually:

```text
1299.99
   ↓
currency:'USD'
   ↓
currency-formatted display
```

The original TypeScript value remains a number.

---

# 8. `percent`

The `percent` pipe formats a numeric value as a percentage.

```ts
completion = 0.75;
```

```html
{{ completion | percent }}
```

The display represents the value as a percentage.

Important:

```text
0.75
→ represents 75/100
→ percent pipe
→ displayed as a percentage
```

Do not assume that `75` and `0.75` mean the same thing to the percent pipe.

---

# 9. `decimal` / `number`

Angular's decimal formatting pipe is used in templates with the name:

```text
number
```

Example:

```ts
rating = 4.5678;
```

```html
{{ rating | number }}
```

You can control the displayed digits with a parameter:

```html
{{ rating | number:'1.1-2' }}
```

The exact digit-format syntax can be looked up when needed. For today's concept, understand:

```text
number
→ formats numeric values for display
```

So when your roadmap says **decimal**, remember:

```text
Angular class concept: DecimalPipe
template pipe name: number
```

---

# 10. Pipe Parameters

Some pipes need extra information.

General syntax:

```html
{{ value | pipeName:argument }}
```

Example:

```html
{{ today | date:'shortDate' }}
```

Break it apart:

```text
today
→ value

|
→ apply pipe

date
→ pipe

:
→ provide an argument

'shortDate'
→ argument
```

A pipe can have more than one argument.

General form:

```html
{{ value | pipeName:arg1:arg2 }}
```

The pipe decides what those arguments mean.

---

# 11. Chaining Pipes

A value can pass through more than one pipe.

Syntax:

```html
{{ value | pipeOne | pipeTwo }}
```

Example:

```html
{{ productName | lowercase | titlecase }}
```

Flow:

```text
original value
      ↓
lowercase
      ↓
result of lowercase
      ↓
titlecase
      ↓
display
```

The output of the first pipe becomes the input to the next pipe.

Order matters because each pipe receives the previous result.

Do not chain pipes simply because Angular allows it. Use chaining when each transformation has a real display purpose.

---

# 12. Pipes With Signals

Signals are still read using `()`.

Suppose:

```ts
productName = signal('wireless keyboard');
```

Without a pipe:

```html
{{ productName() }}
```

With a pipe:

```html
{{ productName() | titlecase }}
```

Flow:

```text
productName
→ signal

productName()
→ read current signal value

|
→ pass value to pipe

titlecase
→ format display
```

The pipe does not change how signals work.

---

# 13. Standalone Pipe Imports

Modern Angular applications commonly use standalone components.

If a component template uses a pipe, that pipe must be available to the component. With a standalone component, we import the pipe in the TypeScript file and add it to the component's `imports` array.

## Complete Example — `ProductCardComponent`

Suppose we want to display:

```text
wireless mechanical keyboard
```

as:

```text
Wireless Mechanical Keyboard
```

using Angular's `titlecase` pipe.

### File: `product-card.component.ts`

```ts
import { Component } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [TitleCasePipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  productName = 'wireless mechanical keyboard';
}
```

### What was added?

First:

```ts
import { TitleCasePipe } from '@angular/common';
```

This imports Angular's `TitleCasePipe` into the TypeScript file.

Then:

```ts
imports: [TitleCasePipe]
```

This makes the pipe available to this standalone component's template.

The component property is:

```ts
productName = 'wireless mechanical keyboard';
```

That is the original data. We are not changing it to title case in TypeScript.

### File: `product-card.component.html`

```html
<h2>Product</h2>

<p>
  {{ productName | titlecase }}
</p>
```

The heading is normal HTML:

```html
<h2>Product</h2>
```

The next line uses interpolation and the pipe:

```html
{{ productName | titlecase }}
```

Break it apart:

```text
productName
→ original string

|
→ pass the value through a pipe

titlecase
→ format the displayed string
```

The browser displays:

```text
Product

Wireless Mechanical Keyboard
```

But the TypeScript property remains:

```text
wireless mechanical keyboard
```

### Complete connection

```text
product-card.component.ts
        ↓
imports TitleCasePipe
        ↓
@Component imports: [TitleCasePipe]
        ↓
productName property
        ↓
product-card.component.html
        ↓
{{ productName | titlecase }}
        ↓
formatted text displayed
```

This is the full pattern to remember for a standalone component:

```text
1. Import the pipe in the .ts file
2. Add it to @Component imports
3. Have a value in the component
4. Use the pipe in the .html template
```

Other built-in pipes have corresponding Angular imports, such as:

```ts
UpperCasePipe
LowerCasePipe
TitleCasePipe
DatePipe
CurrencyPipe
PercentPipe
DecimalPipe
```

You do not need to memorize all of these import names today. The important concept is understanding the complete standalone-component connection.

---

# 14. Pipe vs Method

This distinction is important.

Suppose we want to display a product name in uppercase.

We could theoretically create a component method:

```ts
formatName(name: string): string {
  return name.toUpperCase();
}
```

and call it from HTML:

```html
{{ formatName(productName) }}
```

But Angular already provides:

```html
{{ productName | uppercase }}
```

For standard display transformations, the pipe communicates the intent more clearly.

```text
Pipe
→ template display transformation

Method
→ general component behavior / logic
```

A method can do almost any TypeScript work.

A pipe has a much more specific purpose:

```text
input value
→ reusable transformation
→ displayed result
```

So if the requirement is simply:

> Display this date, number, currency, percentage, or text in another format.

A pipe is usually the clearer tool when an appropriate pipe exists.

Do not create a method just to duplicate a built-in pipe.

---

# 15. Pipe vs Changing the Original Data

Suppose:

```ts
name = 'wireless keyboard';
```

This changes the actual value:

```ts
this.name = this.name.toUpperCase();
```

Afterward, `name` itself contains uppercase text.

A pipe:

```html
{{ name | uppercase }}
```

does something different.

```text
name
→ remains "wireless keyboard"

display
→ shows "WIRELESS KEYBOARD"
```

This separation is one of the main reasons pipes are useful.

---

# 16. Pipe vs `computed()`

You already know `computed()`.

A pipe and a computed signal solve different problems.

### Pipe

```text
existing value
→ format it for display
```

Example:

```html
{{ productName | titlecase }}
```

### `computed()`

```text
source signal(s)
→ derive application state/value
```

Example:

```ts
filteredProducts = computed(() =>
  this.products().filter(...)
);
```

Memory:

```text
computed()
→ derive a value/state from signals

pipe
→ format a value for display
```

Do not use a pipe as a replacement for application state calculations.

---

# 17. When Should I Use a Pipe?

Good examples:

```text
name
→ uppercase/lowercase/titlecase

date
→ readable date format

price
→ currency display

completion ratio
→ percent display

number
→ decimal formatting
```

Ask:

> Am I changing the application's actual data, or only how the user sees it?

If the answer is:

```text
only how the user sees it
```

a pipe may be appropriate.

---


# Where Do We Use Pipes?

Primarily in the Angular **template**:

```html
{{ value | pipeName }}
```

For standalone components, the required pipe is imported in the component TypeScript:

```ts
@Component({
  imports: [TitleCasePipe]
})
```

So:

```text
component .ts
→ import/register template dependency

component .html
→ use pipe to format displayed value
```

---

# Common Mistakes

### 1. Thinking a pipe changes the original property

It formats the value used for display.

### 2. Forgetting `()` when piping a signal

Wrong:

```html
{{ productName | titlecase }}
```

if `productName` is a signal.

Correct:

```html
{{ productName() | titlecase }}
```

### 3. Confusing `|` and `:`

```text
|
→ apply a pipe

:
→ pass an argument to the pipe
```

### 4. Using `75` when you mean a 75% ratio

Understand the numeric value being sent to `percent`.

### 5. Looking for a template pipe named `decimal`

Angular's decimal-number formatting is used as:

```html
{{ value | number }}
```

### 6. Creating component methods that duplicate built-in pipes

Use the built-in display tool when it already solves the problem clearly.

### 7. Applying formatting blindly to technical text

A transformation such as `titlecase` may be inappropriate for code, filenames, commands, acronyms, or identifiers.

---

# Quick Reference

```html
{{ value | uppercase }}

{{ value | lowercase }}

{{ value | titlecase }}

{{ value | date:'shortDate' }}

{{ value | currency:'USD' }}

{{ value | percent }}

{{ value | number:'1.1-2' }}
```

Parameter:

```html
{{ value | pipeName:argument }}
```

Multiple arguments:

```html
{{ value | pipeName:arg1:arg2 }}
```

Chaining:

```html
{{ value | pipeOne | pipeTwo }}
```

Signal:

```html
{{ mySignal() | titlecase }}
```

---

# Main Memory Rules

```text
pipe
→ transforms a value for DISPLAY

|
→ apply pipe

:
→ provide pipe argument

uppercase / lowercase / titlecase
→ text formatting

date
→ date formatting

currency
→ currency formatting

percent
→ percentage formatting

number
→ decimal/number formatting

chaining
→ output of one pipe goes into the next

standalone component
→ import pipe used by template

pipe
→ display transformation

method
→ general component logic

computed()
→ derived signal state/value
```

---

# Retrieval Checkpoint

Before marking Topic 16 complete, you should be able to answer these without reading the README:

1. What problem does an Angular pipe solve?
2. Does a pipe normally change the original TypeScript value?
3. What does `|` mean in a template?
4. What does `:` mean in pipe syntax?
5. What do `uppercase`, `lowercase`, and `titlecase` do?
6. What is the purpose of the `date` pipe?
7. What is the purpose of the `currency` pipe?
8. What kind of value would you normally give the `percent` pipe for 75%?
9. Which template pipe performs decimal/number formatting?
10. What is a pipe parameter?
11. What happens when pipes are chained?
12. How do you pipe a signal value?
13. Why might a standalone component need to import a pipe?
14. When would you prefer a pipe over a component method?
15. What is the difference between a pipe and `computed()`?
16. Why might `titlecase` be inappropriate for technical text?

**Do not mark Topic 16 complete just because you read this README.**

The practical implementation should come after the concept is understood.
