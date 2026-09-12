# Topic 18 — Angular Services

**Revision date:** September 11, 2026  
**Planned learning time:** 1–2 days

## What problem does a service solve?

A component should mainly handle UI and user interaction. As an app grows, reusable data or logic should often live somewhere separate from the component.

```text
Component
→ UI / interaction

Service
→ reusable data
→ reusable logic
→ shared state when appropriate
```

A service is a TypeScript class used for those non-UI responsibilities.

## 1. Basic structure

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
}
```

### `@Injectable()`

```text
@Injectable()
→ tells Angular this class can participate in dependency injection
```

We will study Dependency Injection in Topic 19.

### `providedIn: 'root'`

```text
providedIn: 'root'
→ registers the service with Angular's root injector
→ service is available application-wide
→ Angular normally reuses one root instance
```

## 2. Service methods

A service can expose methods that components call.

```ts
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): string[] {
    return ['Laptop', 'Monitor', 'Keyboard'];
  }
}
```

The component asks the service for data instead of owning the data source itself.

## 3. Using a service from a component

```ts
import { Component, inject } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  productService = inject(ProductService);

  products = this.productService.getProducts();
}
```

Important:

```text
inject(ProductService)
→ gets the service

this.productService.getProducts()
→ calls a method on the service
```

## 4. Service state

A service can store values as well as methods.

```ts
@Injectable({
  providedIn: 'root'
})
export class CartService {
  itemCount = 0;
}
```

So a service can own state.

Because a root-provided service can be used by several components, that state can become shared state. Topic 20 covers the better reactive pattern with signals.

## 5. Component vs service responsibility

Usually keep code in a component when it is mainly about that component's UI:

```text
button click handling
show/hide UI
template behavior
local search text
```

Consider a service for:

```text
reusable data
API communication
shared business logic
shared application state
logic used by several components
```

Do not move every method into a service.

## 6. Multiple consumers

Two components can request the same root-provided service.

```text
              ProductService
              /            \
             /              \
ProductListComponent     CartComponent
```

With `providedIn: 'root'`, both normally receive the same root service instance.

## 7. Service is not an API

```text
Service
→ Angular/TypeScript class

API
→ external endpoint/system
```

A service may later call an API:

```text
Component
→ Service
→ HttpClient
→ REST API
```

but the service itself is not the API.

## Complete example

### `product.service.ts`

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = ['Laptop', 'Monitor', 'Keyboard'];

  getProducts(): string[] {
    return this.products;
  }

  getProductCount(): number {
    return this.products.length;
  }
}
```

### `product-list.component.ts`

```ts
import { Component, inject } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {
  productService = inject(ProductService);

  products = this.productService.getProducts();
  productCount = this.productService.getProductCount();
}
```

### `product-list.component.html`

```html
<h2>Products</h2>

<p>Total products: {{ productCount }}</p>

@for (product of products; track product) {
  <p>{{ product }}</p>
}
```

## Topic 18 checklist

- [x] service purpose
- [x] `@Injectable`
- [x] `providedIn: 'root'`
- [x] service methods
- [x] service state
- [x] component vs service responsibility
- [x] multiple consumers

## Retrieval checkpoint

1. What problem does a service solve?
2. What does `@Injectable()` mean?
3. What does `providedIn: 'root'` mean?
4. What is the difference between getting a service and calling its method?
5. Can a service own state?
6. What stays in a component?
7. What belongs in a service?
8. Why can several components use the same root service?
