# 19. Dependency Injection

## Subtopics
- injector concept
- `inject()`
- constructor injection
- providers
- root singleton behavior
- service dependencies
- testability

## What it solves

A class often needs another class to do its job.

Instead of manually creating that dependency, Angular can provide it.

```text
Component
  ↓ asks Angular
Injector
  ↓ provides
Service
```

## Where do we use this?

Mostly in component/service `.ts` files and provider configuration.

## What is a dependency?

If:

```text
ProductListComponent
needs
ProductService
```

then `ProductService` is a dependency of `ProductListComponent`.

## `inject()`

```ts
import { inject } from '@angular/core';

private productService =
  inject(ProductService);
```

Read it as:

```text
Ask Angular's injector for ProductService.
```

Then:

```ts
this.productService.getProducts();
```

uses the dependency.

## Why not `new ProductService()`?

```ts
new ProductService()
```

makes the component responsible for creating the dependency.

```ts
inject(ProductService)
```

lets Angular control how it is provided.

This becomes useful when dependencies have dependencies, scopes differ, or tests need replacements.

## Constructor injection

Another style is:

```ts
constructor(
  private productService: ProductService
) {}
```

Recognize both styles.

For our current code, we commonly use `inject()`.

## Providers

Angular must know how a dependency can be provided.

```ts
@Injectable({
  providedIn: 'root'
})
export class ProductService {}
```

Think:

```text
provider
→ registers availability

injector
→ resolves dependency

inject(...)
→ requests dependency
```

## Root singleton behavior

With:

```ts
providedIn: 'root'
```

Angular normally reuses one root instance.

```text
         ProductService
          /          \
Component A        Component B
```

That is why a root service can hold shared state.

## Service dependencies

A service can inject another service:

```ts
export class ProductService {
  private logger = inject(LoggerService);
}
```

Angular resolves the dependency chain.

## Testability

With DI, a test can provide a fake/mock dependency instead of the real one.

That is much easier than a component creating dependencies itself with `new`.

## Service vs DI

```text
Service
→ WHAT functionality/data we need

Dependency Injection
→ HOW Angular gives that dependency to us
```

## Common mistakes
- Confusing a service with DI.
- Calling `new SomeService()` in components.
- Assuming every provider is always a single global instance.
- Thinking `inject()` creates the service itself.

## Quick reference

```ts
private productService =
  inject(ProductService);
```

or:

```ts
constructor(
  private productService: ProductService
) {}
```

## Memory rule

**Dependency = something a class needs. Injector = Angular provides it.**
