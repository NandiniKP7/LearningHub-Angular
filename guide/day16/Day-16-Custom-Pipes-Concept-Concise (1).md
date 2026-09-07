# Day 16 — Custom Pipes

## What Is a Custom Pipe?

A custom pipe is a pipe **we create ourselves** when Angular's built-in pipes do not provide the display transformation we need.

```text
Built-in pipe → Angular provides it
Custom pipe   → we create it
```

## Why Use It?

Use a custom pipe when you want a **reusable display transformation**.

Example:

```text
Components
→ Topic: Components
```

## Create the Pipe With Angular CLI

Use Angular CLI instead of creating the pipe file manually.

```bash
ng generate pipe pipes/sub-topic-label
```

Short version:

```bash
ng g p pipes/sub-topic-label
```

Flow:

```text
CLI generates pipe
→ open generated pipe file
→ write transform()
→ import pipe into component
→ use pipe in HTML
```

## Basic Syntax

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topicLabel'
})
export class TopicLabelPipe implements PipeTransform {

  transform(value: string): string {
    return `Topic: ${value}`;
  }
}
```

Use it in HTML:

```html
{{ learningTopic() | topicLabel }}
```

## New Pieces to Remember

```text
@Pipe
→ tells Angular this class is a pipe

name: 'topicLabel'
→ name we use in HTML

PipeTransform
→ interface used by the pipe class

transform()
→ receives the original value
→ returns the display value
```

Example:

```text
learningTopic() → "Components"
        ↓
topicLabel
        ↓
"Topic: Components"
```

## Learning Hub Implementation

Your Learning Hub already uses the built-in pipe:

```html
{{ learningTopic() | titlecase }}
```

Today we will create **one useful custom pipe** and use it in the existing Learning Hub.

We will not duplicate `titlecase` or add unnecessary functionality.

## Memory Rule

```text
Built-in pipe
→ Angular provides the transformation

Custom pipe
→ we write our own reusable transformation

transform()
→ input value in
→ formatted display value out
```
