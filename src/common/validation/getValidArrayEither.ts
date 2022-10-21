import {either} from 'fp-ts/lib';
import {pipe} from 'fp-ts/lib/function';
import * as _ from 'lodash';
import {Nullable} from '.';

type GetValidArrayEither = <T>(
  fieldName: string
) => (field: Nullable<T[]>) => either.Either<Error, T[]>;

const getValidArrayEither: GetValidArrayEither = fieldName => field => {
  return pipe(
    field,
    either.fromPredicate(
      _.isArray,
      value => new Error(`"${fieldName}" value (${value}) is not an array`)
    )
  );
};
export {getValidArrayEither};
