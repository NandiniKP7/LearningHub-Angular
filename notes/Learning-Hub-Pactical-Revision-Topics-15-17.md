# Practical Implementation Guide — Topics 15–17

**Developer Learning Hub**  
**Topics covered:**  
- Topic 15 — TypeScript Models / Interfaces in Angular
- Topic 16 — Angular Pipes
- Topic 17 — Custom Pipes

**Goal:** Apply all three concepts to the existing Learning Hub without introducing unrelated features.

---

# What You Will Change

By the end of this practical implementation:

```text
JSON topic data
      ↓
LearningTopic interface
      ↓
typed LearningTopic[]
      ↓
parent passes one LearningTopic object
      ↓
TopicCard receives input.required<LearningTopic>()
      ↓
built-in TitleCasePipe formats the topic title
      ↓
custom SubTopicLabelPipe formats subtopic numbering
```

You are not adding a new page or new application feature.

You are improving the **typing and display structure** of the topic cards you already have.

---

# Files Involved

You will work with these files:

```text
src/app/
│
├── models/
│   └── learning-topic.model.ts        ← NEW
│
├── pipes/
│   └── sub-topic-label.pipe.ts        ← NEW
│
├── topic-card/
│   ├── topic-card.component.ts
│   └── topic-card.component.html
│
└── angular-topics/
    ├── angular-topics.component.ts
    └── angular-topics.component.html
```

Your exact component folder names may differ slightly.  
Use the equivalent files in your project.

---

# Part 1 — Topic 15: Add a `LearningTopic` Model

Your current JSON topic objects contain data similar to:

```json
{
  "id": 1,
  "slug": "angular-application-setup-architecture",
  "title": "Angular Application Setup & Architecture",
  "plannedLearningTime": "1–2 days",
  "subTopics": [
    "Angular CLI",
    "ng new / ng serve"
  ],
  "category": "core-angular"
}
```

Create one TypeScript interface that describes this object shape.

---

## Step 1 — Create the model file

Create:

```text
src/app/models/learning-topic.model.ts
```

Use this model:

```ts
export interface LearningTopic {
  readonly id: number;
  slug: string;
  title: string;
  plannedLearningTime: string | null;
  subTopics: string[];
  category: string;
}
```

### What this gives you

```text
readonly id
→ topic ID should not be reassigned

slug
→ required string

title
→ required string

plannedLearningTime
→ required property
→ value can be string or null

subTopics
→ array of strings

category
→ required string
```

For this current JSON shape, we do not need an optional property yet.

Do not add one just to demonstrate `?`.

The interface should describe the **real data you currently have**.

---

# Part 2 — Type the Parent Component Data

Find the component that loads:

```ts
angularTopicsData.topics
```

Import the model:

```ts
import { LearningTopic } from '../models/learning-topic.model';
```

Adjust the path if your folder structure is different.

Then type the topic array:

```ts
angularLearningTopics: LearningTopic[] =
  angularTopicsData.topics;
```

The important new part is:

```ts
: LearningTopic[]
```

Now TypeScript understands:

```text
angularLearningTopics
→ array

each item
→ LearningTopic
```

---

# Part 3 — Keep the Existing Search Typed

You already have signal-based search from the earlier topics.

Your computed value should continue working with the object structure.

Example:

```ts
filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter(topic =>
    topic.title
      .toLowerCase()
      .includes(this.searchText().toLowerCase())
  )
);
```

Notice:

```ts
topic.title
```

Because:

```text
topic
→ LearningTopic

title
→ known string property
```

Do not change this back to:

```ts
topic.toLowerCase()
```

because `topic` is now an object.

---

# Part 4 — Pass the Whole Topic Object to `TopicCard`

Previously, the parent may have passed several separate values:

```html
[learningTopic]="topic.title"
[subTopics]="topic.subTopics"
[learningTopicIndex]="i + 1"
```

For this implementation, simplify the data flow.

Pass the entire `LearningTopic` object.

## Parent template

Target structure:

```html
@for (
  angularLearningTopic of filteredAngularTopics();
  track angularLearningTopic.id;
  let i = $index
) {
  <app-topic-card
    [learningTopic]="angularLearningTopic"
    [learningTopicIndex]="i + 1">
  </app-topic-card>
}
```

Now the parent passes:

```text
learningTopic
→ one complete LearningTopic object

learningTopicIndex
→ display number
```

This gives the child access to:

```text
learningTopic().title
learningTopic().subTopics
learningTopic().category
learningTopic().plannedLearningTime
learningTopic().id
```

without creating a separate input for every field.

---

# Part 5 — Update the Child Input Type

Open:

```text
topic-card.component.ts
```

Import:

```ts
import { LearningTopic } from '../models/learning-topic.model';
```

Then replace the string-based topic input with:

```ts
learningTopic = input.required<LearningTopic>();
```

Keep:

```ts
learningTopicIndex = input.required<number>();
```

Your relevant input section should now look like:

```ts
learningTopic = input.required<LearningTopic>();
learningTopicIndex = input.required<number>();
```

You no longer need a separate:

```ts
subTopics = input.required<string[]>();
```

because subtopics are already inside:

```ts
learningTopic().subTopics
```

---

# Part 6 — Update Existing Child References

Anywhere you previously used:

```ts
learningTopic()
```

as though it were a string, update it to the property you actually need.

For the title:

```ts
learningTopic().title
```

For the subtopics:

```ts
learningTopic().subTopics
```

For planned learning time:

```ts
learningTopic().plannedLearningTime
```

This is the practical difference between:

```ts
input.required<string>()
```

and:

```ts
input.required<LearningTopic>()
```

The second input contains the entire typed object.

---

# Part 7 — Topic 16: Add a Built-In Pipe

Now apply a built-in Angular pipe to the topic title.

Use:

```ts
TitleCasePipe
```

Import it in:

```text
topic-card.component.ts
```

```ts
import { TitleCasePipe } from '@angular/common';
```

Then add it to the standalone component imports:

```ts
@Component({
  ...
  imports: [
    TitleCasePipe
  ],
  ...
})
```

If your component already has imports, add `TitleCasePipe` to the existing array rather than replacing them.

---

# Part 8 — Use `titlecase` in the Template

Change the title display to:

```html
<h2>
  {{ learningTopic().title | titlecase }}
</h2>
```

The data itself remains:

```text
Angular Application Setup & Architecture
```

The pipe only controls what is rendered.

Do **not** apply `titlecase` automatically to the subtopics.

Subtopics can contain technical text such as:

```text
ng serve
app.component.ts
input()
@Component
```

Those values should remain exactly as written.

---

# Part 9 — Topic 17: Create a Custom Pipe

Now create a custom pipe for subtopic labels.

Goal:

Instead of:

```text
Angular CLI
ng new / ng serve
```

display:

```text
1.1 Angular CLI
1.2 ng new / ng serve
```

The numbering should be generated for display.

Do not modify the JSON strings.

---

# Part 10 — Create `SubTopicLabelPipe`

Create:

```text
src/app/pipes/sub-topic-label.pipe.ts
```

Use:

```ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subTopicLabel',
  standalone: true
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

This custom pipe receives:

```text
value
→ actual subtopic text

topicNumber
→ parent topic number

subTopicNumber
→ current subtopic number
```

Example input:

```text
value          = "Angular CLI"
topicNumber    = 1
subTopicNumber = 1
```

Output:

```text
1.1 Angular CLI
```

---

# Part 11 — Import the Custom Pipe

Back in:

```text
topic-card.component.ts
```

import:

```ts
import { SubTopicLabelPipe } from '../pipes/sub-topic-label.pipe';
```

Then add it to the component imports.

Your imports array should contain both pipes:

```ts
imports: [
  TitleCasePipe,
  SubTopicLabelPipe
]
```

Keep any other imports your component already requires.

---

# Part 12 — Use the Custom Pipe in the Subtopic Loop

Your subtopic loop should now read from the model:

```ts
learningTopic().subTopics
```

Example target template:

```html
@if (isExpandable()) {
  <div>
    <h3>Subtopics</h3>

    @for (
      subTopic of learningTopic().subTopics;
      track $index;
      let j = $index
    ) {
      <p>
        {{
          subTopic
            | subTopicLabel:learningTopicIndex():(j + 1)
        }}
      </p>
    }
  </div>
}
```

Break down:

```text
subTopic
→ value sent into the custom pipe

learningTopicIndex()
→ first argument

j + 1
→ second argument
```

That maps to:

```ts
transform(
  value,
  topicNumber,
  subTopicNumber
)
```

---

# Part 13 — Keep Existing Expand/Collapse State

Do not rewrite your signal-based expansion logic.

Keep the existing pattern:

```ts
isExpandable = signal(false);
```

and:

```ts
toggleDetails(): void {
  this.isExpandable.update(current => !current);
}
```

This practical implementation is about:

```text
models
built-in pipes
custom pipes
```

not rebuilding previous signal behavior.

---

# Suggested Final `TopicCard` Shape

Your component should conceptually contain:

```ts
import { Component, input, signal } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { LearningTopic } from '../models/learning-topic.model';
import { SubTopicLabelPipe } from '../pipes/sub-topic-label.pipe';

@Component({
  selector: 'app-topic-card',
  imports: [
    TitleCasePipe,
    SubTopicLabelPipe
  ],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css'
})
export class TopicCardComponent {

  learningTopic = input.required<LearningTopic>();
  learningTopicIndex = input.required<number>();

  isExpandable = signal(false);

  toggleDetails(): void {
    this.isExpandable.update(current => !current);
  }
}
```

If your real component currently contains outputs, methods, or other imports, **keep them**.

Do not replace the entire file blindly.

Merge only the changes required for Topics 15–17.

---

# Suggested Final Template Shape

Your existing card design may have more HTML/CSS.

The important target structure is:

```html
<article>

  <h2>
    {{ learningTopicIndex() }}.
    {{ learningTopic().title | titlecase }}
  </h2>

  @if (learningTopic().plannedLearningTime) {
    <p>
      Planned learning time:
      {{ learningTopic().plannedLearningTime }}
    </p>
  }

  <button
    type="button"
    (click)="toggleDetails()">
    @if (isExpandable()) {
      Hide details
    } @else {
      Show details
    }
  </button>

  @if (isExpandable()) {

    <div>
      <h3>Subtopics</h3>

      @for (
        subTopic of learningTopic().subTopics;
        track $index;
        let j = $index
      ) {
        <p>
          {{
            subTopic
              | subTopicLabel:learningTopicIndex():(j + 1)
          }}
        </p>
      }
    </div>

  }

</article>
```

Again, preserve your existing styling and unrelated markup.

The purpose here is to show the required Angular connections clearly.

---

# What Changed by Topic?

## Topic 15 — Models / Interfaces

You added:

```text
LearningTopic interface
```

and changed:

```text
untyped/inferred topic array
→ LearningTopic[]

separate string/subtopic inputs
→ one input.required<LearningTopic>()
```

Now TypeScript knows the full topic shape.

---

## Topic 16 — Built-In Pipes

You added:

```ts
TitleCasePipe
```

and used:

```html
{{ learningTopic().title | titlecase }}
```

This changes only the displayed title.

It does not modify the JSON data.

---

## Topic 17 — Custom Pipes

You created:

```ts
SubTopicLabelPipe
```

and used:

```html
{{
  subTopic
    | subTopicLabel:learningTopicIndex():(j + 1)
}}
```

This creates display numbering without changing the original subtopic strings.

---

# Final Data Flow

You should be able to explain this entire flow after implementation:

```text
angular-learning-topics.json
        ↓
raw topic objects
        ↓
LearningTopic interface describes shape
        ↓
angularLearningTopics: LearningTopic[]
        ↓
computed search returns LearningTopic objects
        ↓
@for gives one LearningTopic
        ↓
[parent]
[learningTopic]="angularLearningTopic"
        ↓
TopicCard
input.required<LearningTopic>()
        ↓
learningTopic().title
        ↓
TitleCasePipe
        ↓
formatted title shown
```

And for subtopics:

```text
learningTopic().subTopics
        ↓
@for
        ↓
one subTopic string
        ↓
SubTopicLabelPipe
        ↓
topic number + subtopic number + text
        ↓
1.1 Angular CLI
```

---

# Do Not Change These Things

For this revision, do not:

```text
❌ move JSON to a service
❌ add HTTP/API calls
❌ add new routing
❌ rewrite search
❌ rewrite signals
❌ change subtopic strings in JSON
❌ create a custom pipe for something Angular already handles well
❌ use any
```

Those changes would introduce unrelated concepts.

---

# Verification Checklist

After implementation, verify:

```text
□ Application compiles

□ Topic list still appears

□ Search still works

□ Expand/collapse still works independently per card

□ LearningTopic interface matches current JSON shape

□ angularLearningTopics is LearningTopic[]

□ TopicCard receives LearningTopic rather than separate title/subtopic data

□ Topic title uses TitleCasePipe

□ Technical subtopics are not title-cased

□ SubTopicLabelPipe is standalone

□ SubTopicLabelPipe implements PipeTransform

□ transform() has typed parameters and typed return value

□ Custom pipe accepts topic number and subtopic number as arguments

□ Subtopics display as 1.1, 1.2, 2.1, etc.

□ Original JSON data remains unchanged

□ No any was introduced
```

---

# What I Want You to Submit for Review

When you finish, send these files:

```text
1. learning-topic.model.ts

2. angular-topics.component.ts
   or whichever parent component owns the topic array

3. angular-topics.component.html
   or its equivalent parent template

4. topic-card.component.ts

5. topic-card.component.html

6. sub-topic-label.pipe.ts
```

You do not need to send unchanged CSS unless the implementation required CSS changes.

---

# Review Questions for After Coding

Do not answer these before implementing.

1. Why did we change the child input from:

```ts
input.required<string>()
```

to:

```ts
input.required<LearningTopic>()
```

2. Why is `LearningTopic[]` used in the parent?

3. Why is `TitleCasePipe` imported into the standalone component?

4. Does `titlecase` modify the original JSON title?

5. In:

```html
subTopic
  | subTopicLabel:learningTopicIndex():(j + 1)
```

which value becomes the first parameter of `transform()`?

6. What do the two values after `:` become?

7. Why did we leave technical subtopic strings unchanged?

8. Why is numbering implemented in a pipe rather than saved into the JSON?

9. What previous signal behavior did we deliberately leave unchanged?

10. Trace one topic from JSON → model → parent → child → template.
