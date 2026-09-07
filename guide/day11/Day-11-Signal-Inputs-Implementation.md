# Day 11 — Signal Inputs Implementation

## Before Today

`TopicCardComponent` already received one learning topic from `AngularTopicsComponent`.

```text
AngularTopicsComponent
      ↓
[learningTopic]
      ↓
TopicCardComponent
```

The topic card displayed:

```text
Components
Property Binding
Event Binding
...
```

---

# Today's Task

Pass **two values** from `AngularTopicsComponent` into `TopicCardComponent`:

```text
1. Learning topic text
2. Learning topic index
```

So each reusable topic card can display:

```text
1  Angular Application Setup & Architecture
2  String Interpolation
3  Components
...
```

---

# Full `topic-card.component.ts`

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {

  // PREVIOUS — receives topic text
  learningTopic = input.required<string>();

  // ⭐ DAY 11 — receives topic number
  learningTopicIndex = input.required<number>();

  selectedLearningTopic = output<string>();

  onSelectedLearningTopic() {
    this.selectedLearningTopic.emit(
      this.learningTopic()
    );
  }
}
```

---

# Full `topic-card.component.html`

```html
<button
  class="topic-card"
  (click)="onSelectedLearningTopic()">

  <!-- ⭐ DAY 11 — display topic index -->
  <span class="topic-number">
    {{ learningTopicIndex() }}
  </span>

  <!-- Existing topic text -->
  <span class="topic-title">
    {{ learningTopic() }}
  </span>

</button>
```

## HTML Used Today

```html
<span class="topic-number">
```

```text
<span>
→ small container for text

class="topic-number"
→ lets CSS style the index separately
```

```html
<span class="topic-title">
```

```text
→ separate container for the learning topic text
→ lets CSS style topic text independently
```

---

# Full `angular-topics.component.html`

```html
<section class="topics-section">

  <div class="topics-header">

    <img
      class="angular-logo"
      [src]="imageUrl"
      alt="Angular logo"
    />

    <h1>{{ title }}</h1>

    <input
      type="text"
      placeholder="Search Angular Topics"
      [value]="searchText()"
      (input)="onSearch($event)"
    />

  </div>

  <div class="topics-list">

    @for (
      angularLearningTopic of filteredAngularTopics();
      track angularLearningTopic;
      let i = $index
    ) {

      <div class="topic-row">

        <app-topic-card

          <!-- ⭐ DAY 11 — pass index to child -->
          [learningTopicIndex]="i + 1"

          [learningTopic]="angularLearningTopic"

          (selectedLearningTopic)="onTopicSelected($event)">
        </app-topic-card>

      </div>

    } @empty {

      <p>No Angular topics available.</p>

    }

  </div>

</section>
```

---

# Important — Why `i + 1`?

Angular `$index` starts from:

```text
0
1
2
3
```

We want the UI to display:

```text
1
2
3
4
```

So the parent passes:

```html
[learningTopicIndex]="i + 1"
```

Important:

```text
"i + 1"
→ Angular expression

Result
→ number
```

The quotes are HTML attribute syntax.

They do **not** make the result a string.

That is why this matches:

```typescript
learningTopicIndex = input.required<number>();
```

---

# Parent → Child Signal Inputs

The parent now passes:

```html
<app-topic-card
  [learningTopicIndex]="i + 1"
  [learningTopic]="angularLearningTopic">
</app-topic-card>
```

The child receives:

```typescript
learningTopicIndex = input.required<number>();
learningTopic = input.required<string>();
```

Flow:

```text
AngularTopicsComponent

i + 1
→ 3

angularLearningTopic
→ "Components"

        ↓

TopicCardComponent

learningTopicIndex()
→ 3

learningTopic()
→ "Components"
```

Result:

```text
3  Components
```

---

# Full `topic-card.component.css`

```css
/* Styles the <button> containing BOTH the topic index and learning topic text */
.topic-card {
  width: 100%;                 /* Make the button use the available width */

  padding: 10px 14px;         /* Space inside button: vertical 10px, horizontal 14px */

  display: flex;               /* Put index and learning topic next to each other */
  align-items: center;         /* Vertically align index and topic text */
  gap: 12px;                   /* Space between index and learning topic */

  border: 1px solid #dddddd;   /* Thin border around button */
  border-radius: 8px;          /* Round button corners */

  background: white;           /* White button background */

  text-align: left;            /* Keep learning topic text aligned left */
  font-size: 15px;             /* Topic text size */

  cursor: pointer;             /* Show hand cursor on hover */
}


/* Styles the <span> displaying learningTopicIndex() */
.topic-number {
  width: 28px;                 /* Width of index circle */
  height: 28px;                /* Height of index circle */

  display: flex;               /* Enables centering */
  align-items: center;         /* Center index vertically */
  justify-content: center;     /* Center index horizontally */

  flex-shrink: 0;              /* Prevent circle from shrinking */

  border-radius: 50%;          /* Make the index background circular */
  background: #f0f0f0;         /* Light gray index background */

  font-size: 13px;             /* Index text size */
  font-weight: 700;            /* Make index bold */
}


/* Styles the <span> displaying learningTopic() */
.topic-title {
  flex: 1;                     /* Topic text uses remaining button space */
}


/* Styles the topic <button> when the mouse is over it */
.topic-card:hover {
  background: #f7f7f7;         /* Slight background change on hover */
}
```

---

# What We Learned

```text
Signal Input 1
learningTopic
→ string
→ receives topic text

Signal Input 2
learningTopicIndex
→ number
→ receives topic sequence
```

Both are received by the child:

```typescript
learningTopic = input.required<string>();
learningTopicIndex = input.required<number>();
```

and read using:

```text
learningTopic()
learningTopicIndex()
```

---

# Result

Before:

```text
TopicCard
→ received only topic text
```

After:

```text
AngularTopicsComponent
        ↓
passes topic text + index
        ↓
TopicCardComponent
        ↓
receives both with Signal Inputs
        ↓
displays:

1  Angular Application Setup & Architecture
2  String Interpolation
3  Components
...
```

---

# Day 11 Main Memory Rule

```text
Parent has value
      ↓
[propertyBinding]
      ↓
Child receives with input()
      ↓
Child reads with ()
```

Example:

```text
i + 1
      ↓
[learningTopicIndex]
      ↓
input.required<number>()
      ↓
learningTopicIndex()
```
