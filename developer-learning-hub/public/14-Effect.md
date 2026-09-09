# 14 — effect()
**Revision date:** September 9, 2026
**Planned learning time:** 1–2 days


## Overview — when a change should trigger an action

A computed signal answers a question. An effect performs an action.

Suppose a search box contains `"angular"`. Calculating the matching topics is derived state, so `computed()` is appropriate. Saving the search text to browser storage is different: it synchronizes the value with something outside Angular's reactive state.

```ts
searchText = signal('');

saveSearchText = effect(() => {
  localStorage.setItem('searchText', this.searchText());
});
```

The effect reads `searchText()`. Angular tracks that dependency and schedules the effect when the value changes. The effect does not store a new value; it performs the storage action.

This topic explains when effects run, what dependencies they track, how to use them for logging and external synchronization, how cleanup works, and why computed is usually the better choice for calculated values.


## 1. Basic syntax
```ts
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-preferences',
  template: `<p>{{ theme() }}</p>`
})
export class Preferences {
  theme = signal('light');

  logTheme = effect(() => {
    console.log('Theme:', this.theme());
  });
}
```
effect registers a reactive callback. The callback reads theme(), so Angular tracks that signal.

Effects run at least once and rerun when tracked dependencies change. Angular schedules execution as part of its reactive/change-detection process. Do not assume an effect runs synchronously inside set() or exactly once for every intermediate value.

## 2. Dependency tracking
```ts
firstName = signal('John');
lastName = signal('Smith');

logName = effect(() => {
  console.log(this.firstName(), this.lastName());
});
```
Both signals are tracked because both are read.

### Dynamic dependencies
```ts
showDetails = signal(false);
details = signal('Extra information');

logDetails = effect(() => {
  if (this.showDetails()) {
    console.log(this.details());
  }
});
```
When showDetails is false, details is not read and is not tracked by that execution. When true, details becomes a dependency.

## 3. Side effects
Examples include console logging, localStorage synchronization, integration with a non-reactive chart/browser API, and external work requiring cleanup. Do not use an effect merely because a value changes; ask whether an external action is needed.

## 4. Complete localStorage example
```ts
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-search-preference',
  templateUrl: './search-preference.html'
})
export class SearchPreference {
  searchText = signal(
    localStorage.getItem('searchText') ?? ''
  );

  saveSearchText = effect(() => {
    localStorage.setItem('searchText', this.searchText());
  });

  onSearch(event: Event) {
    this.searchText.set(
      (event.target as HTMLInputElement).value
    );
  }
}
```
```html
<input
  [value]="searchText()"
  (input)="onSearch($event)"
  placeholder="Search"
/>
```
The initial signal reads the saved value. ?? '' supplies an empty string when storage returns null or undefined. Typing updates the signal; the effect synchronizes it to storage. Refreshing can restore the saved text.

The fixed key identifies the storage entry. The second argument is the current signal value.

This example assumes browser execution and available storage. Server-rendered apps or restricted browsers need appropriate guards and error handling. Do not store passwords or sensitive secrets in localStorage.

## 5. computed vs effect
```ts
price = signal(100);
quantity = signal(2);
total = computed(() => this.price() * this.quantity());
```
Computed returns a derived value. It is lazy, memoized, and read-only.

```ts
logTotal = effect(() => {
  console.log(this.total());
});
```
Effect performs an action. It does not produce a derived signal value.

Memory: Need a value → computed. Need external synchronization → effect.

## 6. When not to use effect
Avoid copying derived state:
```ts
// Avoid
total = signal(0);

syncTotal = effect(() => {
  this.total.set(this.price() * this.quantity());
});
```
Use:
```ts
total = computed(() => this.price() * this.quantity());
```
Do not use effects for ordinary event-driven actions when a direct handler is simpler. Avoid chains of effects propagating changes through writable signals; they can introduce cycles, unnecessary reruns, and synchronization bugs.

## 7. Cleanup basics
Some effects start work that must be stopped, such as a timer or subscription. Angular supplies an onCleanup callback:
```ts
import { effect, signal } from '@angular/core';

query = signal('');

searchEffect = effect((onCleanup) => {
  const currentQuery = this.query();

  const timer = setTimeout(() => {
    console.log('Search for:', currentQuery);
  }, 300);

  onCleanup(() => {
    clearTimeout(timer);
  });
});
```
This is an illustrative debounce example. Before the effect reruns or is destroyed, Angular invokes the registered cleanup. The cleanup cancels the previous timer so outdated work does not continue.

The callback parameter is supplied by Angular. Register cleanup with onCleanup(() => { ... }).

## 8. Lifetime and injection context
Effects normally need an Angular injection context, such as a component constructor or field initializer. A component-created effect is automatically destroyed with its component.

For explicit control, Angular returns an EffectRef:
```ts
import { EffectRef, effect } from '@angular/core';

private readonly logRef: EffectRef = effect(() => {
  console.log(this.theme());
});

stopLogging() {
  this.logRef.destroy();
}
```
Manual destruction is advanced; automatic lifetime is usually sufficient. Service effects follow the lifetime of their owning injection context, so a root service effect may live much longer than a component effect.

## 9. Execution cautions
- Effects run at least once.
- Dependencies are the signals read during the latest execution.
- Rapid changes may be coalesced; do not rely on one run per intermediate value.
- Registered cleanup runs before rerun or destruction.
- Avoid writing to dependencies inside effects without a carefully justified design.
- Use computed for derived values and explicit methods for ordinary user actions.

## Quick reference
```ts
effect(() => console.log(this.value()));

effect((onCleanup) => {
  const timer = setTimeout(() => {}, 1000);
  onCleanup(() => clearTimeout(timer));
});
```

## Retrieval checkpoint
Explain why an effect runs; identify dependencies; distinguish computed from effect; trace localStorage persistence; explain cleanup timing; identify an effect that should instead be computed.

**Coverage:** effect(), dependency tracking, side effects, logging/external synchronization, cleanup basics, computed vs effect, when not to use effect.


## Additional reference — cleanup and lifecycle details

The cleanup callback is registered during an effect execution. Angular invokes it before the next execution and when the effect is destroyed. A timer is only one example; a subscription or external listener may also need cleanup.

Component effects and root effects have different scheduling contexts. For beginner code, create effects in a component or service injection context and let Angular manage their lifetime. Do not depend on an exact synchronous execution order or use effects as a substitute for ordinary event handlers.

