
## Get started

Install it with `npm i reflex-dom`.

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