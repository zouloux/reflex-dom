# Reflex

__Reflex JS__ is a tiny ![~3kb](./bits/reflex+signal.es2017.min.js.svg) virtual-dom library with factory based functional components.

Stateful components will return a __render function__ instead of virtual-nodes directly.
Scope is shared between the factory and the render function.

```typescript jsx
function FactoryComponent ( props ) {
    // factory hooks and component logic goes here
    // render function and conditions goes there
    return () => <div>...</div>
}
```

Classic React Hooks like `useCallback`, `useEvent` and `useMemo` are useless.
Also, hooks dependencies array does not exist with __Factory Hooks__. Using `useRef` to store stateless values does not exist anymore. In __Reflex__, `ref` are only here to target dom node or components.


## Because code samples are better than a thousand words

### How to install in your project

Install with `npm i @zouloux/reflex` and you will need at least those options into `tsconfig.json` :
```json
{
    "compilerOptions": {
        "jsxFactory": "h",
        "jsx": "react"
    }
}
```

### Simple DOM rendering

```typescript jsx
// Import Reflex like you would import Preact for example.
import { h, render } from "reflex";

function renderApp( greetings:string ) {
  const app = <div class="MyApp">
    <h1>{ greetings }</h1>
  </div>
  render( app, document.body )
}

renderApp( `Hello from Reflex ✌️` )
// Note : if you call renderApp, it will update state
// renderApp( `Dom is updated` )
```

### Stateless & pure components

Stateless, or components without logic can avoid the factory pattern. Simply return the virtual-dom tree derived from props like you would do it in React or Preact.

```typescript jsx
function StatelessComponent ( props ) {
    return <div class="StatelessComponent">
      Hello { props.name } 👋
    </div>
}
```

> Because Stateless and Stateful components are written differently, Reflex can  optimize render of Stateless components by keeping old tree if props did not change between a render. We have better performances without adding anything to our app.

```typescript jsx
function ChangingComponent ( props ) {
  // If "connectedUser.name" does not changes between "ChangingComponent" renders,
  // "StatelessComponent" does not need to re-render.
  return () => <div>
    ...
    <StatelessComponent name={ connectedUser.name } />
  </div>
}
```


### Stateful components with factory pattern

This is where it changes from React. Stateful components in Reflex follows the __Factory Component Pattern__. __Factory hooks__ are used only in the "factory phase" of the component.

```typescript jsx
// Component which can have state or factory hooks will follow factory pattern
function StatefulComponent ( props ) {
    // This is the "factory phase"
    // This part of the component is executed once, when component is created !
    
    // Create a state for this component, like in React or Solid 
    const currentNumber = state( 0 )
    const incrementNumber = () => currentNumber.set( currentNumber.value + 1 )
    
    // The component needs to return a function which will render the component
    return () => <div class="StatefulComponent">
        {/* Update state when button is clicked */}
        <button onClick={ incrementNumber }>
            Click to increment current number: {currentNumber.value}
        </button>
    </div>
}
```

> States are based on [Observable](./src/reflex/observable.ts), which is an internal dependency. __Observable__ is based on [Signal](https://github.com/zouloux/signal), which is the only external dependency of Reflex (~300 bytes). [The UNPKG bundle](https://unpkg.com/@zouloux/reflex) inline the __Signal__ package as an internal dependency to be standalone.


### Props

In Stateful components, "props" is a __Proxy__ object (like in Solid). Because factory phase is executed once, at component's creation, we need a way to access new props values at each render, this is possible thanks to __Proxy__ [#1](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy), [#2](https://caniuse.com/?search=proxy).

```typescript jsx
function PropsComponent ( props ) {
    function logName () {
        // Will log latest name, even if component rendered several times
        console.log( props.name )
    }
    return () => <div>
        <button onClick={ logName }>Log name</button>
    </div>
}
```

The main tradeoff is that props destructuring is not possible anymore. Or destructed props will be equal to the first props value and never change.

```typescript jsx
function PropsComponent ( props )  {
    // Here name will never change even the component is updated by its parent
    const { name } = props
    return () => <div></div>
}
```


# Factory hooks

Here is a list of all base factory hooks : 

## State

```typescript jsx
// Create a new state
const myState = state( initialState )
// Get current state value
console.log( myState.value )
// Set new value (will trigger a component update)
myState.set( newValue )
```

> Note, setting a new state is asynchronous because all state changes of a component are stacked and component renders only once for better performances. After the component is refreshed, the `await state.set( value )` promise will be resolved.

## Ref

Like in React, we can use ref to target rendered components.

```typescript jsx
function MyComponent () {
    const otherComponentRef = ref()
    function showref () {
        // Log component dom element
        console.log('DOM', otherComponentRef.dom )
        // Log component instance
        console.log('Component', otherComponentRef.component )
    }
    return () => <div>
        <OtherComponent ref={ otherComponentRef }/>
        <button onClick={ showref }>Show ref</button>
    </div>
}
```

> The main difference with React is that ref are useless to create locally scoped component variables.

To create a locally scoped props that will not trigger rendering, just use `let`

```typescript jsx
function MyComponent () {
    let localVariable = 0
    function updateLocalVariable () {
        localVariable ++
        console.log( localVariable );
    }
    return () => <div>
        <button onClick={ updateLocalVariable }>Update local variable</button>
    </div>
}
```

## Refs (aka multi-ref)

Multi ref in Reflex is `ref` as an array of components. Very handy when dealing with lists !

```typescript jsx
function List ( props ) {
    const itemRefs = refs()
    function showListItemElements () {
        // Will be an array of all refs
        console.log( itemsRefs.list );
    }
    return () => <ul>
        {props.items.map( item => <li ref={itemRefs}>{item.name}</li> )}
    </ul>
}
```

> Refs are populated in order of rendering. So if you are using a list which can render in another order than from 0 to length, you can specify the index.

```typescript jsx
function List ( props ) {
    const itemRefs = refs()
    return () => <ul>
        {props.items.map( (item, i) =>
            // Here item.ready can render elements in the wrong order
            // refs.atIndex( index ) will force index and patch this issue 
            item.ready && <li ref={ itemRefs.atIndex(i) }>{item.name}</li>
        )}
    </ul>
}
```


## Mounted / unmounted

Self-explanatory

```typescript jsx
function MountUnmount ( props ) {
    const root = ref()
    
    mounted(() => {
        console.log("Component just mounted, refs are ready.", root.dom)
        // Can return an unmount function
        return () => {
            console.log("Will be called just before component unmount.", root.dom)
        }
    })
    
    unmounted( () => {
        console.log("Will be called just before component unmount.", root.dom)
    })
    
    return () => <div ref={ root }>...</div>
}
```

## Changed

__Changed__ factory hook is useful to detect changes into a component.
With only a handler, it will be called after each component render.

```typescript jsx
function ChangedComponent ( props ) {
    const root = ref()
    const number = state(0)
    changed(() => {
        // Ref and state are available
        console.log("Component updated", root.dom, number.value)
    })
    return () => <div ref={ root }>
        <button onClick={ number.set( number.value + 1) }>
            Update component</button>
    </div>
}
```

__Changed__ can have a first argument to detect changes on values. Because we are in __Factory phase__, raw props or values can't be used directly.
Note than the check function always returns an array.

```typescript jsx
function ChangedComponent ( props ) {
    const stateA = state()
    const stateB = state()
    changed(
        // The function detect changes only on stateA, stateB is ignored
        () => [stateA.value],
        // Called when change is detected
        () => {
            // StateA is updated
            console.log(stateA.value)
        }
    )
    return () => <div>...</div>
}
```

Return from the detect function can detect changes on multiple elements.

```typescript jsx
function ChangedComponent ( props ) {
    const stateA = state()
    const stateB = state()
    changed(
        // The function detect changes in stateA and props.name, stateB is ignored
        () => [stateA.value, props.name],
        // Called when change is detected in stateA OR props.name
        (newValues, oldValues) => {
            // Values array here are the last and previous returned array
            // Useful to detect changes, or pub-sub any other component or model
            console.log( newValues, oldValues )
        }
    )
    return () => <div>...</div>
}
```

__Changed__ handler has the same return behavior than `mount` and `unmount`.

```typescript jsx
function ChangedComponent ( props ) {
    const state = state()
    changed( () => [state.value], newValue => {
        // After change and at first render
        console.log("New value", newValue)
        return oldValue => {
            // Before change and before unmount
            console.log("Old value", oldValue)
        }
    })
    return () => <div>...</div>
}
```

## Things missing

Here is the list of things missing from React :

- React suspense (loading fallback)
- React fiber (asynchronous rendering)
- renderToString (for now only)
- Class components
- A lot of stuff that I forgot

## Performances

Reflex goal is to be as performant as possible and as light as possible. Reflex will never be as performant than Solid (because of Virtual DOM), but will easily be more performant than React or Preact in a lot of cases. 

Library weight will be around `4kb gzipped`. It may be a bit more if we add some useful features. Not used features can be tree-shaken thanks to your bundler (like Parcel or Vite). [See note](./CODEGOLF.md) about code golfing. 

# Examples

[Click here](https://zouloux.github.io/reflex/demos/) to see some demo (WIP)

---

> __/!\ Doc is very work in progress__
> 