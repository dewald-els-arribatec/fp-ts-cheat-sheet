# FP-TS Cheat sheet

Website: [https://gcanti.github.io/fp-ts/](https://gcanti.github.io/fp-ts/)


## Notes:
- Immutability: Try to avoid state
- Get clarity on the input of function
  - Must know exactly what input type is - Define type first
  - Output is important - Define before making function

## FP TS 

### `pipe()`

Start with initial value and pass output of previous function into next function.

#### `pipe()` **Single function example** 

```typescript
import { pipe } from "fp-ts/function";

const numberA: number = 10;

const addOne = (n: number): number => n + 1;

const result: number = pipe(
  numberA, // Will be fed into addOne
  addOne, // Output: 11
);

console.log(result); // Output: 11
```

#### `pipe()` **Multiple function example** 

```typescript
import { pipe } from "fp-ts/function";

const numberA: number = 10;

const addOne = (n: number): number => n + 1;
const multiplyTwo = (n: number): number => n * 2;

const result: number = pipe(
  numberA, // Will be fed into addOne
  addOne, // Output: 11 - Will be fed into multiplyTwo
  multiplyTwo, // Output: 22
);

console.log(result); // Output: 22
```

### `flow()`

Compose functions 


```typescript
import { pipe } from "fp-ts/function";

const numberA: number = 10;

const addOne = (n: number): number => n + 1;
const multiplyTwo = (n: number): number => n * 2;

// Compose two functions together
const addOneMultiTwo = flow(addOne, multiplyTwo);

const result: number = pipe(
  numberA, // Will be fed into addOne
  addOneMultiTwo, // Output: 22
);

console.log(result); // Output: 22
```

### `chain()` - `A -> M<A>`

Remove the "outer layer" - Comparable to the `.flatMap()`

### `map()` - `(A -> B) -> M<A> -> M<B>`

Used when input and output is of same wrapper type.

- `(A -> B)` : Represents the input (A) and output (B) of the function executed on the inputs.
- `M<A> -> M<B>` : Represents the Input type A with wrapper M and Output type B of wrapper M.

```javascript
const arr: number[] = [1,2]
// Bad! The normal way.
arr.map(item => item + 1)

// Functional 
const addOne = (item): number => item + 1

// number -> number 
const outputArr: number[] = A.map(addOne)(arr);

// Comparable 
A.map(addOne)(arr) === A.map(item => item + 1)(arr);

// for Option 
const numberO: Option<number> = option.of(1)
const outputO: Option<number> = option.map(addOne)(numberO) // option.map will "unwrap" the option and pass the value to addOne.

option.map = (fn: (in: number) => number) => (inputOpt: Option<number>): Option<number> => {
  const input = option.value(inputOpt); // Unwrap value from option.
  const output: number = fn(input)
  return option.of(output); // wraps it to Option<number>
} 
```

## Side Notes:

The Container type - Output will be the input 

**i.e.**

Either<error, number> -> Either<error, number> NOT TaskEither<error, number>