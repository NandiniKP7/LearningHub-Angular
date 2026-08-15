# Angular Application Setup & Architecture

Angular needs a starting point and a project structure so it knows **how to start and where application files belong**.

---

# Where Do We Use This?

These files are part of the Angular project itself.

```text
Angular Project
│
├── src/          → application source code
├── public/       → static files
├── package.json  → packages and npm scripts
├── angular.json  → Angular workspace/build configuration
└── ...
```

The startup files connect like this:

```text
index.html
    ↓
main.ts
    ↓
bootstrapApplication(...)
    ↓
Root Component
    ↓
Component HTML
    ↓
Browser
```

---

# Angular CLI

Angular CLI gives us commands for creating and running Angular applications.

Create:

```bash
ng new developer-learning-hub
```

Run:

```bash
ng serve
```

Development server:

```text
localhost:4200
```

---

# `index.html`

The main HTML page loaded by the browser.

Think:

```text
Browser
   ↓
index.html
```

Angular then renders the application inside this page.

---

# `main.ts`

`main.ts` starts the Angular application.

It bootstraps the root component.

```text
main.ts
   ↓
bootstrapApplication(...)
   ↓
Root Component
```

---

# `bootstrapApplication`

Conceptually:

```text
bootstrapApplication(...)
→ start Angular using this root component
```

---

# Root Component

The root component is the first Angular component loaded for the application.

```text
main.ts
   ↓
Root Component
   ↓
other components
```

---

# Important Project Files

```text
app.config.ts
→ application-level Angular providers/configuration

angular.json
→ Angular workspace/build configuration

package.json
→ project packages and npm scripts

src/
→ application source code

public/
→ static files such as images
```

We only need to recognize their purpose for now. Detailed configuration comes later when needed.

---

# Cheat Sheet

```text
ng new
→ create Angular application

ng serve
→ run Angular application

index.html
→ main browser page

main.ts
→ starts Angular

bootstrapApplication
→ boots the root component

src/
→ source code

public/
→ static files
```
