# Topic 15 — TypeScript Models / Interfaces in Angular

**Revision date:** September 10, 2026  
**Planned learning time:** 1–2 days

## What problem does an interface solve?

As applications grow, we work with many objects.

Example:

```ts
const product = {
  id: 1,
  name: 'Laptop',
  price: 999
};
```

We can see the shape of this object by looking at it:

```text
id    → number
name  → string
price → number
```

But if several parts of an application use product data, we do not want to keep guessing what a product should contain.

We want one reusable definition.

That is what an interface gives us.

```ts
interface Product {
  id: number;
  name: string;
  price: number;
}
```

Think:

```text
interface
→ describes the expected shape of an object

object
→ contains the actual values
```

The interface does not create the data.  
It describes what the data should look like.

---

# 1. One Interface Can Describe Different Property Rules

Instead of learning required, optional, nullable, and readonly as four unrelated ideas, put them together in one interface:

```ts
interface Product {
  readonly id: number;
  name: string;
  description?: string;
  price: number | null;
}
```

Now look at each property.

```text
readonly id: number
→ required
→ must be a number
→ cannot be reassigned

name: string
→ required
→ must be a string

description?: string
→ optional
→ property may be absent

price: number | null
→ required property
→ value can be a number or null
```

This one interface shows the main property rules you need.

## Required property

Normal properties are required by default.

```ts
name: string;
```

This means:

```text
name must exist
and
name must contain a string
```

Example:

```ts
const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999
};
```

`description` is missing, but that is fine because it is optional.

## Optional property — `?`

```ts
description?: string;
```

The `?` means the property does not have to exist.

Both of these are valid:

```ts
const product1: Product = {
  id: 1,
  name: 'Laptop',
  price: 999
};
```

and:

```ts
const product2: Product = {
  id: 2,
  name: 'Monitor',
  description: '27-inch display',
  price: 299
};
```

## Nullable value — `| null`

```ts
price: number | null;
```

This means the property must exist, but the value may be:

```text
number
OR
null
```

Example:

```ts
const product: Product = {
  id: 3,
  name: 'Keyboard',
  price: null
};
```

The property exists.

Its current value is `null`.

### Optional vs nullable

These are not the same:

```ts
description?: string;
```

means:

```text
description may be absent
```

while:

```ts
price: number | null;
```

means:

```text
price must exist
but its value may be null
```

## `readonly`

```ts
readonly id: number;
```

The ID can be assigned when the object is created:

```ts
const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999
};
```

But later:

```ts
product.id = 2;
```

TypeScript reports an error.

Other non-readonly properties can still change:

```ts
product.name = 'Gaming Laptop';
```

Memory:

```text
normal property
→ required

?
→ optional

| null
→ value may be null

readonly
→ cannot be reassigned
```

---

# 2. Typing One Object

Once an interface exists:

```ts
interface Product {
  readonly id: number;
  name: string;
  description?: string;
  price: number | null;
}
```

we can use it as the type of an object:

```ts
const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999
};
```

Read:

```ts
product: Product
```

as:

```text
product must follow the Product shape
```

TypeScript now knows:

```text
product.id    → number
product.name  → string
product.price → number | null
```

If we use a property that does not exist:

```ts
product.productName
```

TypeScript can catch that mistake.

If we use the wrong type:

```ts
const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 'expensive'
};
```

TypeScript can also catch that.

That is the main benefit:

```text
interface
→ gives TypeScript information
→ TypeScript checks our objects
```

---

# 3. Typed Arrays

One object:

```ts
Product
```

An array of objects:

```ts
Product[]
```

Example:

```ts
const products: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    price: 999
  },
  {
    id: 2,
    name: 'Monitor',
    description: '27-inch display',
    price: 299
  }
];
```

Read:

```text
Product
→ one Product

Product[]
→ many Products
```

Because the array is typed as `Product[]`, TypeScript knows what every item should look like.

Example:

```ts
products.filter(product => product.price !== null);
```

Inside the callback, `product` is known to be a `Product`.

---

# 4. Nested Models

Sometimes one object contains another structured object.

Example data:

```ts
const product = {
  id: 1,
  name: 'Laptop',
  manufacturer: {
    id: 10,
    name: 'Tech Company'
  }
};
```

Instead of leaving the nested object untyped, we can model it too.

```ts
interface Manufacturer {
  id: number;
  name: string;
}

interface Product {
  readonly id: number;
  name: string;
  manufacturer: Manufacturer;
}
```

Now:

```text
Product
│
├── id
├── name
└── manufacturer
      │
      ├── id
      └── name
```

TypeScript understands:

```ts
product.manufacturer.name
```

as a string.

## Nested arrays

A model can also contain an array of another model.

```ts
interface Review {
  rating: number;
  comment: string;
}

interface Product {
  readonly id: number;
  name: string;
  reviews: Review[];
}
```

Now:

```text
reviews
→ array
→ every item must match Review
```

This is a nested model relationship.

---

# 5. Separate Model Files

If a model is used in several places, it should usually live in its own file.

Example folder:

```text
src/app/
  models/
    product.model.ts
```

File:

```ts
export interface Product {
  readonly id: number;
  name: string;
  description?: string;
  price: number | null;
}
```

`export` means other files can use it.

Another TypeScript file can import it:

```ts
import { Product } from '../models/product.model';
```

Why separate it?

```text
one model definition
       ↓
can be reused by
       ├── components
       ├── child components
       ├── services
       └── API code
```

This avoids defining the same object shape repeatedly.

---

# 6. Typed Component Data in Angular

Now apply the TypeScript model to Angular.

A component property can use the model:

```ts
products: Product[] = [];
```

This means:

```text
products
→ component property

Product[]
→ array of Product objects
```

A single selected item can be typed too:

```ts
selectedProduct: Product | null = null;
```

This means:

```text
selectedProduct
→ either one Product
→ or null
```

Because the component data is typed, TypeScript understands:

```ts
product.name
product.price
product.id
```

when we work with the data.

---

# 7. Typed Inputs in Angular

A child component can receive a simple value:

```ts
productName = input.required<string>();
```

But it can also receive an entire model:

```ts
product = input.required<Product>();
```

Now the child expects one complete `Product`.

It can read:

```ts
this.product().name
this.product().price
```

The interface gives the whole object a known structure.

Flow:

```text
Parent has Product
      ↓
passes Product
      ↓
Child receives Product
      ↓
input.required<Product>()
```

---

# 8. Typed Services and API Responses

The same model can also describe data returned by a service.

Example:

```ts
getProducts(): Product[] {
  return this.products;
}
```

The return type says:

```text
getProducts()
→ returns Product[]
```

For an HTTP/API response:

```ts
this.http.get<Product[]>('/api/products');
```

Focus on:

```ts
<Product[]>
```

This tells TypeScript:

```text
We expect an array of Product objects.
```

The same model can therefore be reused through the application:

```text
API
 ↓
Product[]
 ↓
Service
 ↓
Component
 ↓
Product
 ↓
Child component
```

Important:

A TypeScript interface gives **compile-time type information**.

It does not, by itself, validate an external API response at runtime.

---

# 9. Why Avoid `any`?

Consider:

```ts
let product: any;
```

With `any`, TypeScript has very little useful information about the value.

Code such as:

```ts
product.name;
product.nmae;
product.whatever;
```

is much harder for TypeScript to protect.

Compare:

```ts
let product: Product;
```

Now TypeScript knows the expected structure.

A typo such as:

```ts
product.nmae;
```

can be caught.

Prefer:

```ts
products: Product[];
```

instead of:

```ts
products: any[];
```

Prefer:

```ts
product = input.required<Product>();
```

instead of:

```ts
product = input<any>();
```

Prefer:

```ts
this.http.get<Product[]>(...);
```

instead of:

```ts
this.http.get<any>(...);
```

when the data shape is known.

Memory:

```text
any
→ removes useful type information

known model
→ gives TypeScript useful checks
```

---

# 10. Complete Model Example

Now put the major ideas together in one model.

## File: `product.model.ts`

```ts
export interface Manufacturer {
  readonly id: number;
  name: string;
}

export interface Review {
  rating: number;
  comment?: string;
}

export interface Product {
  readonly id: number;
  name: string;
  description?: string;
  price: number | null;
  manufacturer: Manufacturer;
  reviews: Review[];
}
```

This one model example contains:

```text
required property
→ name

optional property
→ description?

nullable property
→ price: number | null

readonly property
→ readonly id

nested object
→ manufacturer: Manufacturer

nested typed array
→ reviews: Review[]
```

That is the full interface concept in one place.

---

# 11. Complete Angular Example

Now use the model in a complete Angular example.

## File: `product-card.component.ts`

```ts
import { Component, input } from '@angular/core';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  product = input.required<Product>();
}
```

What happens here?

```ts
import { Product } from '../models/product.model';
```

brings the model into the component.

Then:

```ts
product = input.required<Product>();
```

means:

```text
product
→ signal input

required
→ parent must provide it

<Product>
→ value must follow Product shape
```

## File: `product-card.component.html`

```html
<h2>{{ product().name }}</h2>

<p>
  Product ID: {{ product().id }}
</p>

<p>
  Manufacturer: {{ product().manufacturer.name }}
</p>

@if (product().price !== null) {
  <p>
    Price: {{ product().price }}
  </p>
} @else {
  <p>
    Price unavailable
  </p>
}

@if (product().description) {
  <p>
    {{ product().description }}
  </p>
}

<h3>Reviews</h3>

@for (review of product().reviews; track $index) {
  <p>
    Rating: {{ review.rating }}

    @if (review.comment) {
      — {{ review.comment }}
    }
  </p>
}
```

This HTML shows how the model helps the template.

```text
product().name
→ string

product().id
→ number

product().manufacturer
→ Manufacturer

product().manufacturer.name
→ string

product().price
→ number | null

product().description
→ optional string

product().reviews
→ Review[]
```

The model was defined once, but its type information helps everywhere the object is used.

---

# 12. Complete Parent-to-Child Example

For the child input to receive a Product, the parent needs a Product object.

## File: `product-list.component.ts`

```ts
import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      description: 'Work laptop',
      price: 999,
      manufacturer: {
        id: 10,
        name: 'Tech Company'
      },
      reviews: [
        {
          rating: 5,
          comment: 'Excellent'
        },
        {
          rating: 4
        }
      ]
    }
  ];
}
```

## File: `product-list.component.html`

```html
<h1>Products</h1>

@for (product of products; track product.id) {
  <app-product-card
    [product]="product">
  </app-product-card>
}
```

Complete flow:

```text
product.model.ts
       ↓
defines Product shape
       ↓
ProductListComponent
       ↓
products: Product[]
       ↓
@for
       ↓
one product: Product
       ↓
[property binding]
       ↓
ProductCardComponent
       ↓
input.required<Product>()
       ↓
product-card.component.html
```

This is the important Angular connection:

```text
The interface does not move the data.

The interface describes the data
while Angular moves it between components.
```

---

# Where Do We Use Models / Interfaces?

```text
Model file
→ define reusable object shape

Component .ts
→ type component properties

Child component .ts
→ type inputs

Service .ts
→ type returned data

HTTP/API code
→ type expected responses

Template
→ uses already-typed component data
```

---

# Common Mistakes

### 1. Thinking an interface creates data

It only describes the shape.

### 2. Thinking `?` and `| null` mean the same thing

They do not.

```text
?
→ property may be absent

| null
→ property exists, value may be null
```

### 3. Confusing one object and an array

```text
Product
→ one object

Product[]
→ array of objects
```

### 4. Using `any` because it removes an error

If the shape is known, use the real model instead.

### 5. Repeating the same interface in several components

Use a reusable model file.

---

# Quick Reference

```ts
interface Product {
  readonly id: number;
  name: string;
  description?: string;
  price: number | null;
}
```

```text
readonly id: number
→ required + cannot be reassigned

name: string
→ required

description?: string
→ optional

price: number | null
→ required, nullable
```

```ts
const product: Product = ...;
```

```ts
const products: Product[] = ...;
```

```ts
product = input.required<Product>();
```

```ts
getProducts(): Product[] {
  ...
}
```

```ts
this.http.get<Product[]>(...);
```

---

# Main Memory Rule

```text
Interface / model
→ describes the shape of data

Product
→ one object

Product[]
→ many objects

?
→ optional property

| null
→ nullable value

readonly
→ prevents reassignment

nested model
→ model inside another model

separate model file
→ reusable definition

any
→ avoid when the real shape is known
```

---

# Retrieval Checkpoint

Before marking Topic 15 complete, answer these without reading:

1. What does an interface describe?
2. What is the difference between an interface and an object?
3. What do required, optional, nullable, and readonly mean?
4. What is the difference between `Product` and `Product[]`?
5. What is a nested model?
6. Why keep reusable models in separate files?
7. How do models type component properties?
8. How do models type signal inputs?
9. How can the same model be used by services and API responses?
10. Why should `any` be avoided when the data shape is known?
11. In the complete example, how does `Product` travel from the parent to the child?

**Reading the README alone does not complete the topic.**  
Complete the practical implementation and explain the main flow from memory.
