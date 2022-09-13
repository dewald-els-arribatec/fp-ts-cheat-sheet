# FP-TS Cheat sheet

Website: [https://gcanti.github.io/fp-ts/](https://gcanti.github.io/fp-ts/)


## Notes:
- Immutability: Try to avoid state
- Get clarity on the input of function
  - Must know exactly what input type is - Define type first
  - Output is important - Define before making function

## FP TS 

### `pipe()`
Start with initial value

### `flow()`
Combine functions 

### `chain()` - `A -> M<A>`

Remove the "outer layer" - Comparable to the `.flatMap()`

### `map()` - `(A -> B) -> M<A> -> M<B>`

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