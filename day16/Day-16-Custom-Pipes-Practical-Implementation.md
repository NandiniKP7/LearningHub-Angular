# Day 16 — Custom Pipes
## Practical Implementation — Developer Learning Hub

## What We Implemented

We created a custom Angular pipe to format each Learning Hub subtopic with its topic number and subtopic number.

Example:

```text
Angular CLI
```

becomes:

```text
1.1 Angular CLI
```

For Topic 2:

```text
2.1 ...
2.2 ...
2.3 ...
```

---

## 1. Generate the Pipe With Angular CLI

```bash
ng generate pipe pipes/sub-topic-label
```

Short version:

```bash
ng g p pipes/sub-topic-label
```

Angular generated the starting pipe structure for us.

---

## 2. Generated Starting Code

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subTopicLabel',
})
export class SubTopicLabelPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
```

We then changed `transform()` to match the values our Learning Hub actually needs.

---

## 3. Define the `transform()` Inputs

Our pipe needs three values:

```text
value
→ subtopic text
→ string

topicNumber
→ main topic number
→ number

subTopicNumber
→ subtopic number
→ number
```

So the method becomes:

```typescript
transform(
  value: string,
  topicNumber: number,
  subTopicNumber: number
): string {

}
```

The final `: string` means the pipe returns a string.

---

## 4. Build the Display Label

The first working approach was string concatenation:

```typescript
return topicNumber + "." + subTopicNumber + " " + value;
```

A cleaner version uses a template literal:

```typescript
return `${topicNumber}.${subTopicNumber} ${value}`;
```

Example:

```text
topicNumber    = 1
subTopicNumber = 2
value          = "Angular CLI"

Result:
1.2 Angular CLI
```

---

## 5. Final Custom Pipe

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subTopicLabel',
})
export class SubTopicLabelPipe implements PipeTransform {

  transform(
    value: string,
    topicNumber: number,
    subTopicNumber: number
  ): string {
    return `${topicNumber}.${subTopicNumber} ${value}`;
  }
}
```

---

## 6. Import the Custom Pipe Into `TopicCard`

In `topic-card.component.ts`:

```typescript
import { SubTopicLabelPipe } from '../pipes/sub-topic-label.pipe';
```

Add it to the component imports:

```typescript
@Component({
  ...
  imports: [TitleCasePipe, SubTopicLabelPipe],
})
```

Now the `TopicCard` template can use:

```text
subTopicLabel
```

---

## 7. Use the Pipe in the Subtopic Loop

The existing subtopics come from:

```typescript
subTopics()
```

We also need the subtopic index:

```html
@for (item of subTopics(); track item; let j = $index) {
  <p>
    {{ item | subTopicLabel:learningTopicIndex():(j + 1) }}
  </p>
}
```

---

## 8. What Is Passed Into the Pipe?

For:

```html
{{ item | subTopicLabel:learningTopicIndex():(j + 1) }}
```

Angular passes:

```text
item
→ value
→ "Angular CLI"

learningTopicIndex()
→ topicNumber
→ 1

j + 1
→ subTopicNumber
→ 1
```

The pipe returns:

```text
1.1 Angular CLI
```

---

## 9. Why Do We Need Both Numbers?

`learningTopicIndex()` gives the **main topic number**.

```text
Topic 1 → 1
Topic 2 → 2
Topic 3 → 3
```

`j` is `$index` for the current subtopic.

Because `$index` starts at `0`:

```text
j = 0 → j + 1 = 1
j = 1 → j + 1 = 2
j = 2 → j + 1 = 3
```

Together:

```text
learningTopicIndex() + "." + (j + 1)

1 + "." + 1 → 1.1
1 + "." + 2 → 1.2

2 + "." + 1 → 2.1
2 + "." + 2 → 2.2
```

---

## 10. Data Was Not Changed

The JSON still contains the original subtopic:

```text
Angular CLI
```

The custom pipe only changes what is displayed:

```text
JSON
→ "Angular CLI"

Custom pipe
→ "1.1 Angular CLI"

Displayed HTML
→ 1.1 Angular CLI
```

---

# Complete Day 16 Flow

```text
JSON subtopic
      ↓
subTopics()
      ↓
@for
      ↓
item + learningTopicIndex() + j + 1
      ↓
SubTopicLabelPipe
      ↓
transform()
      ↓
"1.1 Angular CLI"
      ↓
display in HTML
```

---

# Day 16 Main Learning

```text
ng g p
→ generate a pipe

@Pipe
→ defines an Angular pipe

PipeTransform
→ pipe contract

transform()
→ receives values and returns formatted text

item
→ subtopic text

learningTopicIndex()
→ main topic number

j + 1
→ subtopic number
```

## Main Memory Rule

```text
Custom Pipe
→ reusable display transformation we create ourselves

value + arguments
        ↓
transform()
        ↓
formatted display value
```
