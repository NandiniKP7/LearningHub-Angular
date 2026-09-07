# Day 11 — Signal Inputs

## What is a Signal Input?

A Signal Input lets a child component receive a value from its parent.

```typescript
learningTopic = input.required<string>();
```

```text
Parent → has the original value
Parent → passes the value
Child  → receives the value through input()
Child  → reads/uses the received value
```

## Parent → Child Example

Parent HTML:

```html
<app-topic-card
  [learningTopic]="angularLearningTopic">
</app-topic-card>
```

Child TypeScript:

```typescript
learningTopic = input.required<string>();
```

Flow:

```text
Parent: angularLearningTopic
        ↓
[learningTopic]
        ↓
Child: learningTopic = input.required<string>()
```

## Reading a Signal Input

Read it using `()`.

```typescript
this.learningTopic()
```

HTML:

```html
{{ learningTopic() }}
```

## Signal Input vs Writable Signal

Writable Signal:

```typescript
selectedTechnology = signal('');
this.selectedTechnology.set('AngularBasics');
```

```text
signal()
→ component creates the state
→ component can change it
→ .set() / .update()
```

Signal Input:

```typescript
learningTopic = input.required<string>();
```

```text
input()
→ child receives value from parent
→ child reads it with ()
```

The child does not do:

```typescript
this.learningTopic.set("Something"); // ❌
```

## `input.required()` vs `input()`

```typescript
learningTopic = input.required<string>();
```

```text
→ parent must pass a value
```

With a default:

```typescript
learningTopic = input('');
```

```text
→ parent can pass a value
→ if not, default is ""
```

For `TopicCardComponent`, required makes sense because the card needs a topic to display.

## If the Parent Value Changes

```text
Parent passes "Components"
        ↓
learningTopic()
→ "Components"
```

Later:

```text
Parent passes "Signals"
        ↓
Signal Input receives new value
        ↓
learningTopic()
→ "Signals"
```

The child does not manually update the input.

## Signal Input + Computed Signal

```typescript
learningTopic = input.required<string>();

topicTitle = computed(() =>
  `Learn ${this.learningTopic()}`
);
```

```text
learningTopic()
→ "Components"
        ↓
computed()
        ↓
topicTitle()
→ "Learn Components"
```

## Three Signal Types We Know

```text
signal()
→ component creates state
→ can .set() / .update()

input()
→ child receives value from parent
→ read with ()

computed()
→ derives a value from signals
→ read with ()
```

## Learning Hub Example

Our existing `TopicCardComponent` already uses a Signal Input:

```typescript
learningTopic = input.required<string>();
```

Parent:

```html
<app-topic-card
  [learningTopic]="angularLearningTopic">
</app-topic-card>
```

Child:

```html
{{ learningTopic() }}
```

Flow:

```text
AngularTopicsComponent
angularLearningTopic
        ↓
[learningTopic]
        ↓
TopicCardComponent
learningTopic = input.required<string>()
        ↓
learningTopic()
        ↓
display topic
```

## Quick Memory Rule

```text
signal()
→ create + change state

input()
→ receive value from parent

computed()
→ calculate value from signals
```

All three are read using `()`.
