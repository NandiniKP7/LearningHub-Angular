# 15. TypeScript Models / Interfaces in Angular

## Subtopics
- interfaces / models
- required / optional / readonly properties
- typed arrays
- typed component data
- typed inputs / services / API responses
- nested models
- separate model files
- avoid `any`

## What it solves

Angular applications pass objects between components and services.

An interface gives those objects a **clear shape** so TypeScript can check them.

## Where do we use this?

| Place | Example |
|---|---|
| Model file | `product.model.ts` |
| Component `.ts` | `products: Product[]` |
| Child input | `input.required<Product>()` |
| Service | `getProducts(): Product[]` |
| HTTP response | typed API data |

## Basic interface

```ts
export interface Product {
  id: number;
  name: string;
  price: number;
}
```

The interface describes the object. It does not create data.

```ts
const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999
};
```

## Required, optional, nullable, readonly

```ts
export interface Product {
  readonly id: number;
  name: string;
  description?: string;
  price: number | null;
}
```

Meaning:

```text
name
→ required

description?
→ may be missing

price: number | null
→ property exists, value may be null

readonly id
→ cannot be reassigned later
```

## Typed arrays

```ts
products: Product[] = [
  {
    id: 1,
    name: 'Laptop',
    price: 999
  }
];
```

`Product[]` means an array containing `Product` objects.

## Nested models

```ts
export interface Manufacturer {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  manufacturer: Manufacturer;
}
```

Use another model when a nested object has its own meaningful structure.

## Separate model file

`product.model.ts`

```ts
export interface Product {
  readonly id: number;
  name: string;
  price: number | null;
}
```

Component:

```ts
import { Product } from './models/product.model';

products: Product[] = [];
```

This gives the type one reusable home.

## Typed component data

```ts
selectedProduct: Product | null = null;
```

## Typed child input

```ts
product = input.required<Product>();
```

Parent passes one complete `Product` object.

## Typed service

```ts
getProducts(): Product[] {
  return this.products;
}
```

## Typed API response

Later, with `HttpClient`:

```ts
this.http.get<Product[]>('/api/products');
```

The same model can describe data across components, services, and HTTP.

## Why avoid `any`?

```ts
product: any;
```

removes much of TypeScript's checking.

Prefer:

```ts
product: Product;
```

so TypeScript can catch missing or incorrect properties.

## Common mistakes
- Confusing an interface with actual data.
- Making everything optional.
- Using `any` when the shape is known.
- Duplicating the same interface in several components.
- Forgetting `null` when the application can genuinely have no value.

## Quick reference

```ts
export interface User {
  readonly id: number;
  name: string;
  email?: string;
}
```

```ts
users: User[] = [];
selectedUser: User | null = null;
```

## Memory rule

**Interface = reusable description of an object's shape. Object = actual values.**
