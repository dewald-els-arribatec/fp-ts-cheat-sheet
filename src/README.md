# FP-TS Cheat sheet

Website: [https://gcanti.github.io/fp-ts/](https://gcanti.github.io/fp-ts/)

## Thought Process:
1. Think about what transformation you want to perform on the data 
2. Define a function for the data transformation
3. To define a function, first think about the *input* and *output* data 
4. Try to break down the whole transformation into smaller functions first
  - Small function means that it only does one thing with simple logic
  - For example, seperate `add1ThenMultiply2` into `add1` and `multiply2` functions
4. Pick a suitable `Container` or `Wrapper` for the data (Both input and output)
  - 90% of the time, use `Option` or `Either` or `TaskEither`
5. Design and write down the type signature for each of the function *(Type is important!)*
6. Compose the functions together 
  - You can compose the functions by just looking at the type signature, that's why type is so important
7. Start to implement the logic for each of the function
8. Write tests for each of the function
9. Compose the functions together in the `aggregated` function
10. Write tests for the `aggregated` function

## Data Structure (`Container` or `Wrapper`)
- Common `Container`: `Option`, `Either` and `TaskEither`
- Please see the `example` folder checkout the examples for these 3 `Container` types
