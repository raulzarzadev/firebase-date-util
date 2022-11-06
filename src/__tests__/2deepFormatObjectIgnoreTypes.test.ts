import { Dates } from '../Dates';
import { DEEP_OBJECT } from '../DATES_OBJS_TESTS';

const obj = DEEP_OBJECT.obj;

const { expectingIgnoreDateTypes, expectingIgnoreTimestampTypes } = DEEP_OBJECT;

test('format to number but ignore default Date types', () => {
  expect(Dates.deepFormatObjectDates(obj, 'number', { ignoreDefaultDateTypeField: true })).toStrictEqual(
    expectingIgnoreDateTypes(Number),
  );
});

test('format to number but ignore default Timestamp types', () => {
  expect(Dates.deepFormatObjectDates(obj, 'number', { ignoreDefaultTimestampTypeField: true })).toStrictEqual(
    expectingIgnoreTimestampTypes(Number),
  );
});

// test('format to number but ignore default firebase Timestamp types', () => {
//   expect(Dates.deepFormatObjectDates(obj, 'number', { ignoreTimestampTypeField: true })).toStrictEqual(
//     expectingIgnoreTimestampTypes(Number),
//   );
// });
