import {option} from 'fp-ts';
import {pipe} from 'fp-ts/lib/function';
import {exampleObjectData1, ExampleObjectData} from './mockData';

/**
 * Suppose you want to get the terminalId in the adyen object
 * @param {ExampleObjectData} input - The adyen object.
 * @return {string} - The terminal id.
 */
const getTerminalId = (input: ExampleObjectData) => {
  /*
    First, create an Option type and wrap the data inside Option becasue it can be null or undefined
    Use the Option constructor fromNullable
  */
  const adyenOption = option.fromNullable(input.adyen);

  /*
    Now we have the data wrapped in Option type,
    adyenOption can be "None" or "Some(data)"

    To further get the terminal id in adyenOption,
    we want to do something like "adyen.terminalId"
    But "adyen" is wrapped in Option type
    So we need to unwarp the "adyen" value from the Option type then do "adyen.terminalId",
    and the "adyen.terminalId" should also be wrapped in Option type becasue it can be null or undefined
    Imagine we already have a valid "adyen" value (not null or undefined) and we create a function to get "adyen.terminalId™
  */
  const getAdyenTerminalId = (adyen: NonNullable<ExampleObjectData['adyen']>) =>
    option.fromNullable(adyen.transactionId);
  /*
    So now we just need to unwarp the "adyen" value, feed it into "getAdyenTerminalId" to get the transactionId
    To unwarp the data from a Container like Option and then feed the value to another function, we use "map"
  */
  const result = option.map(getAdyenTerminalId)(adyenOption);

  /*
    But if you look at the type of the result, the data "terminalId" is wrapped inside two layers of Option, why?
    First look at the type signature of "map" in Option, which is f:(a: A -> b: B) -> Option<a: A> -> Option<b: B>
    And "map" works is like this: it unwraps the data "a" from Option, feed the value "a" as an input to f,
    then wrap the result "b" with Option and return it
    So in the example, the "adyen" value is unwrapped from Option first, then it is fed to the function "getAdyenTerminalId",
    then wrap the result "option.fromNullable(adyen.transactionId)" with Option and return it,
    So that's why we have the final result with Option<Option<string>>
    In this case, we want to "flatten" Option<Option<string>> to get Option<string>,
    To "flatten" something, we use "chain" in fp-ts
    So instead of using map ("option.map(getAdyenTerminalId)(adyenOption)"), we use chain
  */
  const niceResult = option.chain(getAdyenTerminalId)(adyenOption);

  /* Now, we just need to get the data inside Option */
  if (option.isSome(niceResult)) {
    /* return the result by using .value */
    // return niceResult.value;
  }

  /*
    If it is null or undefined it should be None
    In this case we return the default value 1
  */
  // return 1;

  /*
    Done? Not so fast :)
    We don't want (need) any if else statement in fp,
    so let's use the destructor "getOrElse" in this case
  */
  // const terminalId = option.getOrElse(() => 1);
  // return terminalId;

  /*
    Another style using "pipe"
    Less code :)
    And instead of doing option.chain(getAdyenTerminalId),
    We can do it like this:  option.chainNullableK(adyen => adyen.terminalId)
  */

  const resultUsingPipe = pipe(
    adyenOption,
    option.chainNullableK(adyen => adyen.terminalId),
    option.getOrElse(() => '1')
  );
  return resultUsingPipe;
};

getTerminalId(exampleObjectData1);

export default getTerminalId;
