# Day 19 — Sharing Data / State with Services
## Concept README

## What problem does this solve?

Sometimes two components need the same changing value.

```text
Component A → updates selectedItem
Service     → stores selectedItem
Component B → reads selectedItem
```

If only one component needs the value, keep the signal in that component.

If multiple components need the same value, a service can own the signal.

---

# Approach A — Public Writable Signal

In this approach, the service stores one normal writable signal.

## ItemService

```ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // Public writable signal: components can read it with ()
  // and directly change it with .set() or .update().
  selectedItem = signal('');
}
```

## Component A — Updates `selectedItem`

```ts
export class ComponentA {
  itemService = inject(ItemService);

  // Receives the item clicked in HTML and directly updates the service signal.
  selectItem(item: string) {
    this.itemService.selectedItem.set(item);
  }
}
```

```html
<!-- Passes the clicked item to selectItem(). -->
<button (click)="selectItem('Item A')">Item A</button>
<button (click)="selectItem('Item B')">Item B</button>
```

## Component B — Reads `selectedItem`

```ts
export class ComponentB {
  // Gets the same ItemService used by Component A.
  itemService = inject(ItemService);
}
```

```html
<!-- Reads the latest selectedItem stored in ItemService. -->
<p>{{ itemService.selectedItem() }}</p>
```

### Flow

```text
User clicks Item A
→ Component A receives "Item A"
→ Component A directly calls selectedItem.set("Item A")
→ ItemService stores "Item A"
→ Component B reads selectedItem()
```

### Important

Because `selectedItem` is public and writable, any component using `ItemService` can both read and directly update it.

---

# Approach B — Private Writable + Public Readonly

In this approach, the service still stores the value, but only the service directly writes to its signal.

## ItemService

```ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // Private writable signal. Starts empty.
  // Only ItemService can directly access and change this signal.
  private selectedItemSignal = signal('');

  // Public readonly signal.
  // Components can read selectedItem(), but cannot call .set() or .update().
  selectedItem = this.selectedItemSignal.asReadonly();

  // Component A passes the clicked item to this method.
  // ItemService then updates its private writable signal.
  selectItem(item: string) {
    this.selectedItemSignal.set(item);
  }
}
```

## Component A — Passes the clicked item to the service

```ts
export class ComponentA {
  itemService = inject(ItemService);

  // Receives the item from HTML and passes it to ItemService.
  selectItem(item: string) {
    this.itemService.selectItem(item);
  }
}
```

```html
<!-- The clicked value is passed into Component A's selectItem(item). -->
<button (click)="selectItem('Item A')">Item A</button>
<button (click)="selectItem('Item B')">Item B</button>
```

## Component B — Reads `selectedItem`

```ts
export class ComponentB {
  // Gets the same ItemService and can read its public readonly signal.
  itemService = inject(ItemService);
}
```

```html
<!-- Reads the latest selectedItem. -->
<p>{{ itemService.selectedItem() }}</p>
```

### Flow

```text
User clicks Item A
→ Component A receives "Item A"
→ Component A calls itemService.selectItem("Item A")
→ ItemService receives "Item A"
→ ItemService updates private selectedItemSignal
→ public selectedItem now gives the new value
→ Component B reads selectedItem()
```

### Important

`readonly` does NOT mean the value can never change.

```text
Component → cannot directly write selectedItem
Service   → can update its private selectedItemSignal
Component → reads the updated selectedItem
```

---

# Approach A vs Approach B

```text
Approach A
→ Service has public writable selectedItem
→ Component A directly writes selectedItem
→ Component B reads selectedItem

Approach B
→ Service has private writable selectedItemSignal
→ Service exposes public readonly selectedItem
→ Component A passes new value through selectItem()
→ Service performs the write
→ Component B reads selectedItem
```

For our Learning Hub, we will use **Approach B**.

---

# Local State vs Shared Service State

```ts
searchText = signal('');
```

If only one component needs `searchText`, keep it in that component.

If Component A and Component B both need the same `selectedItem`, the service can own it.

```text
One component needs the value
→ local component state

Multiple components need the same value
→ shared service state
```

---

# Avoid Duplicated State

Suppose we need to know both:

```text
selectedItem
hasSelectedItem
```

Do not create two writable signals if one value can be calculated from the other.

Avoid:

```ts
selectedItem = signal('');
hasSelectedItem = signal(false);
```

They could become inconsistent.

Instead, store the real value and derive the second value.

---

# `computed()` State in a Service

```ts
import { computed } from '@angular/core';

export class ItemService {
  // Real stored state.
  private selectedItemSignal = signal('');

  // Public readonly version of the stored state.
  selectedItem = this.selectedItemSignal.asReadonly();

  // Derived state: automatically recalculates when selectedItemSignal changes.
  hasSelectedItem = computed(() =>
    this.selectedItemSignal() !== ''
  );

  // Updates the real stored state.
  selectItem(item: string) {
    this.selectedItemSignal.set(item);
  }
}
```

```text
selectedItemSignal = ""
→ hasSelectedItem() = false

selectedItemSignal = "Item A"
→ hasSelectedItem() = true
```

**Rule:** Store the source state. Use `computed()` for values that can be calculated from it.

---

# Learning Hub Connection

We will apply this shared-service-state pattern to the Developer Learning Hub during the **Practical Implementation**.

---

# `input()` / `output()` vs Service State

For direct parent/child communication:

```text
Parent → input() → Child
Parent ← output() ← Child
```

When multiple components need the same value from one shared place:

```text
Component A → Service ← Component B
```

A service does not replace every `input()` or `output()`.

---

# No New CLI Command

We already have `TopicService`, so no new service needs to be generated.

For reference, creating a service would use:

```bash
ng g s services/topic
```

---

# Roadmap Check

The Day 19 / Sharing Data & State with Services roadmap requires:

- [x] **shared state ownership** — service owns the value needed by multiple components
- [x] **signals in services** — `selectedItem` / `selectedTopic`
- [x] **private writable / public readonly pattern** — `selectedItemSignal` + `asReadonly()`
- [x] **computed service state** — `hasSelectedItem` / `hasSelectedTopic`
- [x] **local vs shared state** — component signal vs service signal
- [x] **avoid duplicated state** — derive boolean state with `computed()` instead of storing another writable signal

---

# Main Memory Rule

```text
Approach A
→ public writable service signal
→ components can directly read/write

Approach B
→ private writable service signal
→ public readonly signal
→ component passes new value to service method
→ service performs the write

Our Learning Hub
→ AngularTopicsComponent handles the click
→ TopicService stores/updates selectedTopic
→ TopicNotesComponent reads selectedTopic
```
