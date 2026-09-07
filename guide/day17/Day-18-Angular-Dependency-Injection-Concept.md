# Day 18 --- Angular Dependency Injection

## 1. What is Dependency Injection?

**Dependency Injection (DI)** is Angular's way of giving a class the
objects/services it needs instead of making the class create them
itself.

In our Learning Hub:

``` text
AngularTopicsComponent
        ↓ needs
   TopicService
        ↓
Angular Dependency Injection
provides the TopicService instance
```

Yesterday we wrote:

``` ts
topicService = inject(TopicService);
```

That is already using **Dependency Injection**.

## 2. Why use Dependency Injection?

With Angular DI:

``` ts
topicService = inject(TopicService);
```

Angular handles providing the service instance.

``` text
Component      → displays/controls the UI
TopicService   → provides topic data
Angular DI     → provides the service to the component
```

## 3. `inject()` --- Basic Structure

``` ts
import { inject } from '@angular/core';
import { TopicService } from '../services/topic.service';

topicService = inject(TopicService);

angularLearningTopics = this.topicService.getTopics();
```

Pattern:

``` ts
serviceVariable = inject(ServiceClass);
```

-   `TopicService` = service class Angular should provide
-   `topicService` = variable holding the provided service instance
-   `inject()` = asks Angular's DI system for that dependency

## 4. What does `providedIn: 'root'` mean?

``` ts
@Injectable({
  providedIn: 'root',
})
export class TopicService {
}
```

`@Injectable()` tells Angular the class can participate in Dependency
Injection.

`providedIn: 'root'` makes the service available through the
application's root injector. Components can request it with:

``` ts
inject(TopicService)
```

without manually adding the service to each component's providers.

## 5. Service Instance Sharing

With `providedIn: 'root'`, Angular normally creates one application-wide
instance and reuses it when classes request that service from the root
injector.

``` text
AngularTopicsComponent ─┐
                        ├──→ TopicService instance
AnotherComponent ───────┘
```

This is useful later for shared application state and API communication.

## 6. Learning Hub Flow

Before Services:

``` text
AngularTopicsComponent
        ↓
angular-learning-topics.json
```

After Services + DI:

``` text
AngularTopicsComponent
        ↓
inject(TopicService)
        ↓
Angular Dependency Injection
        ↓
TopicService
        ↓
angular-learning-topics.json
```

The component **requests** `TopicService`; Angular provides the service
instance.

## 7. Today's Key Syntax

``` ts
@Injectable({
  providedIn: 'root',
})
export class TopicService {
}
```

``` ts
topicService = inject(TopicService);
```

``` ts
angularLearningTopics = this.topicService.getTopics();
```

There is no new CLI command specifically required for Dependency
Injection today. The service was generated with:

``` bash
ng generate service services/topic
```

Short form:

``` bash
ng g s services/topic
```

## Memory Rule

> **Service = dependency. `inject()` = ask Angular for it. DI = Angular
> provides it.**

``` text
I need TopicService
        ↓
inject(TopicService)
        ↓
Angular DI provides it
        ↓
this.topicService.getTopics()
```
