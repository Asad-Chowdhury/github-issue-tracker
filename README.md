# github-issue-tracker

1️⃣ What is the difference between var, let, and const?
Ans: var is the old way of declaring variables in JavaScript. It has some quirky behavior — it's "function-scoped," meaning it only cares about whether it's inside a function or not. It also gets "hoisted," which means JavaScript moves it to the top of its scope behind the scenes, which can cause confusing bugs.
let is the modern replacement for var. It's "block-scoped," meaning it only exists within the curly braces {} it was defined in (like inside an if statement or a loop). This makes it much more predictable. We use let when we expect the value to change over time.
const is also block-scoped like let, but with one extra rule: we can't reassign it after we set it.
2️⃣ What is the spread operator (...)?
Ans: The spread operator (...) is a way to "unpack" or "spread out" the contents of an array, object, or other iterable into individual pieces.
3️⃣ What is the difference between map(), filter(), and forEach()?
Ans: All three loop over an array, but they have different purposes and return different things.
forEach() just runs a function on each item. It doesn't return anything useful. We use it when we only care about the side effect (like logging or updating something outside the array).
map() transforms each item and returns a brand new array of the same length. We use it when we want to convert every item into something else.
filter() keeps only the items that pass a condition and returns a new array that may be shorter. We use it when we want to narrow down a list.
4️⃣ What is an arrow function?
Ans: An arrow function is a shorter, more concise way to write a function in JavaScript.
// Regular function
function add(a, b) {
return a + b;
}
// Arrow function — same thing, less code
const add = (a, b) => a + b;
5️⃣ What are template literals?
Ans: Template literals are a cleaner way to work with strings in JavaScript — they let us embed variables and expressions directly inside a string, without messy concatenation.
