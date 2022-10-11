# Reflex documentation

!> This new documentation is in work in progress.

## Table of contents

- <a href="#how-to-install">Installation</a>
- <a href="#because-code-samples-are-better-than-a-thousand-words">Code samples</a>
	- <a href="#simple-dom-rendering">Rendering</a>
	- <a href="#stateless-and-pure-components">Stateless</a>
	- <a href="#stateful-components-with-factory-pattern">Stateful and Factory Pattern</a>
	- <a href="#props">Props</a>
	- <a href="#default-props">Default props</a>
- <a href="#factory-extensions">Factory extensions</a>
	- <a href="#state">State</a>
	- <a href="#ref">Ref</a>
	- <a href="#refs-aka-multi-ref">Refs</a>
	- <a href="#mounted-and-unmounted">Mounted & Unmounted</a>
	- <a href="#changed">Changed</a>
- <a href="#more">More</a>
	- <a href="#automatic-forwardref">Automatic forwardRef</a>
	- <a href="#css-classes-as-array">CSS classes as array</a>
- <a href="#about">About</a>
	- <a href="#things-missing">Things missing</a>
	- <a href="#performances">Performances</a>
	- <a href="#demos">Demos</a>
	- <a href="#unpkg-and-esmsh">Unpkg and Esmsh</a>
	- <a href="#roadmap">Roadmap</a>
	- <a href="#thanks">Thanks</a>

## How to install

Install it with `npm i @zouloux/reflex`.

#### With typescript
You will need at least those options into `tsconfig.json` :
```json
{
    "compilerOptions": {
        "jsxFactory": "h",
        "jsx": "react"
    }
}
```

#### With babel
```json
{
  "presets": [
    [
      "@babel/preset-react",
      { "runtime": "automatic" }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      { "pragma" : "h" }
    ]
  ]
}
```

## More

Reflex is slim, but it still has some cool features for greater DX.

### Automatic forwardRef

When attaching a ref from inside the component, an from the parent, it will just work as expected.

```tsx
function Child () {
    // Works, will have component instance and div element
    const root = ref()
    return () => <div ref={ root }></div>
}
function Parent () {
    // Also works without forwardRef
    // will have component instance and div element
    const child = ref()
    return () => <div>
      <Child ref={ child } />
    </div>
}
```
> /!\  This feature is WIP and will certainly change in RC

### CSS classes as array

CSS classes can be set as an array. Falsy values will be automatically filtered out.

```tsx
function PureComponent ( props ) {
    const classes = [
        "PureComponent",
        props.modifier ? `PureComponent-${props.modifier}` : null,
        props.disabled && "disabled",
        ...props.classes
    ]
  return <div class={ classes }></div>
}
// Will have class="PureComponent PureComponent-big ParentComponent_pureComponent"
// Disabled is filtered out because props.disabled is not defined
const component = <PureComponent
  modifier="big"
  classes={["ParentComponent_pureComponent"]}
/>
```

## About

### History

Reflex idea comes from 2018 when React proposed [React Hooks](https://github.com/reactjs/rfcs/pull/68).
After digging hooks for some months, a [lot of people](https://github.com/zouloux/prehook-proof-of-concept/issues/1) talked about the benefits of having a __Factory Phase__ with a render function returned instead of all in one function.
[I proposed a proof of concept of a factory component system](https://github.com/zouloux/prehook-proof-of-concept) based on [Preact](https://github.com/preactjs/preact).
Years after using React hooks (with Preact a lot), I finally had time to get this idea working into a standalone lib ✨

### Things missing

Here is the list of things missing from React :
- React suspense (loading fallback) - is planned
- renderToString - is planned
- React fiber and asynchronous rendering - not planned
- Class components - not planned
- A lot of other stuff

Things missing from Solid :
- Crazy performances thanks to compiling - not planned
- A lot of other stuff

Things missing from Preact :
- Not so much I guess?

### Atomic rendering

Reflex will implement atomic rendering for states. Which means that when a state changes, not all the component is diffed, but only the affected dom nodes.
See Jason Miller post : https://twitter.com/_developit/status/1549001036802625536
This feature is WIP

### Performances

Reflex goal is to be __as performant as possible__ and __as light as possible__.
Reflex will never be as performant than [Solid](https://github.com/solidjs) (because of the Virtual DOM bottleneck), but targets to be more performant than Preact and React in a lot of cases.
Library weight will be around `3kb gzipped`. It may grow a bit over time if we add some useful features. Features not used in your project can be tree-shaken if you use a bundler (like Parcel or Vite).
[See note](./CODEGOLF.md) about code golfing.

![Benchmark](./_images/benchmark.jpg)

> Check official benchmark on [js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/2022/table_chrome_104.0.5112.79.html)

For now Reflex performances are between petit-dom and Preact. It can be greatly improved since Reflex is still in beta!
About size, see [Reflex bundle](https://unpkg.com/@zouloux/reflex) vs [Preact bundle](https://unpkg.com/preact) (without states)

### Demos

[Click here](https://zouloux.github.io/reflex/demos/) to see some demo (WIP)


### Unpkg and Esmsh

__Reflex__ is available on [Unpkg](https://unpkg.com/@zouloux/reflex) ![](./bits/reflex.es2017.min.js.svg)
- [see unpkg usage example](https://zouloux.github.io/reflex/demos/5-no-bundler-demo/index.html)

Also available on Esm.sh
- [Esm.sh](https://esm.sh/@zouloux/reflex)

> Its better to specify used version in your code to avoid code breaking and also for cache and response time.

## Roadmap

#### Done
- [x] A lot of research about how v-dom works
- [x] Actual Virtual dom implementation
- [x] Diffing with complex trees
- [x] Props as dom attributes
- [x] Lifecycle events
- [x] Lifecycle extensions (mounted / unmounted)
- [x] Ref
- [x] Refs
- [x] State
- [x] Automatic memo
- [x] Better performances
	- [x] Diff algorithm inspired by [petit-dom](https://github.com/yelouafi/petit-dom/) and Preact
	- [x] Props as proxy only if needed (not on functional components)
- [x] SVG support
- [x] renderToString
- [x] JSX Types and runtime
- [x] State invalidation refacto
- [x] New `changed` API which can listen to `states`, `props` and custom handlers with simple API
- [x] Props is not a proxy anymore but a mutated object

#### Work in progress / TODO
- [ ] WIP - Imperative handles through component instance
- [ ] WIP - Shared ref between parent and child + component ref + refacto component interface for refs and public API
- [ ] WIP - Atomic rendering
- [ ] Crazy performances
- [ ] Hydration
- [ ] Web components integration
- [ ] `npm create reflex-app`
- [ ] Server components streaming
- [ ] Better docs
	- [ ] Should update
	- [ ] Render to string doc
	- [ ] Imperative methods
	- [ ] Forward refs and component ref
	- [ ] Memo on functional components and shouldUpdate
	- [ ] New states
	- [ ] Babel examples in doc
	- [ ] Code-sandboxes
- [ ] __Release RC-1.0_ and move everything to a Reflex organisation ?

[//]: # (#### Next, other subjects)
[//]: # (- [ ] Reflex store &#40;compatible with Preact and React&#41;)
[//]: # (- [ ] Reflex router &#40;compatible with Preact and React&#41;)
[//]: # (- [ ] Reflex Run with SSR ?)
[//]: # (- [ ] Reflex UIKit ?)


### Thanks

- [xdev1](https://github.com/xdev1) for your feedbacks 🙌 ( and the name of __Factory Extensions__ )
- [Preact](https://github.com/preactjs/preact) for the inspiration and some chunk of codes
- [Petit-DOM](https://github.com/yelouafi/petit-dom) for the inspiration
- [Jason Miller](https://github.com/developit), [Marvin Hagemeister](https://github.com/marvinhagemeister), [Dan Abramov](https://github.com/gaearon), [Sophie Alpert](https://github.com/sophiebits) for your amazing ideas 🙏
