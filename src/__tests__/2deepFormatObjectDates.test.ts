import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { DEEP_OBJECT } from '../DATES_OBJS_TESTS';

const obj = DEEP_OBJECT.obj;

const expecting = DEEP_OBJECT.expecting;
const expectingNull = DEEP_OBJECT.expectingNull

test('deep format object dates to number', () => {
  expect(Dates.formatComplexObjectDates(obj, 'number')).toStrictEqual(expecting(Number));
});

test('deep format object dates to timestamp', () => {
  expect(Dates.formatComplexObjectDates(obj, 'timestamp')).toStrictEqual(expecting(Timestamp));
});
test('deep format object dates to date, avoid undefined', () => {
  expect(
    Dates.formatComplexObjectDates(obj, 'date', { avoidUndefined: false }),
  ).toStrictEqual(expecting(Date));
});

test('deep format object dates to number, avoid undefined', () => {
  expect(
    Dates.formatComplexObjectDates(obj, 'number', { avoidUndefined: false }),
  ).toStrictEqual(expecting(Number));
});

test('deep format object dates to number, allow undefined', () => {
  expect(
    Dates.formatComplexObjectDates(obj, 'date', { avoidUndefined: true }),
  ).toStrictEqual(expectingNull(Date));
});
