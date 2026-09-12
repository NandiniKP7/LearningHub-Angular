# 8. Parent → Child Communication with `input()`


## What problem does it solve?
A shopping page may contain twenty product cards. Instead of twenty separate components, one reusable ProductCard receives different data from its parent.

A parent is the component whose template contains another component. The contained component is its child. The relationship depends on where the component is used, not the filename.

```text
ProductListComponent (parent)
  ├── ProductCard ← Laptop
  ├── ProductCard ← Mouse
  └── ProductCard ← Keyboard
```

**Memory rule:** Parent provides data → child receives it → child renders it.

## 1. The complete connection
### Child TypeScript
```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html'
})
export class ProductCard {
  name = input.required<string>();
}
```
`input.required<string>()` declares a required string input named `name`.

### Child HTML
```html
<article>
  <h3>{{ name() }}</h3>
</article>
```
`input()` creates an InputSignal. Read its value using `()`. Without the parentheses, you refer to the signal itself.

### Parent TypeScript
```ts
productName = 'Laptop';
```

### Parent HTML
```html
<app-product-card [name]="productName"></app-product-card>
```
The parent must import `ProductCard` in its standalone component's `imports` array. The selector must match the child's selector.

```text
Parent TS: productName
    ↓
Parent HTML: [name]="productName"
    ↓
Child TS: name = input.required<string>()
    ↓
Child HTML: {{ name() }}
```
The left side of the binding is the child's public input name. The right side is an expression evaluated in the parent. They do not need the same name.

## 2. Required, default, and typed inputs
```ts
name = input.required<string>();             // Parent must provide it
buttonText = input('View product');           // Default string
price = input<number>(0);                    // Explicit number
showPrice = input<boolean>(true);            // Boolean
description = input<string | undefined>(undefined);
```
`input<string>()` without a default has type `InputSignal<string | undefined>`. A required input has no default. A default input can be omitted by the parent.

For related data, use a typed object:
```ts
interface Product {
  id: number;
  name: string;
  price: number;
}

product = input.required<Product>();
```
Keep shared interfaces in a separate model file when appropriate.

## 3. Reuse with `@for`
```ts
products = [
  { id: 101, name: 'Laptop', price: 900 },
  { id: 102, name: 'Mouse', price: 25 }
];
```
```html
@for (product of products; track product.id) {
  <app-product-card [product]="product"></app-product-card>
}
```
Each child receives its own product. The child does not need to know about the full list.

## 4. Aliases
An alias changes the public binding name without changing the property used inside the child.

```ts
productName = input.required<string>({ alias: 'name' });
```
```html
<app-product-card [name]="'Laptop'"></app-product-card>
```
Inside the child, read `productName()`. The parent uses `[name]`. Aliases are case-sensitive. Use them when they clarify or preserve a component's public API.

## 5. Transforms

**Transform = convert the value before the child receives it.**

### Number transform

Imagine the parent has the text `"3"`, but the child needs the number `3`.

#### Parent TypeScript

```ts
export class ProductList {
  quantity = '3'; // text
}
```

#### Parent HTML — sends the value

```html
<app-product-card [quantity]="quantity"></app-product-card>
```

Angular reads the parent's `quantity` value and sends `"3"` to the child.

```text
Parent TS: quantity = "3"
        ↓
Parent HTML: [quantity]="quantity"
        ↓
numberAttribute
        ↓
Child receives 3 (number)
```

#### Child TypeScript — receives and converts

```ts
import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html'
})
export class ProductCard {
  quantity = input(1, {
    transform: numberAttribute
  });
}
```

The `1` is the default quantity. `numberAttribute` tells Angular: “When a value comes in, convert it to a number.”

#### Child HTML

```html
<p>Quantity: {{ quantity() }}</p>
```

You can also send the text directly:

```html
<app-product-card quantity="3"></app-product-card>
```

Both examples send text. The transform converts it before the child reads it.

### Boolean transform

Now imagine the parent has text such as `"true"`, but the child needs a real boolean.

#### Parent TypeScript

```ts
export class ProductList {
  isDisabled = 'true'; // text
}
```

#### Parent HTML — sends the value

```html
<app-product-card [disabled]="isDisabled"></app-product-card>
```

Angular sends the parent's text value to the child.

```text
Parent TS: isDisabled = "true"
        ↓
Parent HTML: [disabled]="isDisabled"
        ↓
booleanAttribute
        ↓
Child receives true (boolean)
```

#### Child TypeScript — receives and converts

```ts
import { Component, input, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.html'
})
export class ProductCard {
  disabled = input(false, {
    transform: booleanAttribute
  });
}
```

The `false` is the default. `booleanAttribute` converts the incoming value to a boolean.

#### Child HTML

```html
<button [disabled]="disabled()">Add to cart</button>
```

The parent can also use an HTML-style boolean attribute:

```html
<app-product-card disabled></app-product-card>
```

In that case, the child receives `true`. If the input is omitted, the default remains `false`.

**Memory rule:** Alias changes the incoming name. Transform changes the incoming value.

### Custom transforms (reference for later)

Custom transforms can convert values in other ways, but we will practice those only when a real implementation needs them. You do not need to memorize their syntax now.

## 6. Input ownership
The parent supplies the input. The child can read its InputSignal but cannot call `.set()` or `.update()` on it.

```ts
name = input.required<string>();

// Not allowed:
// this.name.set('New name');
```
If the child needs locally changing state, use a separate writable signal. If it needs the parent to change the original data, communicate upward with `output()`.

Passing an object does not make it deeply immutable. Avoid mutating parent-owned objects in the child.

## 7. InputSignal versus writable signal
| InputSignal | Writable signal |
|---|---|
| Receives parent data | Owns locally changing state |
| `input()` | `signal()` |
| Read with `()` | Read with `()` |
| No direct `.set()` / `.update()` | Supports `.set()` / `.update()` |

Detailed signal APIs are covered later. For now, focus on ownership.

## Common mistakes
- Forgetting the child import or using the wrong selector.
- Writing `{{ name }}` instead of `{{ name() }}`.
- Confusing the left and right sides of `[name]="productName"`.
- Omitting a required input.
- Trying to mutate an input signal.

## Quick reference
```ts
name = input.required<string>();
label = input('Open');
price = input<number>(0);
publicName = input.required<string>({ alias: 'name' });
quantity = input(1, { transform: numberAttribute });
```

## Retrieval checkpoint
Explain why one reusable child is preferable to many nearly identical components. Trace a binding from parent TypeScript to child HTML. Explain required/default inputs, aliases, transforms, and ownership.
