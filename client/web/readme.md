# Ministore Web Client

[React](https://react.dev/) client for Ministore Web. Uses [Vite](https://vitejs.dev/) for bundling
and development server, [React-router](https://reactrouter.com/en/main) for routing and
[Apollo GraphQL](https://www.apollographql.com/docs/react/) client.

## Getting started

Requirements: [Node.js](https://nodejs.org) 16 or newer and relatively modern npm

Start development:

```
  $ npm install
  $ npm run dev
```

Vite development server should watch your changes as you work and apply changes immediately.

## Running tests

Run Playwright tests with the following command:

```
  $ npm run test
```

Make sure you have backend & frontend running before attempting to run tests!
In the real world we would configure Playwright to do this for us.

You may need to perform `npx playwright install` first.

## Typechecking

Strict typechecking with TypeScript has been configured, in addition to type-safe ESLint configuration.
