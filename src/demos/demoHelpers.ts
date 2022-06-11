
export const toHex = (n:number) => (~~n).toString(16)
export const createUID = () => `${toHex(Date.now())}-${toHex(Math.random() * 999999999)}`;
export const pickRandom = <G extends any>(array:G[]):G => array[ ~~(Math.random() * array.length) ]
export const rand = (max:number) => ~~(Math.random() * max)

export const foodList = ["Cheese", "Carrots", "Pastas", "Pizza", "Burgers", "Ham", "Salad", "Mustard"]
export const colorList = ["Red", "Blue", "Yellow", "Purple", "Orange", "Black", "White", "Green"]
