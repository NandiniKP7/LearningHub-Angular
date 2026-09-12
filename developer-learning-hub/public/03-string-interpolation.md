# 3. String Interpolation


## What problem does this solve?

A component's TypeScript class stores data, while its HTML template
displays the UI. String interpolation lets us display TypeScript values
in HTML without manually changing the DOM.

## 1. Define variables in the component TypeScript

A component class can contain properties (variables that belong to the
component). We give them names, types, and values.

``` ts
export class AppComponent {
  title: string = 'My Website';
  age: number = 25;
  isActive: boolean = true;
}
```

-   `title` is a string property containing text.
-   `age` is a number property.
-   `isActive` is a boolean property.
-   `:` specifies the TypeScript type; `=` assigns the value.
-   TypeScript can often infer the type, so `title = 'My Website'` is
    also valid.

These properties belong to the component class. Its template can read
them.

## 2. Display a variable in HTML

Use double curly braces around the property name.

``` html
<h1>{{ title }}</h1>
<p>Age: {{ age }}</p>
<p>Active: {{ isActive }}</p>
```

The browser displays:

``` text
My Website
Age: 25
Active: true
```

The HTML above belongs to the component class in the previous example.

## 3. How the two files connect

``` text
app.component.ts
  title: string = 'My Website';
        ↓
app.component.html
  <h1>{{ title }}</h1>
        ↓
Browser
  My Website
```

Angular connects the template to its component through the `@Component`
configuration learned in Topic 2. The template reads the property from
that component's class.

## 4. Literal text vs a variable

``` html
<p>title</p>
<!-- Displays the word title. -->

<p>{{ title }}</p>
<!-- Displays the value stored in the title property. -->
```

## 5. Case sensitivity

If TypeScript defines `firstName`, HTML must use `{{ firstName }}`.
`{{ FirstName }}` is a different identifier and will cause an error if
that property does not exist.

## 6. Simple expressions

Interpolation can evaluate simple expressions using component
properties.

``` ts
firstName: string = 'Ada';
lastName: string = 'Lovelace';
count: number = 4;
```

``` html
<p>{{ firstName + ' ' + lastName }}</p>
<!-- Ada Lovelace -->

<p>{{ count + 1 }}</p>
<!-- 5 -->
```

Keep complicated calculations and business logic in TypeScript.

## 7. When a value changes

When application state changes, Angular updates the template to reflect
the new value. You do not need to manually find the HTML element and
replace its text.

``` text
TypeScript property changes
        ↓
Angular updates the template
        ↓
Browser displays the new value
```

## Important rules

-   Interpolation uses `{{ expression }}`.
-   The property must exist in the template's component context.
-   Property names are case-sensitive.
-   Use interpolation for displaying text and simple expression results.
-   Use property binding for DOM properties such as `src` or `disabled`;
    this is Topic 4.
-   Signals are read by calling them, such as `{{ count() }}`. Signals
    are covered later.

## Quick reference

``` ts
message: string = 'Hello';
```

``` html
<p>{{ message }}</p>
<!-- Displays Hello -->
```

**Memory rule:** Define a property in TypeScript → read it with `{{ }}`
in HTML → Angular displays its value.
