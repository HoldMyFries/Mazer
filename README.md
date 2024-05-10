# Mazer

A playable maze generator with varying selectable difficulties:

### Casual
A medium-size maze using a simple backtracking algorithm that, when reaching a dead-end, returns to the most recently visited tile that has not yet been traversed.

### Easy
A small-size maze using a backtracking algorithm that returns to any previusly visited cell when reaching a dead-end.

### Medium
A medium-size maze using the same backtracking algorithm used by Easy mazes.

### Hard
A large-size maze using the same backtracking algorithm as easy and medium mazes.

### Diabolical
An extra large, extra difficult maze.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
