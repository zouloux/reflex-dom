
# Factory extensions

Here is a list of all base __factory extensions__ available.
Remember, __factory extensions__ are only usable in __factory phase__ of components and not available in Stateless components.
Like in React, __factory extensions__ are composable into other functions easily.


```tsx
function StatefulComponent () {
	// ✅ Can use extensions here
	state(...)
	changed(...)
	mounted(...)
	unmounted(...)
	
	return () => {
		// ⛔️ Cannot use extensions here
	}
}

function StatelessComponent () {
	// ⛔️ Cannot use extensions here
	return <div>
		{/* ⛔️ Cannot use extensions here */}
	</div>
}
```
