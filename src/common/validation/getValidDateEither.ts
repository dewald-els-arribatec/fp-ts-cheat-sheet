import {either} from 'fp-ts/lib';
import {pipe} from 'fp-ts/lib/function';
import moment from 'moment';
import {Nullable, getValidStringEither} from '.';

const getDateEither =
  (dateFormat: moment.MomentFormatSpecification) =>
  (fieldName: string) =>
  (field: Nullable<string>) => {
    return pipe(
      field,
      getValidStringEither(fieldName),
      either.chain(
        either.fromPredicate(
          value => moment(value, dateFormat, true).isValid(),
          value =>
            new Error(
              `"${fieldName}" value (${value}) is not a valid date or in an invalid date format `
            )
        )
      ),
      either.map(dateStr => moment(dateStr, dateFormat, true))
    );
  };

const getValidDateEither = getDateEither('DD-MM-YYYY');

export {getDateEither, getValidDateEither};
