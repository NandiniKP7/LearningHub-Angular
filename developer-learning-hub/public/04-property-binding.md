# 4. Property Binding


## What problem does this solve?

Interpolation displays text. Property binding lets a component's
TypeScript values control HTML element properties, such as an image
source or whether a button is disabled.

**Direction:** TypeScript → HTML

## 1. A real-world example

Imagine a shopping page with a product image and a checkout button. The
image URL comes from TypeScript, and checkout should be disabled when
the cart is empty. Property binding connects those values to the HTML.

## 2. Basic syntax

``` html
[property]="expression"
```

Square brackets tell Angular to evaluate the expression and assign its
result to the target property.

## 3. Define properties in TypeScript

``` ts
export class AppComponent {
  productImage: string = '/images/shirt.png';
  cartIsEmpty: boolean = true;
}
```

## 4. Bind an image source

``` html
<img [src]="productImage" alt="A shirt">
```

Angular reads `productImage` and assigns its value to the image's `src`
property. Static images can be placed in `public/`; for example,
`public/images/shirt.png` is served as `/images/shirt.png` in a typical
CLI project.

## 5. Bind a disabled state

``` html
<button [disabled]="cartIsEmpty">Checkout</button>
```

When `cartIsEmpty` is `true`, the button is disabled. When it is
`false`, the button is enabled. The value is a boolean, not the text
`"true"` or `"false"`.

## 6. Static values vs binding

``` html
<img src="/images/shirt.png" alt="A shirt">
<!-- Fixed image URL. -->

<img [src]="productImage" alt="A shirt">
<!-- URL comes from the component. -->
```

Use a static attribute for a fixed value and binding when Angular should
evaluate a TypeScript expression.

## 7. Class binding

A CSS class can be applied conditionally.

``` ts
isSelected: boolean = true;
```

``` html
<p [class.selected]="isSelected">Selected item</p>
```

``` css
.selected {
  font-weight: bold;
}
```

When `isSelected` is true, Angular applies the `selected` class.

You can also bind the complete class value:

``` ts
cardClasses: string = 'card highlighted';
```

``` html
<div [class]="cardClasses">Product</div>
```

`[class]` controls the element's class value; `[class.selected]`
controls one named class.

## 8. Style binding

``` ts
fontSize: number = 20;
```

``` html
<p [style.font-size.px]="fontSize">Hello</p>
```

Angular applies `font-size: 20px`. The `.px` suffix supplies the unit.

A string containing a unit is also valid:

``` ts
textColor: string = 'darkblue';
```

``` html
<p [style.color]="textColor">Hello</p>
```

## 9. Property binding vs interpolation

``` html
<p>{{ productImage }}</p>
<!-- Displays the URL as text. -->

<img [src]="productImage" alt="A shirt">
<!-- Uses the URL as the image source. -->
```

Interpolation is for displaying text; property binding controls an
element property. Both read values from TypeScript.

## Important rules

-   Square brackets mean property binding: `[property]="expression"`.
-   The expression is evaluated in the component's template context.
-   Use boolean values for boolean properties such as `disabled`.
-   `[class.name]` controls one CSS class; `[class]` can control the
    complete class value.
-   `[style.property]` controls a style; a unit suffix such as `.px` can
    be used.
-   Property binding does not handle user actions. Event binding is the
    next topic.

## Quick reference

  Syntax                          Purpose
  ------------------------------- -----------------------
  `[src]="imageUrl"`              Image source
  `[disabled]="isDisabled"`       Button state
  `[class.active]="isActive"`     Conditional CSS class
  `[class]="classNames"`          Complete class value
  `[style.font-size.px]="size"`   Font size in pixels
  `[style.color]="color"`         Text color

**Memory rule:** Square brackets `[]` = TypeScript value → HTML
property.
