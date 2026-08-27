# Day 17 — Angular Services

## What Is a Service?

A service is a TypeScript class used to keep logic or data that should not live directly inside a component.

```text
Component → UI / user interaction
Service   → reusable/shared logic or data
```

## Create a Service With Angular CLI

```bash
ng generate service services/topic
```

Short version:

```bash
ng g s services/topic
```

## Basic Service

```typescript
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

```text
@Injectable()
→ tells Angular this class can be injected

providedIn: 'root'
→ makes the service available app-wide

getTopics()
→ returns our topic data
```

## Use the Service in a Component

Import `inject` and the service:

```typescript
import { inject } from '@angular/core';
import { TopicService } from '../services/topic.service';
```

Create/get the service instance:

```typescript
topicService = inject(TopicService);
```

`inject()` is Angular syntax for getting an instance of a service.

Then call the service method:

```typescript
angularLearningTopics: LearningTopic[] =
  this.topicService.getTopics();
```

The component no longer needs to import the JSON directly.

## Learning Hub Flow

Before:

```text
AngularTopicsComponent
→ angular-learning-topics.json
```

After:

```text
angular-learning-topics.json
        ↓
TopicService
        ↓
getTopics()
        ↓
AngularTopicsComponent
```

## Why This Helps

The component can focus on displaying and interacting with topics.

The service becomes responsible for providing the topic data.

Later, the same pattern can be used with an API:

```text
AngularTopicsComponent
→ TopicService
→ HttpClient
→ REST API
```

## Memory Rule

```text
ng g s
→ generate service

@Injectable()
→ defines injectable service

inject(TopicService)
→ get service instance in component

this.topicService.getTopics()
→ call service method
```
