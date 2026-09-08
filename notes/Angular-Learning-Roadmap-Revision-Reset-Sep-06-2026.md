# Angular Learning Roadmap --- Revision Reset

## Purpose

This is the clean master roadmap for the Angular section of the
**Developer Learning Hub**.

**Reset date:** September 6, 2026\
**Daily study budget:** 35--45 minutes maximum\
**Current goal:** Revisit everything already learned through Routing /
Route Parameters, read every existing README, inspect the real Learning
Hub code, correct unclear material, add useful beginner-friendly
comments, and rebuild confidence before continuing to new topics.

> **Important:** Every checkbox is intentionally reset to unchecked. A
> topic is checked again only after revision confirms that it is
> understood --- not because it was studied previously.

## Revision Week --- September 6--13

-   [ ] **Sep 6** --- Topics 1--3: Setup & Architecture, String
    Interpolation, Components
-   [ ] **Sep 7** --- Topics 4--6: Property Binding, Event Binding,
    Two-Way Binding
-   [ ] **Sep 8** --- Topics 7--9: Template Control Flow, `input()`,
    `output()`
-   [ ] **Sep 9** --- Topics 10--14: Writable Signals, Computed Signals,
    Signal Inputs, Signal State Changes, `effect()`
-   [ ] **Sep 10** --- Topics 15--17: Models / Interfaces, Pipes, Custom
    Pipes
-   [ ] **Sep 11** --- Topics 18--20: Services, Dependency Injection,
    Shared State
-   [ ] **Sep 12** --- Topic 21: Routing
-   [ ] **Sep 13** --- Topic 22: Route Parameters & Navigation + full
    Learning Hub reconstruction/checkpoint

### What counts as revised

For each topic:

-   [ ] Read the existing Concept README.
-   [ ] Explain the problem the Angular feature solves in simple words.
-   [ ] Recognize the important syntax.
-   [ ] Find where the concept is used in the Learning Hub.
-   [ ] Trace the data/event/navigation flow in the actual code.
-   [ ] Correct README mistakes or confusing explanations.
-   [ ] Add useful code comments where they improve understanding.
-   [ ] Run/test the relevant behavior.
-   [ ] Explain the implementation back in plain English.

> If a topic is not comfortable within the day's 35--45 minutes, carry
> it forward. Do not extend the session just to satisfy the date.

------------------------------------------------------------------------

# Detailed Angular Topics

## 1. Concept --- **Revision date: Sep 6, 2026**

## 2. Q&A Reference --- **Revision date: Sep 6, 2026**

## 3. Practical Implementation --- **Revision date: Sep 6, 2026**

-   [ ] Explain what problem the feature solves
-   [ ] Recognize/write its syntax
-   [ ] Decide when to use it
-   [ ] Implement a small requirement with little/no guidance
-   [ ] Debug a basic mistake
-   [ ] Explain the implementation in plain English

## 4. Property Binding --- **Revision date: Sep 7, 2026**

**Planned learning time:** 1--2 days

-   [ ] \[property\] syntax
-   [ ] TypeScript → HTML
-   [ ] \[disabled\]
-   [ ] \[src\]
-   [ ] boolean binding
-   [ ] \[class\] basics
-   [ ] \[style\] basics
-   [ ] static assets

## 5. Event Binding --- **Revision date: Sep 7, 2026**

**Planned learning time:** 1--2 days

-   [ ] (event) syntax
-   [ ] (click)
-   [ ] component methods
-   [ ] this.property
-   [ ] changing component state
-   [ ] \$event
-   [ ] input/keyboard events
-   [ ] event → method → state

## 6. Two-Way Binding --- **Revision date: Sep 7, 2026**

**Planned learning time:** 1--2 days

-   [ ] \[(ngModel)\]
-   [ ] FormsModule
-   [ ] TypeScript ⇄ HTML
-   [ ] initial values
-   [ ] user edits update component state
-   [ ] property vs event vs two-way binding

## 7. Angular Template Control Flow --- **Revision date: Sep 8, 2026**

**Planned learning time:** 2--3 days

-   [ ] @if
-   [ ] @else
-   [ ] @else if
-   [ ] @for
-   [ ] track
-   [ ] $index/$first/$last/$even/\$odd
-   [ ] @empty
-   [ ] @switch
-   [ ] @case
-   [ ] @default

## 8. Parent → Child Communication with input() --- **Revision date: Sep 8, 2026**

**Planned learning time:** 1--2 days

-   [ ] parent/child relationship
-   [ ] input()
-   [ ] reading signal inputs
-   [ ] typed/default/required inputs
-   [ ] aliases
-   [ ] transforms
-   [ ] parent binding → child
-   [ ] input ownership

## 9. Child → Parent Communication with output() --- **Revision date: Sep 8, 2026**

**Planned learning time:** 1--2 days

-   [ ] output()
-   [ ] emit()
-   [ ] parent event listener
-   [ ] typed payloads
-   [ ] \$event
-   [ ] input down/events up

## 10. Writable Signals --- **Revision date: Sep 9, 2026**

**Planned learning time:** 2--3 days

-   [ ] signal()
-   [ ] WritableSignal
-   [ ] reading with ()
-   [ ] set()
-   [ ] update()
-   [ ] primitive/array/object signals
-   [ ] immutable updates
-   [ ] property vs signal

## 11. Computed Signals --- **Revision date: Sep 9, 2026**

**Planned learning time:** 1--2 days

-   [ ] computed()
-   [ ] derived state
-   [ ] dependency tracking
-   [ ] read-only computed state
-   [ ] filtered/totals/count derived state
-   [ ] signal vs computed

## 12. Signal Inputs --- **Revision date: Sep 9, 2026**

**Planned learning time:** 1--2 days

-   [ ] input() as signal
-   [ ] read with ()
-   [ ] typed/default/required inputs
-   [ ] parent binding
-   [ ] input signal vs writable signal
-   [ ] computed from inputs

## 13. Signal-Based State Changes --- **Revision date: Sep 9, 2026**

**Planned learning time:** 1--2 days

-   [ ] event → signal update
-   [ ] set vs update
-   [ ] toggle/counter
-   [ ] array add/remove
-   [ ] object updates
-   [ ] selected state
-   [ ] minimal state
-   [ ] derived state

## 14. effect() --- **Revision date: Sep 9, 2026**

**Planned learning time:** 1--2 days

-   [ ] effect()
-   [ ] dependency tracking
-   [ ] side effects
-   [ ] logging/external synchronization
-   [ ] cleanup basics
-   [ ] computed vs effect
-   [ ] when not to use effect

## 15. TypeScript Models / Interfaces in Angular --- **Revision date: Sep 10, 2026**

**Planned learning time:** 1--2 days

-   [ ] interfaces/models
-   [ ] required/optional/readonly properties
-   [ ] typed arrays
-   [ ] typed component data
-   [ ] typed inputs/services/API responses
-   [ ] nested models
-   [ ] separate model files
-   [ ] avoid any

## 16. Pipes --- **Revision date: Sep 10, 2026**

**Planned learning time:** 1--2 days

-   [ ] pipe syntax
-   [ ] uppercase/lowercase/titlecase
-   [ ] date
-   [ ] currency
-   [ ] percent/decimal
-   [ ] parameters
-   [ ] chaining
-   [ ] standalone pipe imports
-   [ ] pipe vs method

## 17. Custom Pipes --- **Revision date: Sep 10, 2026**

**Planned learning time:** 1--2 days

-   [ ] @Pipe
-   [ ] PipeTransform
-   [ ] transform()
-   [ ] typed input/output
-   [ ] arguments
-   [ ] standalone import/use
-   [ ] pure pipe concept

## 18. Services --- **Revision date: Sep 11, 2026**

**Planned learning time:** 1--2 days

-   [ ] service purpose
-   [ ] @Injectable
-   [ ] providedIn root
-   [ ] service methods
-   [ ] service state
-   [ ] component vs service responsibility
-   [ ] multiple consumers

## 19. Dependency Injection --- **Revision date: Sep 11, 2026**

**Planned learning time:** 1--2 days

-   [ ] injector concept
-   [ ] inject()
-   [ ] constructor injection
-   [ ] providers
-   [ ] root singleton behavior
-   [ ] service dependencies
-   [ ] testability

## 20. Sharing Data / State with Services --- **Revision date: Sep 11, 2026**

**Planned learning time:** 1--2 days

-   [ ] shared state ownership
-   [ ] signals in services
-   [ ] private writable/public readonly pattern
-   [ ] computed service state
-   [ ] local vs shared state
-   [ ] avoid duplicated state

## 21. Routing --- **Revision date: Sep 12, 2026**

**Planned learning time:** 1--2 days

-   [ ] Routes
-   [ ] provideRouter
-   [ ] RouterOutlet
-   [ ] routerLink
-   [ ] routerLinkActive
-   [ ] default/redirect/wildcard routes
-   [ ] child routes
-   [ ] lazy loading basics

## 22. Route Parameters & Navigation --- **Revision date: Sep 13, 2026**

**Planned learning time:** 1--2 days

-   [ ] dynamic :id/:topic
-   [ ] ActivatedRoute
-   [ ] paramMap
-   [ ] query params
-   [ ] Router
-   [ ] navigate()
-   [ ] parameterized links
-   [ ] invalid parameters

## 23. Forms Fundamentals --- **Target date: Sep 14, 2026**

**Planned learning time:** 1--2 days

-   [ ] controls/values/submission
-   [ ] validation
-   [ ] valid/invalid
-   [ ] touched/untouched
-   [ ] dirty/pristine
-   [ ] template-driven vs reactive forms

## 24. Template-Driven Forms --- **Target date: Sep 15--16, 2026**

**Planned learning time:** 1--2 days

-   [ ] FormsModule
-   [ ] ngModel
-   [ ] name
-   [ ] ngForm
-   [ ] template references
-   [ ] ngSubmit
-   [ ] required/basic validators
-   [ ] control states
-   [ ] messages
-   [ ] disable submit
-   [ ] reset

## 25. Reactive Forms --- **Target date: Sep 17--19, 2026**

**Planned learning time:** 2--3 days

-   [ ] ReactiveFormsModule
-   [ ] FormControl
-   [ ] FormGroup
-   [ ] formGroup/formControlName
-   [ ] FormBuilder
-   [ ] setValue
-   [ ] patchValue
-   [ ] reset
-   [ ] valueChanges
-   [ ] nested groups
-   [ ] FormArray
-   [ ] dynamic controls

## 26. Form Validation --- **Target date: Sep 20--21, 2026**

**Planned learning time:** 1--2 days

-   [ ] Validators.required/minLength/maxLength/min/max/pattern
-   [ ] email
-   [ ] multiple validators
-   [ ] errors
-   [ ] touched + invalid
-   [ ] custom validators
-   [ ] cross-field validation
-   [ ] async validator concept
-   [ ] server validation

## 27. HTTP Client --- **Target date: Sep 22--23, 2026**

**Planned learning time:** 1--2 days

-   [ ] provideHttpClient
-   [ ] HttpClient injection
-   [ ] typed responses
-   [ ] HTTP Observable
-   [ ] query params
-   [ ] headers/options
-   [ ] HTTP in services

## 28. Calling REST APIs --- **Target date: Sep 24--26, 2026**

**Planned learning time:** 2--3 days

-   [ ] GET/GET by id
-   [ ] POST
-   [ ] PUT
-   [ ] PATCH
-   [ ] DELETE
-   [ ] typed request/response
-   [ ] body/path/query params
-   [ ] API service layer
-   [ ] CRUD
-   [ ] transform API data
-   [ ] avoid nested subscriptions

## 29. Loading, Error & Empty States --- **Target date: Sep 27--28, 2026**

**Planned learning time:** 1--2 days

-   [ ] loading/success/empty/error
-   [ ] messages
-   [ ] retry concept
-   [ ] disable while loading
-   [ ] signals for request state
-   [ ] model UI states safely

## 30. RxJS Fundamentals --- **Target date: Sep 29--Oct 1, 2026**

**Planned learning time:** 2--3 days

-   [ ] Observable/Observer
-   [ ] next/error/complete
-   [ ] cold observable concept
-   [ ] of/from
-   [ ] pipe
-   [ ] map/filter/tap
-   [ ] switchMap
-   [ ] catchError
-   [ ] finalize
-   [ ] combineLatest basics

## 31. Observables & Subscriptions --- **Target date: Oct 2--3, 2026**

**Planned learning time:** 1--2 days

-   [ ] subscribe
-   [ ] subscription lifecycle
-   [ ] async pipe
-   [ ] cleanup
-   [ ] takeUntilDestroyed
-   [ ] avoid nested subscriptions
-   [ ] switchMap
-   [ ] HTTP observables
-   [ ] Observable vs Promise

## 32. Signals and RxJS Together --- **Target date: Oct 4--5, 2026**

**Planned learning time:** 1--2 days

-   [ ] signals vs Observables
-   [ ] toSignal
-   [ ] toObservable
-   [ ] initial values
-   [ ] signals + HTTP streams
-   [ ] avoid unnecessary conversion
-   [ ] choose simplest reactive primitive

## 33. Component Lifecycle --- **Target date: Oct 6--7, 2026**

**Planned learning time:** 1--2 days

-   [ ] constructor
-   [ ] ngOnInit
-   [ ] ngOnChanges
-   [ ] ngAfterViewInit basics
-   [ ] ngOnDestroy
-   [ ] cleanup
-   [ ] hook interfaces
-   [ ] signals vs lifecycle needs

## 34. Reusable Component Design --- **Target date: Oct 8--9, 2026**

**Planned learning time:** 1--2 days

-   [ ] single responsibility
-   [ ] typed inputs/outputs
-   [ ] component API
-   [ ] presentational/container concepts
-   [ ] ng-content
-   [ ] composition
-   [ ] reusable buttons/cards/lists
-   [ ] avoid over-generalization

## 35. Angular Application Structure --- **Target date: Oct 10--11, 2026**

**Planned learning time:** 1--2 days

-   [ ] root responsibility
-   [ ] feature-based folders
-   [ ] shared UI
-   [ ] services/models/routes
-   [ ] local vs shared state
-   [ ] UI/business/data separation
-   [ ] environment config basics
-   [ ] naming conventions

## 36. Testing Angular Components & Services --- **Target date: Oct 12--14, 2026**

**Planned learning time:** 2--3 days

-   [ ] testing fundamentals
-   [ ] TestBed
-   [ ] fixture/component instance
-   [ ] DOM queries
-   [ ] interpolation/binding/event tests
-   [ ] input/output/control-flow tests
-   [ ] service tests
-   [ ] mock dependencies
-   [ ] HTTP tests
-   [ ] forms tests

## 37. Build a Feature Independently --- **Target date: Oct 15--17, 2026**

**Planned learning time:** 2--3 days

-   [ ] requirements → design
-   [ ] choose components/models/state
-   [ ] inputs/outputs
-   [ ] routing
-   [ ] forms/validation
-   [ ] services/API
-   [ ] loading/error/empty
-   [ ] signals/RxJS
-   [ ] reusability
-   [ ] tests
-   [ ] debug/refactor
-   [ ] explain implementation

## 38. linkedSignal() --- **Target date: Oct 18, 2026**

**Planned learning time:** 1 day

-   [ ] linked writable state
-   [ ] source-dependent reset/recalculation
-   [ ] linkedSignal vs computed
-   [ ] when linked state is appropriate

## 39. Route Guards --- Basics --- **Target date: Oct 19, 2026**

**Planned learning time:** 1 day

-   [ ] CanActivateFn
-   [ ] allow/deny/redirect navigation
-   [ ] authentication/authorization use-case concept

## 40. HTTP Interceptors --- Basics --- **Target date: Oct 20, 2026**

**Planned learning time:** 1 day

-   [ ] functional interceptors
-   [ ] common headers
-   [ ] auth token concept
-   [ ] centralized cross-cutting HTTP behavior

## 41. Change Detection & Performance Basics --- **Target date: Oct 21--22, 2026**

**Planned learning time:** 2 days

-   [ ] change detection concept
-   [ ] signals and reactive updates
-   [ ] OnPush concept
-   [ ] avoid expensive template work
-   [ ] track lists correctly

## 42. Deferred Loading --- **Target date: Oct 23, 2026**

**Planned learning time:** 1 day

-   [ ] @defer
-   [ ] @placeholder
-   [ ] @loading
-   [ ] @error
-   [ ] basic triggers

## 43. Accessibility Basics --- **Target date: Oct 24, 2026**

**Planned learning time:** 1 day

-   [ ] semantic HTML
-   [ ] labels/forms
-   [ ] keyboard/focus
-   [ ] alt text
-   [ ] accessible validation

## 44. Build & Deployment Basics --- **Target date: Oct 25, 2026**

**Planned learning time:** 1 day

-   [ ] ng build
-   [ ] build output
-   [ ] production build concept
-   [ ] static assets
-   [ ] deployment/base path basics

------------------------------------------------------------------------

# 35--45 Minute Daily Revision Workflow

``` text
5 minutes
Memory retrieval first — no README initially
        ↓
10 minutes
Read/review the existing README
        ↓
15–20 minutes
Find and trace the concept in the real Learning Hub code
        ↓
5 minutes
README/code cleanup + useful comments
        ↓
5 minutes
Recall questions + mark what still needs reinforcement
```

# Completion Rule

A topic can be checked again only when you can:

-   [ ] Explain what problem the feature solves.
-   [ ] Recognize or reconstruct its important syntax.
-   [ ] Decide when it is useful.
-   [ ] Find and explain its use in the Learning Hub.
-   [ ] Implement or modify a small example with limited guidance.
-   [ ] Debug a basic mistake.
-   [ ] Explain the implementation in plain English.

> The dates are pacing guides for a 35--45 minute daily study budget,
> not deadlines. Confidence and understanding come before moving
> forward.
