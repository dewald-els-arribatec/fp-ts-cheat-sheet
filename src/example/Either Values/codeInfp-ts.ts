import {option, either} from 'fp-ts';
import {pipe, flow} from 'fp-ts/lib/function';
import {ExampleBodyObject, exampleBodyObject4} from './mockData';
import {
  getValidStringEither,
  getValidArrayEither,
  getValidEmailEither,
  getValidDateEither,
} from '../../common/validation';

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

getBodyInput(exampleBodyObject4);

export default getBodyInput;
