# Day 18 — Angular Dependency Injection
## Concept README — Developer Learning Hub

## 1. What Problem Does Dependency Injection Solve?

A component may need another class in order to do its job.

For example, our `AngularTopicsComponent` needs `TopicService`.

Without Dependency Injection, the component would have to create and manage that dependency itself.

Angular Dependency Injection (DI) changes that responsibility:

```text
AngularTopicsComponent
        ↓
needs TopicService
        ↓
asks Angular
        ↓
Angular Injector
        ↓
provides TopicService
```

### Memory Rule

> Dependency Injection = a class asks Angular for what it needs instead of creating the dependency itself.

---

## 2. What Is a Dependency?

A dependency is simply something another class needs.

In our Learning Hub:

```ts
TopicService
```

is a dependency of:

```ts
AngularTopicsComponent
```

because the component uses the service:

```ts
this.topicService.getTopics();
```

---

## 3. The Angular Injector

Angular has an **injector** that manages dependencies.

Conceptually:

```text
Angular Injector
      ↓
knows how to provide
      ↓
TopicService
      ↓
AngularTopicsComponent
```

The component does not need to know how `TopicService` was created.

It only asks Angular for it.

---

## 4. `inject()`

We already use DI in the Learning Hub:

```ts
topicService = inject(TopicService);
```

Import:

```ts
import { inject } from '@angular/core';
```

Meaning:

```text
inject(TopicService)
→ ask Angular's injector for TopicService
```

Then:

```ts
this.topicService.getTopics();
```

uses the provided service.

### Important Difference

```ts
inject(TopicService)
```

gets the dependency.

```ts
this.topicService.getTopics()
```

calls a method on that dependency.

---

## 5. Why Not Use `new TopicService()`?

Without DI, we might imagine:

```ts
topicService = new TopicService();
```

But this makes the component responsible for constructing its dependency.

With Angular DI:

```ts
topicService = inject(TopicService);
```

Angular manages how the dependency is provided.

This becomes especially useful when services themselves have dependencies or when we need different implementations during testing.

---

## 6. `@Injectable()` and DI

Our service contains:

```ts
@Injectable({
  providedIn: 'root',
})
export class TopicService {
}
```

`@Injectable()` tells Angular that the class can participate in Angular's dependency-injection system.

```text
@Injectable()
      ↓
TopicService can participate in DI
```

---

## 7. `providedIn: 'root'`

```ts
providedIn: 'root'
```

registers the service with Angular's root injector.

Conceptually:

```text
Root Injector
      ↓
TopicService
      ↓
available throughout application
```

So components can request it:

```ts
topicService = inject(TopicService);
```

For our current app, a root-provided service normally means the application shares one root `TopicService` instance.

This is why root services can later hold shared application state.

---

## 8. Root Singleton Behavior

Consider two components:

```text
AngularTopicsComponent
        ↓
inject(TopicService)

TopicNotesComponent
        ↓
inject(TopicService)
```

With `TopicService` provided in the root injector, both normally receive the same root service instance:

```text
             Root Injector
                  ↓
             TopicService
              /       \
             /         \
Component A             Component B
```

This behavior becomes important for our next topic: **Sharing Data / State with Services**.

---

## 9. Constructor Injection

`inject()` is not the only way Angular can inject a dependency.

A traditional Angular pattern is **constructor injection**:

```ts
constructor(private topicService: TopicService) {
}
```

Angular sees that `TopicService` is required and provides it.

Then:

```ts
this.topicService.getTopics();
```

can use it.

So these are two DI styles:

```ts
topicService = inject(TopicService);
```

and:

```ts
constructor(private topicService: TopicService) {
}
```

For our Learning Hub, we are using the modern `inject()` style.

### Recognition Rule

```text
inject(TopicService)
→ field-based DI

constructor(private topicService: TopicService)
→ constructor DI
```

Both ask Angular for a dependency.

---

## 10. Providers

Angular needs to know **what it is allowed to provide**.

That registration is called a **provider**.

Our current provider registration is:

```ts
@Injectable({
  providedIn: 'root',
})
```

So:

```text
provider registration
        ↓
Angular injector knows about TopicService
        ↓
inject(TopicService)
        ↓
Angular can provide it
```

Providers can also be configured at other Angular levels, such as a component or application configuration.

That can change the lifetime/scope of a dependency.

For our current Learning Hub, the important pattern is:

```ts
providedIn: 'root'
```

because we want the service available application-wide.

---

## 11. Service Dependencies

A service can also depend on another service.

Example:

```ts
@Injectable({
  providedIn: 'root',
})
export class TopicService {
  apiService = inject(ApiService);
}
```

Flow:

```text
AngularTopicsComponent
        ↓
needs TopicService
        ↓
TopicService
        ↓
needs ApiService
        ↓
Angular injector provides both
```

The component does not need to manually construct the dependency chain.

This becomes useful later when services use things such as Angular's `HttpClient`.

---

## 12. Why DI Helps Testability

Suppose a component directly creates:

```ts
new TopicService();
```

The component is tightly connected to that exact construction.

With DI:

```ts
topicService = inject(TopicService);
```

the dependency comes from Angular's provider system.

During testing, a different test implementation or mock can be provided instead.

Conceptually:

```text
Real application
→ provide real TopicService

Test
→ provide test/mock TopicService
```

The component still asks for:

```ts
TopicService
```

but the testing environment can control what gets provided.

### Memory Rule

> DI separates **using a dependency** from **creating/providing that dependency**.

---

## 13. Dependency Injection vs Services

These concepts are related, but they are not the same.

### Service

```text
TopicService
→ reusable data/logic class
```

### Dependency Injection

```text
inject(TopicService)
→ mechanism Angular uses to provide that service
```

So:

```text
Service = WHAT we need

Dependency Injection = HOW Angular gives it to us
```

---

## 14. Learning Hub Flow

Our current application:

```text
angular-learning-topics.json
        ↓
TopicService
        ↑
Angular Injector
        ↓
inject(TopicService)
        ↓
AngularTopicsComponent
        ↓
this.topicService.getTopics()
        ↓
Learning Hub UI
```

The important DI part is:

```text
TopicService registered as provider
        ↓
Angular injector manages it
        ↓
component requests it with inject()
```

---

## 15. CLI

Dependency Injection itself does not require a separate CLI command.

When generating a service:

```bash
ng g s services/topic
```

Angular gives us the service structure that can participate in DI.

---

# Quick Reference

### Service participates in DI

```ts
@Injectable({
  providedIn: 'root',
})
export class TopicService {
}
```

### Modern injection style

```ts
topicService = inject(TopicService);
```

### Constructor injection style

```ts
constructor(private topicService: TopicService) {
}
```

### Use the dependency

```ts
this.topicService.getTopics();
```

---

# Topic Checklist

- [x] injector concept
- [x] `inject()`
- [x] constructor injection
- [x] providers
- [x] root singleton behavior
- [x] service dependencies
- [x] testability

---

# Main Memory Rule

```text
Dependency
→ something a class needs

Provider
→ tells Angular what can be provided

Injector
→ manages/provides dependencies

inject(TopicService)
→ ask Angular for TopicService

Service = WHAT we need
DI = HOW Angular provides it
```
