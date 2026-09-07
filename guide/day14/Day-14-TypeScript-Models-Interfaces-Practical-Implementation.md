# Day 14 — TypeScript Models / Interfaces in Angular
## Practical Implementation — Developer Learning Hub

## What We Changed

The Angular Learning Hub already loads its topic data from:

```text
angular-learning-topics.json
```

Today we added a reusable TypeScript interface that describes the shape of each topic object.

The goal was to add type safety without changing the existing application behavior.

---

## 1. Existing JSON Shape

A topic in the JSON contains properties such as:

```json
{
  "id": 1,
  "slug": "angular-application-setup-architecture",
  "title": "Angular Application Setup & Architecture",
  "plannedLearningTime": "1–2 days",
  "subTopics": [
    "Angular CLI",
    "ng new / ng serve",
    "SPA startup flow"
  ],
  "category": "core-angular"
}
```

The JSON contains the **actual values**.

---

## 2. Create the Model

File:

```text
src/app/models/learning-topic.model.ts
```

Interface:

```typescript
export interface LearningTopic {
  id: number;
  slug: string;
  title: string;
  plannedLearningTime: string | null;
  subTopics: string[];
  category: string;
}
```

The interface describes what one learning-topic object should look like.

---

## 3. Why `string | null`?

Some JSON topics may not contain a learning-time string and can have:

```json
"plannedLearningTime": null
```

Therefore:

```typescript
plannedLearningTime: string | null;
```

means:

```text
plannedLearningTime
→ can contain a string
OR
→ can contain null
```

---

## 4. Export the Interface

```typescript
export interface LearningTopic {
```

`export` allows another TypeScript file to import and use the interface.

---

## 5. Import the Interface

In `angular-topics.component.ts`:

```typescript
import { LearningTopic } from '../models/learning-topic.model';
```

Now the component can use the model.

---

## 6. Apply the Interface to the JSON Topic Array

Before:

```typescript
angularLearningTopics = angularTopicsData.topics;
```

After:

```typescript
angularLearningTopics: LearningTopic[] =
  angularTopicsData.topics;
```

Meaning:

```text
angularLearningTopics
→ array

LearningTopic[]
→ every item should match the LearningTopic structure

angularTopicsData.topics
→ actual data coming from JSON
```

---

## 7. One Topic vs Multiple Topics

```typescript
LearningTopic
```

means:

```text
ONE learning-topic object
```

while:

```typescript
LearningTopic[]
```

means:

```text
ARRAY of learning-topic objects
```

Our `angularLearningTopics` contains all topics, so we use:

```typescript
LearningTopic[]
```

---

## 8. Interface vs JSON

```text
LearningTopic interface
→ defines the expected structure

angular-learning-topics.json
→ contains the actual topic values
```

Example:

```text
Interface                         JSON

id: number                 ←→    "id": 1
slug: string               ←→    "slug": "..."
title: string              ←→    "title": "..."
subTopics: string[]        ←→    "subTopics": [...]
category: string           ←→    "category": "..."
```

---

## 9. Existing Search Still Works

The existing computed search continues using:

```typescript
filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter((topic) => {
    return topic.title
      .toLowerCase()
      .includes(this.searchText().toLowerCase());
  }),
);
```

Because TypeScript now knows that each `topic` is a `LearningTopic`, it also knows:

```text
topic.title
→ string

topic.subTopics
→ string[]

topic.id
→ number
```

---

## 10. Existing Component Behavior Was Not Changed

We did not change the existing topic-selection output just to demonstrate the interface.

The current selection method can remain:

```typescript
onTopicSelected(topic: string) {
  this.selectedLearningTopic.emit(topic);
}
```

The interface is being used where it provides a real benefit:

```typescript
angularLearningTopics: LearningTopic[] =
  angularTopicsData.topics;
```

---

# Complete Day 14 Flow

```text
angular-learning-topics.json
        ↓
actual topic data
        ↓
LearningTopic[]
        ↓
AngularTopicsComponent
        ↓
computed search / template / TopicCard
```

---

# Day 14 Main Learning

```text
interface
→ defines an object shape

export
→ makes the interface reusable

import
→ brings the interface into another file

LearningTopic
→ one topic object

LearningTopic[]
→ array of topic objects

string | null
→ value can be a string or null
```

## Main Memory Rule

```text
Interface
→ structure/type definition

JSON
→ actual data

LearningTopic[]
→ JSON topic array follows the LearningTopic structure
```
