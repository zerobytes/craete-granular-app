# @granularjs/create-app

Scaffolding for Granular projects. Create a new Granular app with one command.

## Usage

Same as React / Vite: use `npm create` (runs `npx @granularjs/create-app` under the hood):

```bash
npm create @granularjs/app my-app
cd my-app
npm run dev
```

Or call the package directly:

```bash
npx @granularjs/create-app my-app
```

## What's included

The template includes:

- **Vite** for fast development and building
- **granular** - the core framework
- **@granularjs/ui** - component library
- Pre-configured routing with `createRouter`
- Example pages with reactivity demos
- Modern CSS setup

## Project structure

```
my-app/
├── .gitignore
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.js              # Entry point
    ├── router.js            # Route definitions
    ├── styles.css           # Global styles
    ├── layouts/
    │   └── app.layout.js    # App shell/layout
    ├── components/          # Reusable components
    │   └── todo-item.component.js
    ├── pages/               # Page components
    │   ├── home.page.js     # Home page with examples
    │   └── about.page.js    # About page
    └── stores/              # State stores
        └── todo.store.js
```

## Development

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Build for production
npm run preview  # Preview production build
```

## Learn more

- [Granular Documentation](https://granular.web.app)
- [GitHub](https://github.com/granularjs/granular)
