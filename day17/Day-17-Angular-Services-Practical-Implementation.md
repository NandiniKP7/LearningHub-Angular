# Day 17 — Angular Services
## Practical Implementation — Developer Learning Hub

## What We Changed

Before today, `AngularTopicsComponent` read the JSON data directly.

```text
AngularTopicsComponent
→ angular-learning-topics.json
```

Today we moved responsibility for providing topic data into `TopicService`.

```text
angular-learning-topics.json
        ↓
TopicService
        ↓
AngularTopicsComponent
```

---

## 1. Generate the Service

```bash
ng generate service services/topic
```

Short version:

```bash
ng g s services/topic
```

---

## 2. Topic Service

Import the JSON into the service:

```typescript
import angularTopicsData from '../angular-learning-topics.json';
```

The name `angularTopicsData` is a local name we chose for the imported JSON.

Then provide the data through a method:

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

Important:

```text
angularTopicsData
→ our local variable/name for the imported JSON

angularTopicsData.topics
→ the actual "topics" property inside the JSON
```

---

## 3. Inject the Service Into the Component

In `angular-topics.component.ts`:

```typescript
import { inject } from '@angular/core';
import { TopicService } from '../services/topic.service';
```

Then:

```typescript
topicService = inject(TopicService);
```

Meaning:

```text
TopicService class
      ↓
inject(TopicService)
      ↓
topicService
      ↓
component can use the service
```

---

## 4. Get Topics Through the Service

Before:

```typescript
angularLearningTopics: LearningTopic[] =
  angularTopicsData.topics;
```

After:

```typescript
angularLearningTopics: LearningTopic[] =
  this.topicService.getTopics();
```

The component no longer needs:

```typescript
import angularTopicsData from '../angular-learning-topics.json';
```

That import now belongs in `TopicService`.

---

## Final Flow

```text
angular-learning-topics.json
        ↓
angularTopicsData
        ↓
TopicService.getTopics()
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

## Why We Did This

The component focuses on:

```text
display
search
user interaction
```

The service focuses on:

```text
providing topic data
```

Later, when we learn HTTP/API calls, this structure can become:

```text
AngularTopicsComponent
        ↓
TopicService
        ↓
HttpClient
        ↓
REST API
```

---

# Day 17 Main Memory

```text
Service
→ reusable/shared logic or data

@Injectable()
→ service can be injected

providedIn: 'root'
→ service available app-wide

inject(TopicService)
→ get service instance

this.topicService.getTopics()
→ call service method
```
