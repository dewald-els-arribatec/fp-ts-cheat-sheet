import {either, string} from 'fp-ts/lib';
import {pipe} from 'fp-ts/lib/function';
import {Nullable} from '.';

const getValidStringEither =
  (fieldName: string) => (field: Nullable<string>) => {
    return pipe(
      field,
      either.fromNullable(new Error(`${fieldName} is null or undefined`)),
      either.chain(
        either.fromPredicate(
          string.isString,
          value => new Error(`"${fieldName}" value (${value}) is not a string`)
        )
      )
    );
  };

export {getValidStringEither};
