import {either} from 'fp-ts/lib';
import {pipe} from 'fp-ts/lib/function';

const getValidEmailFormat = (regex: RegExp) => (email: string) => {
  return pipe(
    email,
    either.fromPredicate(
      value => regex.test(value),
      value => new Error(`"${value}" is not in a valid email format`)
    )
  );
};

const getValidEmailEither = getValidEmailFormat(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export {getValidEmailFormat, getValidEmailEither};
