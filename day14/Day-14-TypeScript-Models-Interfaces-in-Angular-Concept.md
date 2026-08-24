# Day 14 — TypeScript Models / Interfaces in Angular

## What Is an Interface?

An interface describes the **shape of an object**.

```typescript
interface LearningTopic {
  id: number;
  title: string;
  subTopics: string[];
}
```

This means:

```text
id        → number
title     → string
subTopics → array of strings
```

## Interface vs Actual Data

The interface describes the structure:

```typescript
interface LearningTopic {
  id: number;
  title: string;
  subTopics: string[];
}
```

The object/JSON contains the actual values:

```typescript
{
  id: 3,
  title: 'Components',
  subTopics: ['selector', 'imports']
}
```

Memory:

```text
interface → describes the shape
object/JSON → contains the values
```

## Why Use an Interface?

It gives us one reusable definition and lets TypeScript check that objects have the expected types.

```text
Interface
→ expected object shape
→ TypeScript checks our data
```

## One Object vs an Array

```text
LearningTopic   → one topic object
LearningTopic[] → array of topic objects
```

Example:

```typescript
const topics: LearningTopic[] = [
  {
    id: 1,
    title: 'Application Architecture',
    subTopics: ['Angular CLI', 'main.ts']
  }
];
```

## Optional Properties

`?` means a property is optional:

```typescript
interface LearningTopic {
  id: number;
  title: string;
  subTopics: string[];
  description?: string;
}
```

## Where Should the Interface Live?

A reusable model can live in its own file:

```text
src/app/
  models/
    learning-topic.model.ts
```

```typescript
export interface LearningTopic {
  id: number;
  title: string;
  subTopics: string[];
}
```

`export` allows other TypeScript files to use it.

## Importing the Interface

```typescript
import { LearningTopic } from '../models/learning-topic.model';
```

Then:

```typescript
topics: LearningTopic[] = [];
```

## Learning Hub Connection

Our current data flow is:

```text
angular-learning-topics.json
        ↓
AngularTopicsComponent
        ↓
TopicCard
```

The interface gives TypeScript a reusable definition for those topic objects.

Later:

```text
API / JSON
    ↓
LearningTopic[]
    ↓
Angular components
```

## Quick Cheat Sheet

```typescript
interface LearningTopic {
  id: number;
  title: string;
  subTopics: string[];
}
```

```text
property?: string → optional

LearningTopic     → one object
LearningTopic[]   → many objects
```

# Day 14 Main Memory Rule

```text
Interface
→ defines what an object should look like

JSON / object
→ contains the actual data
```
