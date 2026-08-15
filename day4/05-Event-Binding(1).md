# Event Binding

Event Binding lets **a user action in HTML run TypeScript code**.

Direction:

```text
HTML/User → TypeScript
```

---

# Where Do We Use Event Binding?

The event happens in:

```text
HTML (.html)
```

The method runs in:

```text
TypeScript (.ts)
```

Syntax:

```html
(event)="method()"
```

Flow:

```text
User action
    ↓
(event)
    ↓
TypeScript method
```

---

# Click Event

### HTML

```html
<button (click)="angularTopics()">
  Angular
</button>
```

### TypeScript

```typescript
angularTopics() {
  this.selectedTopic = "Angular";
}
```

Flow:

```text
User clicks Angular
        ↓
(click)
        ↓
angularTopics()
        ↓
selectedTopic changes
```

---

# `this.property`

```typescript
this.selectedTopic
```

means:

```text
selectedTopic property
belonging to this component
```

Example:

```typescript
selectedTopic = "";

angularTopics() {
  this.selectedTopic = "Angular";
}
```

---

# State Change + HTML Update

If HTML contains:

```html
<p>{{ selectedTopic }}</p>
```

then:

```text
Click Angular
      ↓
method runs
      ↓
this.selectedTopic = "Angular"
      ↓
{{ selectedTopic }}
      ↓
Angular appears
```

---

# `$event`

Angular can pass information about the browser event:

```html
<input (input)="onInput($event)">
```

```text
$event
→ information about the event that happened
```

We will use event details more when a requirement needs them.

---

# Keyboard Event

Example:

```html
<input (keyup)="onKeyUp()">
```

This runs the method when the user releases a key.

---

# Learning Hub Connection

```html
<button (click)="angularTopics()">Angular</button>
```

gave us:

```text
Click button
→ change selectedTopic
```

Template Control Flow can then use that value to decide what content appears.

---

# Cheat Sheet

```text
(event)="method()"
→ HTML/User → TypeScript

(click)
→ mouse click

$event
→ event information

this.property
→ current component property
```
