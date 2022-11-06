import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { DEEP_OBJECT } from '../DATES_OBJS_TESTS';

const obj = DEEP_OBJECT.obj;

const { expectingCustomFields, expectingAvoidCustomFields } = DEEP_OBJECT;

test('deep format object dates to number with custom fields', () => {
  expect(Dates.deepFormatObjectDates(obj, 'number', { includeFields: ['custom_field'] })).toStrictEqual(
    expectingCustomFields(Number),
  );
});

test('deep format object dates to number with  custom fields and avoiding fields', () => {
  expect(
    Dates.deepFormatObjectDates(obj, 'number', {
      includeFields: ['custom_field', 'custom_field_2'],
      avoidFields: ['custom_field_2'],
    }),
  ).toStrictEqual(expectingCustomFields(Number));
});

test('deep format object dates to number avoiding  custom fields', () => {
  expect(
    Dates.deepFormatObjectDates(obj, 'number', {
      avoidFields: ['fieldDate'],
    }),
  ).toStrictEqual(expectingAvoidCustomFields(Number));
});
