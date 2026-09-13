# 18. Angular Services

## Subtopics
- service purpose
- `@Injectable`
- `providedIn: 'root'`
- service methods
- service state
- component vs service responsibility
- multiple consumers

## What it solves

Components should mainly handle UI and user interaction.

Reusable data or logic can live in a **service**.

```text
Component
→ UI / interaction

Service
→ reusable data / logic
→ shared state when appropriate
```

## Where do we use this?

Services live in `.ts` files such as:

```text
product.service.ts
```

Components inject the service when they need it.

## Basic service

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): string[] {
    return [
      'Laptop',
      'Monitor',
      'Keyboard'
    ];
  }
}
```

### `@Injectable()`

Tells Angular the class can participate in dependency injection.

### `providedIn: 'root'`

Registers the service with the root injector.

It is then available application-wide, and Angular normally reuses one root instance.

## Use the service in a component

```ts
import { Component, inject } from '@angular/core';
import { ProductService } from './product.service';

export class ProductListComponent {

  private productService =
    inject(ProductService);

  products =
    this.productService.getProducts();
}
```

Think:

```text
inject(ProductService)
→ get service

productService.getProducts()
→ call service method
```

## Service state

A service can also own state.

```ts
@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemCount = 0;
}
```

Shared reactive state with signals is covered in Topic 20.

## Component vs service responsibility

Keep in the component:

```text
button handling
show/hide UI
local expansion state
template-specific behavior
```

Consider a service for:

```text
reusable data
shared state
API communication
business logic used by several components
```

## Multiple consumers

```text
ProductList ──┐
              ├→ ProductService
Cart ─────────┘
```

With a root service, both can use the same service instance.

## Service is not an API

```text
Service
→ Angular/TypeScript class

API
→ external endpoint/system
```

A service may call an API later, but the service itself is not the API.

## Common mistakes
- Moving every method into a service.
- Creating services only because “Angular uses services.”
- Confusing a service with an external API.
- Manually creating services with `new` instead of using DI.

## Quick reference

```ts
@Injectable({
  providedIn: 'root'
})
export class ExampleService {}
```

```ts
private exampleService =
  inject(ExampleService);
```

## Memory rule

**Component = UI. Service = reusable data/logic/shared state when needed.**
