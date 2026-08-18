# Learning Hub — Component Architecture Review

## App

```text
App
→ owns which technology is selected
→ owns which learning topic notes should currently be displayed
```

### TypeScript

```typescript
selectedTechnology = "";
selectedLearningTopicNotes = "";
```

### HTML

```html
<app-angular-topics
  (selectedLearningTopic)="selectedLearningTopicNotes = $event">
</app-angular-topics>

<app-topic-notes
  [topicNotes]="selectedLearningTopicNotes">
</app-topic-notes>
```

---

## AngularTopicsComponent

```text
AngularTopicsComponent
→ owns the Angular topics[]
→ uses TopicCardComponent to display each topic
→ receives the clicked learning topic from TopicCardComponent through output()
→ sends that selected learning topic upward to App through another output()
```

### TypeScript

```typescript
selectedLearningTopic = output<string>();

onTopicSelected(topic: string) {
  this.selectedLearningTopic.emit(topic);
}
```

### HTML

```html
<app-topic-card
  [learningTopic]="topic"
  (selectedLearningTopic)="onTopicSelected($event)">
</app-topic-card>
```

---

## TopicCardComponent

```text
TopicCardComponent
→ receives ONE learning topic from AngularTopicsComponent using input()
→ displays the reusable topic button
→ when clicked, emits that learning topic using output()
```

### TypeScript

```typescript
learningTopic = input.required<string>();

selectedLearningTopic = output<string>();

onSelectedLearningTopic() {
  this.selectedLearningTopic.emit(this.learningTopic());
}
```

### HTML

```html
<button (click)="onSelectedLearningTopic()">
  {{ learningTopic() }}
</button>
```

---

## TopicNotesComponent

```text
TopicNotesComponent
→ receives the selected learning topic from App using input()
→ displays the notes area for that selected topic
```

### TypeScript

```typescript
topicNotes = input.required<string>();
```

### HTML

```html
<h1>{{ topicNotes() }}</h1>
```

---

# Complete Communication Flow

```text
App
  ↓
AngularTopicsComponent
  ↓ input()
TopicCardComponent
  ↑ output()
AngularTopicsComponent
  ↑ output()
App
  ↓ input()
TopicNotesComponent
```

## Quick Memory Rule

```text
input()
→ Parent → Child

output()
→ Child → Parent

emit()
→ sends the value

$event
→ receives the emitted value
```
