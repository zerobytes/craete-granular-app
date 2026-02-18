# @granularjs/create-app

Scaffolding for Granular projects. Create a new Granular app with one command.

## Usage

### Using npm (recommended)

```bash
npm create @granularjs/app my-app
cd my-app
npm run dev
```

Or with npx:

```bash
npx @granularjs/create-app my-app
```

### Using degit (template only)

```bash
npx degit granularjs/granular/create-granular-app/template my-app
cd my-app
npm install
npm run dev
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
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.js          # Entry point
    ├── router.js        # Route definitions
    ├── App.js           # App shell/layout
    ├── styles.css       # Global styles
    ├── components/      # Reusable components
    └── pages/           # Page components
        ├── Home.js
        └── About.js
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
