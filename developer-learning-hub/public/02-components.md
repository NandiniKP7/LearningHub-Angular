# 3. Components

## What problem does this solve?

An Angular application is made of components. A component is one piece
of the user interface with its own data, behavior, template, and
optional styles. Components divide a large UI into manageable
responsibilities.

``` text
Component
├── TypeScript → data and behavior
├── HTML       → what the user sees
└── CSS        → how it looks
```

## 1. A real-world example: online shopping

Imagine building an online store with a header, a list of products, and
a footer. Instead of putting the entire page in one large component,
divide it into pieces with clear responsibilities.

``` text
AppComponent
├── HeaderComponent
│   └── Store name and cart count
├── ProductListComponent
│   ├── ProductCardComponent
│   └── ProductCardComponent
└── FooterComponent
```

### What does each component achieve?

  -----------------------------------------------------------------------
  Component                           Responsibility
  ----------------------------------- -----------------------------------
  `AppComponent`                      Coordinates the main application
                                      layout.

  `HeaderComponent`                   Displays the store name and cart
                                      information.

  `ProductListComponent`              Organizes the collection of
                                      products.

  `ProductCardComponent`              Displays one product's name, price,
                                      and button.

  `FooterComponent`                   Displays footer information.
  -----------------------------------------------------------------------

**Why split the page?** Each component has a clear job. A product card
can be reused for many products, the header can change independently,
and the code becomes easier to understand and maintain.

This is an illustrative design. Angular does not require every
application to use these exact components.

## 2. Create a component

Angular CLI can generate the component files for you.

``` bash
ng generate component product-card
```

Short form:

``` bash
ng g c product-card
```

To explicitly request the `component` type suffix in Angular CLI
versions that support the `--type` option:

``` bash
ng g c product-card --type=component
```

For example, the generated files may be:

``` text
product-card/
├── product-card.component.ts
├── product-card.component.html
├── product-card.component.css
└── product-card.component.spec.ts
```

The test file and exact filenames depend on the Angular CLI version and
configuration. The `--type=component` option is useful when you want
filenames such as `product-card.component.ts` rather than the shorter
naming convention.

## 2. The component class and decorator

``` ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  name = 'Ada'; // Data owned by this component.
}
```

`@Component({...})` tells Angular that this class is a component and
describes how its UI is connected.

  ---------------------------------------------------------------------
  Part                               Purpose
  ---------------------------------- ----------------------------------
  `selector`                         HTML tag used to place this
                                     component in another template.

  `imports`                          Standalone components, directives,
                                     or pipes this template needs.

  `templateUrl`                      Path to the component HTML.

  `styleUrl`                         Path to the component CSS.

  `export class`                     TypeScript class containing data
                                     and behavior.
  ---------------------------------------------------------------------

## 3. Component HTML and CSS

### user-card.component.html

``` html
<h2>{{ name }}</h2>
<!-- Reads name from UserCardComponent. -->
```

### user-card.component.css

``` css
h2 {
  font-weight: bold; /* Makes the heading bold. */
}
```

The template displays component data. The stylesheet controls its
appearance. Component styles are normally scoped to that component's
template.

## 4. Standalone components

Modern Angular components are standalone by default. A standalone
component declares the dependencies its template needs in its own
`imports` array.

``` ts
import { Component } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-root',
  imports: [UserCardComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
```

The TypeScript `import` brings the class into the file. The decorator's
`imports` makes it available to the template. Importing does not
automatically display the child.

## 5. Use one component inside another

### Parent HTML

``` html
<h1>Users</h1>
<app-user-card></app-user-card>
<!-- Angular renders UserCardComponent here. -->
```

``` text
AppComponent (parent)
      ↓ imports UserCardComponent
AppComponent template
      ↓ uses <app-user-card>
UserCardComponent (child)
      ↓
Child HTML is rendered
```

The parent is the component whose template contains the child selector.
The child is the component placed inside that template.

## 6. Component responsibility

``` text
AppComponent
├── HeaderComponent
├── UserListComponent
│   └── UserCardComponent
└── FooterComponent
```

This is an illustrative component tree, not a required Angular
structure. Each component should have a clear UI responsibility.

## 7. Local component state

``` ts
export class UserCardComponent {
  name = 'Ada';
}
```

``` html
<h2>{{ name }}</h2>
```

A component's template can read its own properties. Another component
cannot automatically access them just because they exist.
Parent-to-child data passing and child-to-parent events are taught
later.

## Important rules and common mistakes

-   `@Component` connects the class with its metadata.
-   The selector is the tag used in another component's template.
-   Importing a child and placing its selector are two separate steps.
-   `templateUrl` and `styleUrl` point to component files.
-   Component properties belong to that component's template context.
-   Use components for meaningful UI responsibilities, not merely to
    create more files.
-   Components can also be displayed through routing, covered later.
-   A TypeScript `import` and the decorator's `imports` array have
    different jobs.

## Quick reference

``` bash
ng g c user-card
```

``` ts
@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {}
```

``` html
<app-user-card></app-user-card>
```

**Memory rule:** Component = TypeScript + HTML + CSS. Parent imports
child → parent template uses child selector → child UI appears.
