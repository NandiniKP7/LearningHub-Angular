# Day 7 — Practical Implementation: Parent → Child with `input()`

## Before Today

`AngularTopicsComponent` already had:

```text
Angular image + title
topics[]
@for
$index
compact numbered topic buttons
```

The parent component was handling both the topic data and the topic button UI.

---

# Today's Task

Create one reusable `TopicCardComponent`.

```text
AngularTopicsComponent
PARENT
      ↓
sends one topic
      ↓
TopicCardComponent
CHILD
      ↓
displays the topic button
```

The final UI should stay the same.

---

# New Component

Created:

```text
TopicCardComponent
```

Its responsibility is:

```text
Receive one topic
Display the topic
Own the topic button HTML/CSS
```

---

# Full `topic-card.component.ts`

```typescript
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-topic-card',
  imports: [],
  templateUrl: './topic-card.component.html',
  styleUrl: './topic-card.component.css',
})
export class TopicCard {

  // ⭐ DAY 7 — RECEIVE DATA FROM PARENT
  topic = input.required<string>();
}
```

---

# Full `topic-card.component.html`

```html
<!-- ⭐ DAY 7 — REUSABLE CHILD UI -->

<button class="topic-card">
  <span>{{ topic() }}</span>
</button>
```

---

# Important Learning Point — `topic()`

We initially used:

```html
{{ topic }}
```

But `input()` creates a signal input.

So the value is read using:

```html
{{ topic() }}
```

Remember:

```text
input()
→ signal input

topic()
→ read its value
```

---

# Full `topic-card.component.css`

```css
:host {
  display: block;
  width: 100%;
}

.topic-card {
  width: 100%;
  padding: 10px 14px;

  display: flex;
  align-items: center;

  border: 1px solid #dddddd;
  border-radius: 8px;

  background: white;

  text-align: left;
  font-size: 15px;

  cursor: pointer;
}

.topic-card:hover {
  background: #f7f7f7;
}
```

---

# Updated `angular-topics.component.html`

```html
<section class="topics-section">

  <div class="topics-header">
    <img
      class="angular-logo"
      [src]="imageUrl"
      alt="Angular logo">

    <h1>{{ title }}</h1>
  </div>

  <div class="topics-list">

    @for (topic of topics; track topic; let i = $index) {

      <div class="topic-row">

        <span class="topic-number">
          {{ i + 1 }}
        </span>

        <!-- ⭐ DAY 7 — PARENT SENDS TOPIC TO CHILD -->
        <app-topic-card
          [topic]="topic">
        </app-topic-card>

      </div>

    } @empty {

      <p>No Angular topics available.</p>

    }

  </div>

</section>
```

---

# Important — Parent Sends / Child Receives

Parent:

```html
<app-topic-card [topic]="topic"></app-topic-card>
```

Child:

```typescript
topic = input.required<string>();
```

Connection:

```text
PARENT

[topic]="topic"
    ↓
    ↓ sends current topic
    ↓
CHILD

topic = input.required<string>()
    ↓
{{ topic() }}
```

---

# Updated `angular-topics.component.css`

```css
.topics-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.topics-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}

.angular-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.topics-header h1 {
  margin: 0;
  font-size: 28px;
}

.topics-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.topic-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.topic-number {
  width: 28px;
  height: 28px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: #f0f0f0;

  font-size: 13px;
  font-weight: 700;
}

app-topic-card {
  display: block;
  flex: 1;
  min-width: 0;
}
```

---

# CSS Fix We Learned

After moving the button into `TopicCardComponent`, its button CSS also needed to move into:

```text
topic-card.component.css
```

The parent controls:

```text
list layout
number
spacing
```

The child controls:

```text
topic button
button styling
```

This keeps the component reusable.

---

# Result

Before:

```text
AngularTopicsComponent
→ data + topic button UI
```

After:

```text
AngularTopicsComponent
PARENT
│
├── topics[]
├── @for
├── numbering
│
└── [topic]="topic"
          ↓
    TopicCardComponent
          CHILD
          │
          ├── input.required<string>()
          ├── {{ topic() }}
          └── button HTML/CSS
```

We now use **one reusable TopicCardComponent for all Angular topics**.
