# My Granular App (JSX edition)

Created with `npm create granular-app -- --jsx`.

This is the same complete demo app as the default template, but written in JSX
using the [`@granularjs/jsx`](https://www.npmjs.com/package/@granularjs/jsx)
automatic runtime. JSX in Granular is fully **optional** — the framework runs
identically without it.

## How JSX maps to Granular

The JSX runtime is intentionally minimal: **every** JSX element compiles to a
plain, **variadic** call:

```jsx
<Stack gap="md">
  <Title order={1}>Hello</Title>
  <Text>world</Text>
</Stack>
```

becomes:

```js
Stack({ gap: 'md' },
  Title({ order: 1 }, 'Hello'),
  Text(null, 'world'),
);
```

Three rules, no special cases:

1. Lowercase tags (`<div>`, `<span>`, `<button>`, …) resolve to the matching
   factory in `Elements` from `@granularjs/core` (`Div`, `Span`, `Button`).
2. Uppercase tags (`<Stack>`, `<Card>`, `<MyComponent>`, …) are called
   **as-is**, variadically: `Tag(propsObj?, ...children)`.
3. Children are passed positionally — never via `props.children`.

## Writing your own components

Because the JSX runtime is variadic, your components receive children as
positional args, not inside `props`:

```jsx
import { splitArgs } from '@granularjs/jsx';
import { Card } from '@granularjs/ui';

export function MyCard(...args) {
  const { props, rawProps, children } = splitArgs(args, { padding: 'md' });
  return <Card padding={rawProps.padding}>{children}</Card>;
}
```

`splitArgs(args, defaults?)` returns:

- `props`    — a reactive proxy (every key is wrapped as `computed`), so you
              can subscribe to a single key without caring whether the caller
              passed a primitive or a state.
- `rawProps` — the merged raw values exactly as they were passed.
- `children` — every argument that was not a configuration object, in order.

This is the same convention `@granularjs/ui` uses internally
(`splitPropsChildren`).

If you only need props (no children), the simpler shorthand also works:

```jsx
export const Greeting = (props) => <h1>Hello, {props.name}!</h1>;
```

## Available scripts

```sh
npm run dev      # start the Vite dev server on http://localhost:3000
npm run build    # build for production
npm run preview  # preview the production build
```

## Project structure

```
src/
  main.jsx                    # bootstrap
  router.jsx                  # createRouter({ routes })
  layouts/
    app.layout.jsx            # AppBar + theme toggle + outlet
  pages/
    home.page.jsx             # Todo list demo (state, list, observableArray)
    about.page.jsx            # Static info page
  components/
    todo-item.component.jsx   # Reactive todo item with edit/move/delete
  stores/
    todo.store.js             # observableArray + persist + helpers
  styles.css
```

## JSX runtime configuration

The JSX transform is configured in [`vite.config.js`](./vite.config.js):

```js
esbuild: {
  jsx: 'automatic',
  jsxImportSource: '@granularjs/jsx',
}
```

This is the official, recommended setup. No Babel plugin needed.
