# FP-TS Cheat sheet

Website: [https://gcanti.github.io/fp-ts/](https://gcanti.github.io/fp-ts/)


## Codes in noramal ts:
```typescript
// Suppose you want to get all the input in the body
const getBodyInput = (body: ExampleBodyObject) => {
  // To get the input
  // Need to check whether the value is null or undefined for all the input
  // If one of the value is null or undefined then return error messages
  if (!body.stringArr) {
    return Error('No stringArr');
  }
  if (!body.email) {
    throw Error('No email');
  }
  if (!body.name) {
    throw Error('No name');
  }
  if (!body.date) {
    throw Error('No date');
  }
  // Return the input;
  return body;
};
```
## Codes in fp-ts:
```typescript
/**
 * Suppose you want to get the input in the body
 * @param {ExampleBodyObject} body - The adyen object.
 * @return {Either<Error<string>|ExampleBodyObject} - The body itself.
 */
const getBodyInput = (body: ExampleBodyObject) => {
  /*
    First, create an Either type and wrap the data inside Either becasue it can be an error or the data itself
    The custom helper functions are in different, please check the common/validation folder
  */
  const {stringArr, email, name, date} = body;
  const nameEither = getValidStringEither('name')(name);
  const stringArrEither = getValidArrayEither<string>('stringArr')(stringArr);
  const dateEither = getValidDateEither('date')(date);

  /*
    For email, first check if it is a valid string or not, then check if it is a valid email or not
    We compose the functions here using "flow"!
    And we use "chain" because we want to flatten the result
  */
  const getValidEmailAddressesE = flow(
    getValidStringEither('email'),
    either.chain(getValidEmailEither)
  );
  const emailEither = getValidEmailAddressesE(email);
  /*
    Now we have all the inputs wrapped in Either type
    We use "bindTo" and "apSW" because we want the output as an object
  */
  const result = pipe(
    either.bindTo('name')(nameEither),
    either.apSW('stringArr', stringArrEither),
    either.apSW('email', emailEither),
    either.apSW('date', dateEither)
  );
  return result;
};
```