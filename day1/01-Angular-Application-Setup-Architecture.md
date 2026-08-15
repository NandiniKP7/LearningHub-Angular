# Angular Application Setup & Architecture

## Angular CLI

Create an Angular application:

```bash
ng new developer-learning-hub
```

Run it:

```bash
ng serve
```

Development server:

```text
localhost:4200
```

## Startup Flow

```text
index.html
    ↓
main.ts
    ↓
bootstrapApplication(...)
    ↓
Root App Component
    ↓
Component HTML
    ↓
Browser
```

## Important Files

```text
index.html
→ main HTML page

main.ts
→ starts Angular application

app.config.ts
→ application-level Angular configuration/providers

angular.json
→ Angular workspace/build configuration

package.json
→ packages and npm scripts

src/
→ application source code

public/
→ static files such as images
```

## Cheat Sheet

```text
ng new
→ create app

ng serve
→ run app

main.ts
→ starts Angular

root component
→ first Angular component
```
