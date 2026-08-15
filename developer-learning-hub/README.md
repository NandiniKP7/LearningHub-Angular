# Detailed Angular Topics

## 1. Angular Application Setup & Architecture
**Planned learning time:** 1–2 days

- [ ] Angular CLI
- [ ] ng new / ng serve
- [ ] SPA startup flow
- [ ] index.html
- [ ] main.ts
- [ ] bootstrapApplication
- [ ] root component
- [ ] app.config.ts
- [ ] angular.json
- [ ] package.json
- [ ] src/
- [ ] public/
- [ ] project structure

## 2. String Interpolation
**Planned learning time:** 1–2 days

- [ ] component properties
- [ ] {{ }} syntax
- [ ] literal vs property
- [ ] case sensitivity
- [ ] simple template expressions

## 3. Components
**Planned learning time:** 1–2 days

- [ ] @Component
- [ ] class/template/styles
- [ ] selector
- [ ] templateUrl/styleUrl
- [ ] imports
- [ ] standalone components
- [ ] ng generate component
- [ ] using a child selector
- [ ] component responsibility
- [ ] local state/template scope

## 4. Property Binding
**Planned learning time:** 1–2 days

- [ ] [property] syntax
- [ ] TypeScript → HTML
- [ ] [disabled]
- [ ] [src]
- [ ] boolean binding
- [ ] [class] basics
- [ ] [style] basics
- [ ] static assets

## 5. Event Binding
**Planned learning time:** 1–2 days

- [ ] (event) syntax
- [ ] (click)
- [ ] component methods
- [ ] this.property
- [ ] changing component state
- [ ] $event
- [ ] input/keyboard events
- [ ] event → method → state

## 6. Two-Way Binding
**Planned learning time:** 1–2 days

- [ ] [(ngModel)]
- [ ] FormsModule
- [ ] TypeScript ⇄ HTML
- [ ] initial values
- [ ] user edits update component state
- [ ] property vs event vs two-way binding

## 7. Angular Template Control Flow
**Planned learning time:** 2–3 days

- [ ] @if
- [ ] @else
- [ ] @else if
- [ ] @for
- [ ] track
- [ ] $index/$first/$last/$even/$odd
- [ ] @empty
- [ ] @switch
- [ ] @case
- [ ] @default

## 8. Parent → Child Communication with input()
**Planned learning time:** 1–2 days

- [ ] parent/child relationship
- [ ] input()
- [ ] reading signal inputs
- [ ] typed/default/required inputs
- [ ] aliases
- [ ] transforms
- [ ] parent binding → child
- [ ] input ownership

## 9. Child → Parent Communication with output()
**Planned learning time:** 1–2 days

- [ ] output()
- [ ] emit()
- [ ] parent event listener
- [ ] typed payloads
- [ ] $event
- [ ] input down/events up

## 10. Writable Signals
**Planned learning time:** 2–3 days

- [ ] signal()
- [ ] WritableSignal
- [ ] reading with ()
- [ ] set()
- [ ] update()
- [ ] primitive/array/object signals
- [ ] immutable updates
- [ ] property vs signal

## 11. Computed Signals
**Planned learning time:** 1–2 days

- [ ] computed()
- [ ] derived state
- [ ] dependency tracking
- [ ] read-only computed state
- [ ] filtered/totals/count derived state
- [ ] signal vs computed

## 12. Signal Inputs
**Planned learning time:** 1–2 days

- [ ] input() as signal
- [ ] read with ()
- [ ] typed/default/required inputs
- [ ] parent binding
- [ ] input signal vs writable signal
- [ ] computed from inputs

## 13. Signal-Based State Changes
**Planned learning time:** 1–2 days

- [ ] event → signal update
- [ ] set vs update
- [ ] toggle/counter
- [ ] array add/remove
- [ ] object updates
- [ ] selected state
- [ ] minimal state
- [ ] derived state

## 14. effect()
**Planned learning time:** 1–2 days

- [ ] effect()
- [ ] dependency tracking
- [ ] side effects
- [ ] logging/external synchronization
- [ ] cleanup basics
- [ ] computed vs effect
- [ ] when not to use effect

## 15. TypeScript Models / Interfaces in Angular
**Planned learning time:** 1–2 days

- [ ] interfaces/models
- [ ] required/optional/readonly properties
- [ ] typed arrays
- [ ] typed component data
- [ ] typed inputs/services/API responses
- [ ] nested models
- [ ] separate model files
- [ ] avoid any

## 16. Pipes
**Planned learning time:** 1–2 days

- [ ] pipe syntax
- [ ] uppercase/lowercase/titlecase
- [ ] date
- [ ] currency
- [ ] percent/decimal
- [ ] parameters
- [ ] chaining
- [ ] standalone pipe imports
- [ ] pipe vs method

## 17. Custom Pipes
**Planned learning time:** 1–2 days

- [ ] @Pipe
- [ ] PipeTransform
- [ ] transform()
- [ ] typed input/output
- [ ] arguments
- [ ] standalone import/use
- [ ] pure pipe concept

## 18. Services
**Planned learning time:** 1–2 days

- [ ] service purpose
- [ ] @Injectable
- [ ] providedIn root
- [ ] service methods
- [ ] service state
- [ ] component vs service responsibility
- [ ] multiple consumers

## 19. Dependency Injection
**Planned learning time:** 1–2 days

- [ ] injector concept
- [ ] inject()
- [ ] constructor injection
- [ ] providers
- [ ] root singleton behavior
- [ ] service dependencies
- [ ] testability

## 20. Sharing Data / State with Services
**Planned learning time:** 1–2 days

- [ ] shared state ownership
- [ ] signals in services
- [ ] private writable/public readonly pattern
- [ ] computed service state
- [ ] local vs shared state
- [ ] avoid duplicated state

## 21. Routing
**Planned learning time:** 1–2 days

- [ ] Routes
- [ ] provideRouter
- [ ] RouterOutlet
- [ ] routerLink
- [ ] routerLinkActive
- [ ] default/redirect/wildcard routes
- [ ] child routes
- [ ] lazy loading basics

## 22. Route Parameters & Navigation
**Planned learning time:** 1–2 days

- [ ] dynamic :id/:topic
- [ ] ActivatedRoute
- [ ] paramMap
- [ ] query params
- [ ] Router
- [ ] navigate()
- [ ] parameterized links
- [ ] invalid parameters

## 23. Forms Fundamentals
**Planned learning time:** 1–2 days

- [ ] controls/values/submission
- [ ] validation
- [ ] valid/invalid
- [ ] touched/untouched
- [ ] dirty/pristine
- [ ] template-driven vs reactive forms

## 24. Template-Driven Forms
**Planned learning time:** 1–2 days

- [ ] FormsModule
- [ ] ngModel
- [ ] name
- [ ] ngForm
- [ ] template references
- [ ] ngSubmit
- [ ] required/basic validators
- [ ] control states
- [ ] messages
- [ ] disable submit
- [ ] reset

## 25. Reactive Forms
**Planned learning time:** 2–3 days

- [ ] ReactiveFormsModule
- [ ] FormControl
- [ ] FormGroup
- [ ] formGroup/formControlName
- [ ] FormBuilder
- [ ] setValue
- [ ] patchValue
- [ ] reset
- [ ] valueChanges
- [ ] nested groups
- [ ] FormArray
- [ ] dynamic controls

## 26. Form Validation
**Planned learning time:** 1–2 days

- [ ] Validators.required/minLength/maxLength/min/max/pattern
- [ ] email
- [ ] multiple validators
- [ ] errors
- [ ] touched + invalid
- [ ] custom validators
- [ ] cross-field validation
- [ ] async validator concept
- [ ] server validation

## 27. HTTP Client
**Planned learning time:** 1–2 days

- [ ] provideHttpClient
- [ ] HttpClient injection
- [ ] typed responses
- [ ] HTTP Observable
- [ ] query params
- [ ] headers/options
- [ ] HTTP in services

## 28. Calling REST APIs
**Planned learning time:** 2–3 days

- [ ] GET/GET by id
- [ ] POST
- [ ] PUT
- [ ] PATCH
- [ ] DELETE
- [ ] typed request/response
- [ ] body/path/query params
- [ ] API service layer
- [ ] CRUD
- [ ] transform API data
- [ ] avoid nested subscriptions

## 29. Loading, Error & Empty States
**Planned learning time:** 1–2 days

- [ ] loading/success/empty/error
- [ ] messages
- [ ] retry concept
- [ ] disable while loading
- [ ] signals for request state
- [ ] model UI states safely

## 30. RxJS Fundamentals
**Planned learning time:** 2–3 days

- [ ] Observable/Observer
- [ ] next/error/complete
- [ ] cold observable concept
- [ ] of/from
- [ ] pipe
- [ ] map/filter/tap
- [ ] switchMap
- [ ] catchError
- [ ] finalize
- [ ] combineLatest basics

## 31. Observables & Subscriptions
**Planned learning time:** 1–2 days

- [ ] subscribe
- [ ] subscription lifecycle
- [ ] async pipe
- [ ] cleanup
- [ ] takeUntilDestroyed
- [ ] avoid nested subscriptions
- [ ] switchMap
- [ ] HTTP observables
- [ ] Observable vs Promise

## 32. Signals and RxJS Together
**Planned learning time:** 1–2 days

- [ ] signals vs Observables
- [ ] toSignal
- [ ] toObservable
- [ ] initial values
- [ ] signals + HTTP streams
- [ ] avoid unnecessary conversion
- [ ] choose simplest reactive primitive

## 33. Component Lifecycle
**Planned learning time:** 1–2 days

- [ ] constructor
- [ ] ngOnInit
- [ ] ngOnChanges
- [ ] ngAfterViewInit basics
- [ ] ngOnDestroy
- [ ] cleanup
- [ ] hook interfaces
- [ ] signals vs lifecycle needs

## 34. Reusable Component Design
**Planned learning time:** 1–2 days

- [ ] single responsibility
- [ ] typed inputs/outputs
- [ ] component API
- [ ] presentational/container concepts
- [ ] ng-content
- [ ] composition
- [ ] reusable buttons/cards/lists
- [ ] avoid over-generalization

## 35. Angular Application Structure
**Planned learning time:** 1–2 days

- [ ] root responsibility
- [ ] feature-based folders
- [ ] shared UI
- [ ] services/models/routes
- [ ] local vs shared state
- [ ] UI/business/data separation
- [ ] environment config basics
- [ ] naming conventions

## 36. Testing Angular Components & Services
**Planned learning time:** 2–3 days

- [ ] testing fundamentals
- [ ] TestBed
- [ ] fixture/component instance
- [ ] DOM queries
- [ ] interpolation/binding/event tests
- [ ] input/output/control-flow tests
- [ ] service tests
- [ ] mock dependencies
- [ ] HTTP tests
- [ ] forms tests

## 37. Build a Feature Independently
**Planned learning time:** 2–3 days

- [ ] requirements → design
- [ ] choose components/models/state
- [ ] inputs/outputs
- [ ] routing
- [ ] forms/validation
- [ ] services/API
- [ ] loading/error/empty
- [ ] signals/RxJS
- [ ] reusability
- [ ] tests
- [ ] debug/refactor
- [ ] explain implementation

---
# Additional Modern Angular Topics

These sit around the original 37-topic master list and are included so the roadmap does not hide useful modern Angular areas.

## 38. linkedSignal()
- [ ] linked writable state
- [ ] source-dependent reset/recalculation
- [ ] linkedSignal vs computed
- [ ] when linked state is appropriate

## 39. Route Guards — Basics
- [ ] CanActivateFn
- [ ] allow/deny/redirect navigation
- [ ] authentication/authorization use-case concept

## 40. HTTP Interceptors — Basics
- [ ] functional interceptors
- [ ] common headers
- [ ] auth token concept
- [ ] centralized cross-cutting HTTP behavior

## 41. Change Detection & Performance Basics
- [ ] change detection concept
- [ ] signals and reactive updates
- [ ] OnPush concept
- [ ] avoid expensive template work
- [ ] track lists correctly

## 42. Deferred Loading
- [ ] @defer
- [ ] @placeholder
- [ ] @loading
- [ ] @error
- [ ] basic triggers

## 43. Accessibility Basics
- [ ] semantic HTML
- [ ] labels/forms
- [ ] keyboard/focus
- [ ] alt text
- [ ] accessible validation

## 44. Build & Deployment Basics
- [ ] ng build
- [ ] build output
- [ ] production build concept
- [ ] static assets
- [ ] deployment/base path basics

