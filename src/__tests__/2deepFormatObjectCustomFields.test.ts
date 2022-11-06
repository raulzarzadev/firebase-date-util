import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { DEEP_OBJECT } from '../DATES_OBJS_TESTS';

const obj = DEEP_OBJECT.obj;

const expecting = DEEP_OBJECT.expecting;
const expectingNull = DEEP_OBJECT.expectingNull;
const { expectingCustomFields, expectingAvoidCustomFields } = DEEP_OBJECT;

test('deep format object dates to number with custom fields', () => {
  expect(Dates.deepFormatObjectDates(obj, 'number', { includeFields: ['custom_field'] })).toStrictEqual(
    expectingCustomFields(Number),
  );
});

test('deep format object dates to number with  custom fields and avoiding fields', () => {
  expect(Dates.deepFormatObjectDates(obj, 'number', { includeFields: ['custom_field','custom_field_2'], avoidFields:['custom_field_2'] })).toStrictEqual(
    expectingCustomFields(Number),
  );
});

test('deep format object dates to number avoiding  custom fields', () => {
  expect(
    Dates.deepFormatObjectDates(obj, 'number', {
      avoidFields: ['fieldDate'],
    }),
  ).toStrictEqual(expectingAvoidCustomFields(Number));
});


// test('deep format object dates to timestamp  with custom fields', () => {
//   expect(Dates.formatComplexObjectDates(obj, 'timestamp')).toStrictEqual(expecting(Timestamp));
// });
// test('deep format object dates to date, avoid undefined  with custom fields', () => {
//   expect(Dates.formatComplexObjectDates(obj, 'date', { avoidUndefined: false , fieldsIncludes:['customField_1', 'customFIeld_2']})).toStrictEqual(expecting(Date));
// });

// test('deep format object dates to number, avoid undefined  with custom fields', () => {
//   expect(Dates.formatComplexObjectDates(obj, 'number', { avoidUndefined: false })).toStrictEqual(expecting(Number));
// });

// test('deep format object dates to number, allow undefined  with custom fields , ', () => {
//   expect(Dates.formatComplexObjectDates(obj, 'date', { avoidUndefined: true })).toStrictEqual(expectingNull(Date));
// });
