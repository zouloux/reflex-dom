# Reflex

__Reflex__ is a tiny and fast reactive UI library.

- 🦋 Super lightweight and __0 dependency__, about ![~4kb](./bits/reflex.es2017.min.js.svg) min-zipped
- 🏎 Highly performant diffing algorithm ( [Proof](#performances) )
- 🔋 Batteries included with [factory extensions](#factory-extensions)
- Really reactive, states are Signal by design
- 🤓 Typed JSX
- 🍰 Easy to learn
- 🤘️ HMR Support for Vite

[![npm](https://img.shields.io/npm/v/@zouloux/reflex.svg)](http://npm.im/@zouloux/reflex)
![](https://img.shields.io/badge/Build-passing-success)
![](https://img.shields.io/badge/0-dependency-success)
<br>
[![gzip size](http://img.badgesize.io/https://unpkg.com/@zouloux/reflex/dist/reflex.es2017.min.js?compression=gzip&label=gzip)](https://unpkg.com/@zouloux/reflex/dist/reflex.es2017.min.js)
[![brotli size](http://img.badgesize.io/https://esm.sh/v89/@zouloux/reflex/es2022/reflex.bundle.js?compression=brotli&label=brotli)](https://esm.sh/v89/@zouloux/reflex/es2022/reflex.bundle.js)

---

```typescript


```

![](./docs/_images/example.gif)

[→ Play with this example on CodeSandbox](https://codesandbox.io/s/reflex-example-9v6pgl?file=/src/index.tsx)

---

## API Concept

> Stateful components will return a __render function__ instead of virtual-nodes directly.
> Scope is shared between the factory and the render function.

```tsx
function StatefulComponent ( props ) {
    // Factory extensions and component logic goes here ( factory phase )
    // This part is only executed once, when component is created.
    const number = state( 0 )
    // ...
    // Render function returning node tree goes there ( in a function )
    return () => <div>Current number is { number }</div>
}
```

> Reflex uses the same functional component for stateless than React and Preact.

```tsx
function StatelessComponent ( props ) {
	// No state ? No need for factory function here
	return <div>Hello { props.name }</div>
}
```

#### Improvements 👍
- __Simpler__ : Classic React Hooks like `useCallback`, `useEvent` and `useMemo` becomes __useless__ and does not exist in __Reflex__.<br>
- __Fewer bugs__ : [Stale closure issues](https://dmitripavlutin.com/react-hooks-stale-closures/) vanishes.<br>
- __Cleaner__ : Also, hooks dependencies array to keep state scopes ([#1](https://itnext.io/how-to-work-with-intervals-in-react-hooks-f29892d650f2), [#2](https://overreacted.io/a-complete-guide-to-useeffect/)) are not needed with __[factory extensions](#factory-extensions)__.
- __Back to basics__ : Using `useRef` to store stateless values does not exist anymore. In __Reflex__, `ref` is used only to target dom node or components, `let` is used to declare local variables like it would normally do.

#### Tradeoffs 👎
- __Stateless vs stateful__ : When a component is evolving from stateless to stateful, the `return <div>...` needs to be refactored to `return () => <div>...`. But stateless components **can** be implemented with factory function.
- __Props__ : Props cannot be destructured in the factory phase [because props is mutated](#props)
- Surely more but I got biases :)

---

### [→ See online documentation](https://zouloux.github.io/reflex/)