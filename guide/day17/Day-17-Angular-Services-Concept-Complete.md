# Day 17 — Angular Services
## Concept README — Developer Learning Hub

## 1. What Problem Does a Service Solve?

A component should mainly handle the UI and user interaction.

As an application grows, some data or logic should not belong directly inside a component.

```text
Component
→ display data
→ handle user interaction

Service
→ provide reusable data
→ contain reusable/shared logic
→ later communicate with APIs
```

A service is a TypeScript class that gives Angular components a separate place for this responsibility.

---

## 2. Why Use a Service?

Before our service:

```text
AngularTopicsComponent
        ↓
angular-learning-topics.json
```

The component was responsible for both:

```text
getting topic data
+
displaying/interacting with topic data
```

After introducing `TopicService`:

```text
angular-learning-topics.json
        ↓
TopicService
        ↓
AngularTopicsComponent
        ↓
Learning Hub UI
```

Now the responsibilities are clearer:

```text
TopicService
→ provides topic data

AngularTopicsComponent
→ displays/searches/interacts with topic data
```

### Memory Rule

> Component = UI responsibility  
> Service = reusable data/logic responsibility

---

## 3. Generate a Service With Angular CLI

```bash
ng generate service services/topic
```

Short form:

```bash
ng g s services/topic
```

Angular creates a service class for us.

---

## 4. Basic Service Structure

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TopicService {

}
```

There are three important pieces here.

### `@Injectable()`

```ts
@Injectable(...)
```

Tells Angular that this class can participate in Angular's dependency-injection system.

### `providedIn: 'root'`

```ts
providedIn: 'root'
```

Makes the service available from Angular's root injector.

For our current application, this means components can request `TopicService` without manually registering it in each component.

A root-provided service normally gives us one shared service instance for the application.

We study Dependency Injection itself separately; for Services, remember:

```text
@Injectable
→ Angular can provide the service

providedIn: 'root'
→ service is available application-wide
```

### Service Class

```ts
export class TopicService {
}
```

It is still a normal TypeScript class. We can put methods and state inside it.

---

## 5. Service Methods

A service can expose methods that components call.

Our Learning Hub uses:

```ts
getTopics() {
  return angularTopicsData.topics;
}
```

Full example:

```ts
import { Injectable } from '@angular/core';
import angularTopicsData from '../angular-learning-topics.json';

@Injectable({
  providedIn: 'root',
})
export class TopicService {

  getTopics() {
    return angularTopicsData.topics;
  }

}
```

Flow:

```text
component asks for topics
        ↓
getTopics()
        ↓
service reads topic data
        ↓
service returns data
        ↓
component receives topics
```

The component does not need to know exactly where the data came from.

Today:

```text
TopicService → JSON
```

Later:

```text
TopicService → HttpClient → REST API
```

The component can continue asking the service for data.

---

## 6. Using a Service in a Component

First import `inject` and the service:

```ts
import { inject } from '@angular/core';
import { TopicService } from '../services/topicService.service';
```

Then request the service:

```ts
topicService = inject(TopicService);
```

Meaning:

```text
TopicService class
        ↓
inject(TopicService)
        ↓
Angular provides the service instance
        ↓
topicService
```

Now the component can call its methods:

```ts
angularLearningTopics: LearningTopic[] =
  this.topicService.getTopics();
```

### Important Difference

```ts
topicService = inject(TopicService);
```

gets access to the service.

```ts
this.topicService.getTopics();
```

calls a method on that service.

---

## 7. Component vs Service Responsibility

A common question is:

> Should this code live in the component or the service?

Use this basic rule.

### Component

Keep code in the component when it is mainly about that component's UI or interaction.

Examples from our Learning Hub:

```text
search input event
displaying TopicCard
responding to a click
template-related behavior
```

### Service

Consider a service when the responsibility is reusable or should be separated from UI code.

Examples:

```text
providing topic data
API communication
shared business logic
shared application state
```

Do not move every function into a service just because services exist.

---

## 8. Services Can Hold State

A service can contain values as well as methods.

For example:

```ts
selectedTopic = signal('');
```

Because a root-provided service can be used by multiple components, service-owned state can become shared application state.

```text
Component A
     ↓
TopicService state
     ↑
Component B
```

This is an important service capability, but the design patterns for it belong to our next topic:

**Sharing Data / State with Services**

There we cover:

```text
signals in services
private writable/public readonly signals
computed service state
avoiding duplicated state
```

So for the Services topic, remember only:

> A service can own state; shared-state design is a separate lesson.

---

## 9. Multiple Components Can Use the Same Service

Suppose two components both need `TopicService`.

```ts
topicService = inject(TopicService);
```

Each component can request the service through Angular.

With:

```ts
providedIn: 'root'
```

they normally receive the same root service instance.

Conceptually:

```text
             TopicService
             /          \
            /            \
Component A                Component B
```

This is why services are useful for reusable functionality and, when appropriate, shared state.

We will implement the multiple-component shared-state pattern during the **Sharing State** topic rather than duplicating that lesson here.

---

## 10. Service vs API Call

A service is **not** an API call.

A service is an Angular/TypeScript class.

Today:

```text
AngularTopicsComponent
        ↓
TopicService
        ↓
local JSON
```

Later:

```text
AngularTopicsComponent
        ↓
TopicService
        ↓
HttpClient
        ↓
REST API
```

The service is the place where API communication commonly lives, but the service itself is not the API.

---

## 11. Our Learning Hub Implementation

Before:

```ts
import angularTopicsData from '../angular-learning-topics.json';

angularLearningTopics: LearningTopic[] =
  angularTopicsData.topics;
```

The component directly knew about the JSON.

After:

### `TopicService`

```ts
import { Injectable } from '@angular/core';
import angularTopicsData from '../angular-learning-topics.json';

@Injectable({
  providedIn: 'root',
})
export class TopicService {

  getTopics() {
    return angularTopicsData.topics;
  }

}
```

### `AngularTopicsComponent`

```ts
topicService = inject(TopicService);

angularLearningTopics: LearningTopic[] =
  this.topicService.getTopics();
```

The direct JSON import should no longer be needed in `AngularTopicsComponent`.

---

## 12. Complete Data Flow

```text
angular-learning-topics.json
            ↓
    angularTopicsData
            ↓
       TopicService
            ↓
        getTopics()
            ↓
 inject(TopicService)
            ↓
this.topicService.getTopics()
            ↓
 AngularTopicsComponent
            ↓
   Learning Hub UI
```

---

# Quick Reference

```bash
ng g s services/topic
```

```ts
@Injectable({
  providedIn: 'root',
})
export class TopicService {
  getTopics() {
    return angularTopicsData.topics;
  }
}
```

```ts
topicService = inject(TopicService);

angularLearningTopics =
  this.topicService.getTopics();
```

---

# Services Checklist

After this lesson you should understand:

- [x] service purpose
- [x] `@Injectable`
- [x] `providedIn: 'root'`
- [x] service methods
- [x] component vs service responsibility
- [x] that services can hold state
- [x] that multiple components can consume a root-provided service

The last two are introduced here as **service capabilities**. Their actual shared-state implementation and design patterns are taught in **Sharing Data / State with Services**.

---

# Main Memory Rule

```text
Component
→ UI and interaction

Service
→ reusable data and logic

inject(TopicService)
→ ask Angular for the service

this.topicService.getTopics()
→ use the service

Service state shared across components
→ next topic: Sharing State
```
