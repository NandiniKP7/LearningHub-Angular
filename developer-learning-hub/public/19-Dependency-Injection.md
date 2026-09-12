# Topic 19 — Angular Dependency Injection


## What problem does Dependency Injection solve?

A class may need another class in order to do its job.

```text
ProductListComponent
→ needs ProductService
```

Without Dependency Injection, the component would create that dependency itself.

Angular DI changes the responsibility:

```text
Component
→ asks Angular
→ Angular's injector provides the dependency
```

## 1. What is a dependency?

A dependency is simply something another class needs.

If `ProductListComponent` uses `ProductService`, then `ProductService` is a dependency of that component.

## 2. Injector concept

Angular has an injector that manages dependencies.

```text
Angular Injector
      ↓
knows how to provide
      ↓
ProductService
      ↓
ProductListComponent
```

The component does not need to know how the service was constructed.

## 3. `inject()`

```ts
import { inject } from '@angular/core';

productService = inject(ProductService);
```

Read this as:

```text
inject(ProductService)
→ ask Angular's injector for ProductService
```

Then:

```ts
this.productService.getProducts();
```

uses the dependency.

## 4. Why not `new ProductService()`?

```ts
productService = new ProductService();
```

makes the component responsible for constructing the dependency.

With:

```ts
productService = inject(ProductService);
```

Angular controls how the dependency is provided.

This becomes important when services have their own dependencies or tests need replacements.

## 5. Constructor injection

Another Angular DI style is:

```ts
constructor(
  private productService: ProductService
) {
}
```

Angular sees the required dependency and supplies it.

Recognize both:

```text
inject(ProductService)
→ field-based injection

constructor(private productService: ProductService)
→ constructor injection
```

## 6. Providers

Angular must know what it can provide.

A provider registration can be:

```ts
@Injectable({
  providedIn: 'root'
})
export class ProductService {
}
```

Conceptually:

```text
provider
→ registers availability

injector
→ resolves/provides dependency

inject(...)
→ requests dependency
```

Providers can also be configured at other levels, such as a component or application configuration. That can change dependency scope.

## 7. Root singleton behavior

With:

```ts
providedIn: 'root'
```

Angular normally reuses one root instance.

```text
              Root Injector
                   ↓
            ProductService
             /          \
            /            \
Component A            Component B
```

This is important for shared state because both consumers can see the same service-owned state.

## 8. Service dependencies

A service can depend on another service.

```ts
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  logger = inject(LoggerService);
}
```

Flow:

```text
Component
→ needs ProductService
→ ProductService needs LoggerService
→ Angular injector resolves both
```

The component does not manually create the dependency chain.

## 9. Testability

If a component directly creates:

```ts
new ProductService();
```

it is tightly connected to that construction.

With DI:

```ts
productService = inject(ProductService);
```

a test can provide another implementation.

```text
Real app
→ real ProductService

Test
→ fake/mock ProductService
```

This is why DI improves testability.

## 10. Service vs DI

```text
Service
→ WHAT class/data/logic we need

Dependency Injection
→ HOW Angular gives it to us
```

## Complete example using `inject()`

### `product.service.ts`

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(): string[] {
    return ['Laptop', 'Monitor'];
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
  private productService = inject(ProductService);

  products = this.productService.getProducts();
}
```

### `product-list.component.html`

```html
<h2>Products</h2>

@for (product of products; track product) {
  <p>{{ product }}</p>
}
```

Complete DI flow:

```text
ProductService
→ provided in root
→ root injector knows it
→ component calls inject(ProductService)
→ Angular supplies service
→ component uses service method
```

## Constructor-injection recognition example

```ts
export class ProductListComponent {
  products: string[];

  constructor(
    private productService: ProductService
  ) {
    this.products = this.productService.getProducts();
  }
}
```

You only need to recognize both styles. You do not need to rewrite working code just to use both.

## Topic 19 checklist

- [x] injector concept
- [x] `inject()`
- [x] constructor injection
- [x] providers
- [x] root singleton behavior
- [x] service dependencies
- [x] testability

## Retrieval checkpoint

1. What is a dependency?
2. What does the injector do?
3. What does `inject(ProductService)` mean?
4. Why is `inject()` different from `new`?
5. What is constructor injection?
6. What is a provider?
7. What does root singleton behavior mean?
8. Can a service depend on another service?
9. Why does DI improve testing?
10. What is the difference between a service and DI?
