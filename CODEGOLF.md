# About code golfing

Main rules are to create the lightest bundle possible BUT to keep the code as 
much as performant possible AND readable. Optimization which will ruin readability
to slim 2 bytes from the bundle will be prohibited.

### Underscore and terser

Terser is configured in `tsbundle` to mangle properties starting with a `_`.
So any member of object, or module starting with `_` will be renamed into a
shorter version. Variable names with or without underscore will be mangled.
So it's important to use `_name` prop names if the property is meant to be private.

#### Ex with object :
```js
const _member = { 	// _member will be mangler because it's a var and not a prop
	keep : "",		// Will be kept as it
	_mangled : true	// Will be mangled
}
```
Will become :
```js
const a = {
	keep : "",
	b : true
}
```

##### Ex with module :
```js
export const _TEXT_NODE_TYPE_NAME = "#T"
export const publicProperty = "Public"
```
Will become :
```js
export const a = "#T"
export const publicProperty = "Public"
```

### Source code vs dist code

It's important to keep source code readable. Terser will compress and mangle,
so no need to compress var names in source code, use plain variable names.

### NODE_ENV
Instructions like `process.env.NODE_ENV != "production"` will be parsed and dead
code will be removed by terser.

### Beware of induced helpers

If you use typescript code which can induce transpiling, typescript can add helpers.
Ex, if you use `const { a, b, ..rest } = baseObject` which is not available in
base target (`es2017`), generated source code can be heavier than writing
assignment manually.


### Export glob from import

- This will force TS compiler to include a helper.
- + It may include unwanted members. 

- 🚫 `export * from "./state"`
- ✅ `export { state, asyncState } from "./state"`

### Typeof something

To check if some property is undefined :
- ✅ `typeof self < 'u' ? isNotUndefined : isUndefined`

To check if some property is a function / object / number / string,
check only the first char, no strict check :
- 🚫 `typeof mountedReturn === "function"`
- ✅ `(typeof mountedReturn)[0] == "f"`

### Casting

##### Convert to string
- 🚫 `something.toString()`
- ✅ `something+''`

##### Convert to number
- `let numberAsString = "40"`
- 🚫 `let number = parseInt(numberAsString, 10)`
- ✅ `let number = +numberAsString`