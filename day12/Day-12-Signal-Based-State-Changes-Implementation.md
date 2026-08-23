# Day 12 — Signal-Based State Changes Implementation

## What We Built

Today we improved the Angular Learning Hub so each topic can expand and show its subtopics.

Example:

```text
1  Angular Application Setup & Architecture        ▼
   1.1 Angular CLI
   1.2 ng new / ng serve
   1.3 SPA startup flow
   ...

2  String Interpolation                            ▶
```

Each TopicCard keeps its own expand/collapse state.

---

# 1. Topic Data Moved to JSON

Instead of hard-coding Angular topics in the component TS file, we started using:

```text
angular-learning-topics.json
```

The JSON stores:

```json
{
  "id": 3,
  "title": "Components",
  "subTopics": [
    "@Component",
    "selector",
    "imports",
    "standalone components"
  ]
}
```

This lets the same data shape be useful later when we build API support.

---

# 2. Import JSON into AngularTopicsComponent

```typescript
import angularTopicsData from '../data/angular-learning-topics.json';
```

Then:

```typescript
angularLearningTopics = angularTopicsData.topics;
```

Meaning:

```text
JSON file
→ imported into TS
→ angularTopicsData
→ angularTopicsData.topics
→ angularLearningTopics
```

The old hard-coded string array is no longer needed.

---

# 3. Search Logic Updated for Object Data

Before, each topic was just a string.

Now each topic is an object.

So search changed from:

```typescript
topic.toLowerCase()
```

to:

```typescript
topic.title.toLowerCase()
```

Final search logic:

```typescript
searchText = signal('');

filteredAngularTopics = computed(() =>
  this.angularLearningTopics.filter((topic) => {
    return topic.title
      .toLowerCase()
      .includes(this.searchText().toLowerCase());
  })
);
```

---

# 4. AngularTopicsComponent Passes Topic + Subtopics

```html
<app-topic-card
  [learningTopicIndex]="i + 1"
  [learningTopic]="angularLearningTopic.title"
  [subTopics]="angularLearningTopic.subTopics"
  (selectedLearningTopic)="onTopicSelected($event)">
</app-topic-card>
```

Meaning:

```text
learningTopicIndex
→ topic number

learningTopic
→ topic title

subTopics
→ array of subtopics
```

---

# 5. TopicCardComponent Inputs

```typescript
learningTopic = input.required<string>();

learningTopicIndex = input.required<number>();

subTopics = input.required<string[]>();
```

So TopicCard receives:

```text
number
title
subtopic array
```

---

# 6. Expand / Collapse State

We added a local signal inside TopicCardComponent:

```typescript
isExpandable = signal(false);
```

Initial state:

```text
false
→ collapsed
→ ▶
```

Toggle method:

```typescript
toggleDetails() {
  this.isExpandable.update(current => !current);
}
```

Meaning:

```text
false → true
true  → false
```

This is a real use of:

```text
.update(current => ...)
```

because the new value depends on the current value.

---

# 7. TopicCard HTML

```html
<div class="topic-card-row">

  <button
    class="topic-card"
    (click)="onSelectedLearningTopic()">

    <span class="topic-number">
      {{ learningTopicIndex() }}
    </span>

    <span class="topic-title">
      {{ learningTopic() }}
    </span>

  </button>

  <button
    class="details-toggle"
    (click)="toggleDetails()">

    @if (isExpandable()) {
      ▼
    } @else {
      ▶
    }

  </button>

</div>
```

## HTML Explanation

```html
<div class="topic-card-row">
```

→ container that holds the topic button and arrow button on the same row.

```html
<button class="topic-card">
```

→ opens the actual topic notes.

```html
<button class="details-toggle">
```

→ only expands/collapses the subtopics.

```text
▶
→ collapsed

▼
→ expanded
```

---

# 8. Show Subtopics with `@if`

Under the topic row:

```html
@if (isExpandable()) {

  <div class="topic-details">

    @for (item of subTopics(); track item; let j = $index) {

      <p>
        {{ learningTopicIndex() }}.{{ j + 1 }} {{ item }}
      </p>

    }

  </div>

}
```

Meaning:

```text
isExpandable() = false
→ hide subtopics

isExpandable() = true
→ show subtopics
```

---

# 9. Subtopic Numbering

Main topic:

```text
1
```

Subtopic index:

```text
j = 0
```

Display:

```text
1.1
```

Then:

```text
1.2
1.3
1.4
```

For topic 2:

```text
2.1
2.2
2.3
```

Using:

```html
{{ learningTopicIndex() }}.{{ j + 1 }}
```

---

# 10. Multiple Topics Can Stay Expanded

Each TopicCard instance has its own:

```typescript
isExpandable = signal(false);
```

So:

```text
Topic 1 → true
Topic 2 → true
Topic 3 → false
```

is valid.

Expanding one topic does not collapse another topic.

This is component-local signal state.

---

# 11. TopicCard CSS

```css
/* Styles the outer <div class="topic-card-row">
   that contains the topic button + arrow button */
.topic-card-row {
  display: flex;               /* Put topic button and arrow button on the same row */
  align-items: center;         /* Vertically align both buttons */
  gap: 8px;                    /* Space between topic button and arrow */
  width: 100%;                 /* Use the full available row width */
}


/* Styles the main <button class="topic-card">
   that displays learningTopicIndex() + learningTopic() */
.topic-card {
  width: 100%;                 /* Use available width */
  flex: 1;                     /* Take remaining space beside arrow button */

  padding: 10px 14px;         /* Space inside button */

  display: flex;               /* Put index and topic text side-by-side */
  align-items: center;         /* Vertically align index and topic text */
  gap: 12px;                   /* Space between index and topic text */

  border: 1px solid #dddddd;   /* Light border around topic button */
  border-radius: 8px;          /* Rounded corners */

  background: white;           /* White background */

  text-align: left;            /* Keep topic text aligned left */
  font-size: 15px;             /* Topic text size */

  cursor: pointer;             /* Hand cursor when hovering */
}


/* Styles the <span class="topic-number">
   that displays learningTopicIndex() */
.topic-number {
  width: 28px;                 /* Width of number circle */
  height: 28px;                /* Height of number circle */

  display: flex;               /* Enables centering */
  align-items: center;         /* Center number vertically */
  justify-content: center;     /* Center number horizontally */

  flex-shrink: 0;              /* Prevent number circle from shrinking */

  border-radius: 50%;          /* Make background circular */
  background: #f0f0f0;         /* Light gray circle background */

  font-size: 13px;             /* Number text size */
  font-weight: 700;            /* Make number bold */
}


/* Styles the <span class="topic-title">
   that displays learningTopic() */
.topic-title {
  flex: 1;                     /* Topic text uses remaining space */
}


/* Styles the <button class="details-toggle">
   that displays ▶ or ▼ */
.details-toggle {
  width: 36px;                 /* Small fixed width for arrow button */
  height: 36px;                /* Small fixed height */

  flex-shrink: 0;              /* Prevent arrow button from shrinking */

  display: flex;               /* Enables centering */
  align-items: center;         /* Center arrow vertically */
  justify-content: center;     /* Center arrow horizontally */

  border: 1px solid #dddddd;   /* Light border */
  border-radius: 8px;          /* Rounded corners */

  background: white;           /* White background */

  cursor: pointer;             /* Hand cursor on hover */
}


/* Styles the main topic button when mouse is over it */
.topic-card:hover {
  background: #f7f7f7;         /* Slight gray background on hover */
}


/* Styles the arrow button when mouse is over it */
.details-toggle:hover {
  background: #f7f7f7;         /* Slight gray background on hover */
}


/* Styles the <div class="topic-details">
   that contains the expanded subtopics */
.topic-details {
  margin: 6px 44px 12px 44px;    /* Space outside + indent subtopics */
  padding: 10px 14px;             /* Space inside the details area */

  border-left: 3px solid #dddddd; /* Vertical line beside subtopics */
  background: #fafafa;             /* Light background */
  border-radius: 6px;              /* Slightly rounded corners */
}


/* Styles each <p> displaying subtopics like 1.1, 1.2, 1.3 */
.topic-details p {
  margin: 6px 0;                   /* Vertical space between subtopics */
  font-size: 14px;                 /* Smaller than the main topic title */
  line-height: 1.4;                /* Comfortable line spacing */
  font-weight: 400;                /* Normal text weight */
}
```

---

# 12. Complete Day 12 Flow

```text
JSON
↓
AngularTopicsComponent
↓
topic object
↓
title + subTopics[]
↓
TopicCardComponent inputs
↓
isExpandable signal
↓
user clicks ▶
↓
toggleDetails()
↓
.update(current => !current)
↓
false → true
↓
@if
↓
@for
↓
subtopics displayed
```

---

# Day 12 Main Learning

```text
signal(false)
→ local component state

.update(current => !current)
→ toggle state

@if
→ react to signal state

@for
→ display subtopic array
```

And an important architecture improvement:

```text
Before
→ topics hard-coded in AngularTopicsComponent TS

After
→ topics + subtopics come from JSON
```

This prepares the app for a later path:

```text
Local JSON
→ Models / Interfaces
→ Service
→ HTTP / API
→ same topic data shape
```
