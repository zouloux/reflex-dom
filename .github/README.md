# Reflex

__Reflex__ is a tiny and fast reactive UI library.

- 🦋 Super lightweight and __0 dependency__, about ![~4kb](../bits/reflex.es2020.min.js.svg) min-zipped
- 🏎 Highly performant diffing algorithm ( [Proof](#performances) )
- 🔋 Batteries included with [factory extensions](#factory-extensions)
- ⚛️ Truly reactive, states are Signals by design
- 🔍 Fine grained DOM updates for even better performances, components are rendered only when needed
- 🤓 Typed JSX
- 🍰 Easy to learn
- 🤘️ HMR Support for Vite

[![npm](https://img.shields.io/npm/v/reflex-dom.svg)](http://npm.im/reflex-dom)
![](https://img.shields.io/badge/Version-beta-orange)
<br>
![](https://img.shields.io/badge/Build-passing-success)
![](https://img.shields.io/badge/0-dependency-success)
<br>
[![gzip size](http://img.badgesize.io/https://unpkg.com/reflex-dom/reflex-dom/dist/reflex.es2020.min.js?compression=gzip&label=gzip)](https://unpkg.com/reflex-dom/reflex-dom/dist/reflex.es2020.min.js)
[![brotli size](http://img.badgesize.io/https://unpkg.com/reflex-dom/reflex-dom/dist/reflex.es2020.min.js?compression=brotli&label=brotli)](https://unpkg.com/reflex-dom/reflex-dom/dist/reflex.es2020.min.js)

---

## Quick example

```shell
# Install with npm
npm i reflex-dom
```

```typescript jsx
import { h, render, state } from 'reflex-dom';
export function App (props) {
  const counter = state(0);
  const increment = () => counter.value++;
  const reset = () => counter.value = 0;
  return () => <div>
    <h1>Hello from {props.name} 👋</h1>
    <button onClick={increment}>Increment</button>&nbsp;
    <button onClick={reset}>Reset</button>&nbsp;
    <span>Counter : {counter}</span>
  </div>
}
render( <App name="Reflex" />, document.body );
```

![](../docs/api/_images/example.gif)

---

## [🎮 - Play with this example on StackBlitz](https://stackblitz.com/edit/node-freprp?file=index.tsx)
## [👨‍🏫 - Learn Reflex in 5 minutes](https://zouloux.github.io/reflex/learn/)
## [📘 - See API documentation](https://zouloux.github.io/reflex/api/)
