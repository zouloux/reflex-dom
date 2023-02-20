# Reflex documentation

!> This new documentation is in work in progress.

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

### Performances

Reflex goal is to be __as performant as possible__ and __as light as possible__.
Reflex will never be as performant than [Solid](https://github.com/solidjs) (because of the Virtual DOM bottleneck), but targets to be more performant than Preact and React in a lot of cases.
Library weight will be around `3kb gzipped`. It may grow a bit over time if we add some useful features. Features not used in your project can be tree-shaken if you use a bundler (like Parcel or Vite).
[See note](./CODEGOLF.md) about code golfing.

![Benchmark](./_images/benchmark.jpg)

> Check official benchmark on [js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/2022/table_chrome_104.0.5112.79.html)

For now Reflex performances are between petit-dom and Preact. It can be greatly improved since Reflex is still in beta!
About size, see [Reflex bundle](https://unpkg.com/reflex-dom) vs [Preact bundle](https://unpkg.com/preact) (without states)

### Unpkg and Esmsh

__Reflex__ is available on [Unpkg](https://unpkg.com/reflex-dom) ![](./bits/reflex.es2017.min.js.svg)
- [see unpkg usage example](https://zouloux.github.io/reflex/demos/5-no-bundler-demo/index.html)

Also available on Esm.sh
- [Esm.sh](https://esm.sh/reflex-dom)

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
