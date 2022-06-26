import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { DEEP_OBJECT } from '../DATES_OBJS_TESTS';

const obj = DEEP_OBJECT.obj;

const expecting = DEEP_OBJECT.expecting;

test('deep format object dates to number', () => {
  expect(Dates.formatComplexObjectDates(obj, 'number')).toStrictEqual(expecting(Number));
});

test('deep format object dates to timestamp', () => {
  expect(Dates.formatComplexObjectDates(obj, 'timestamp')).toStrictEqual(expecting(Timestamp));
});

test('deep format object dates to date, avoid undefined', () => {
  expect(
    Dates.formatComplexObjectDates({ ...obj, updatedAt: undefined }, 'timestamp', { avoidUndefined: true }),
  ).toStrictEqual({ ...expecting(Timestamp), updatedAt: null });
});

test('deep format object dates to date, allow undefined', () => {
  expect(
    Dates.formatComplexObjectDates({ ...obj, updatedAt: undefined }, 'timestamp', { avoidUndefined: false }),
  ).toStrictEqual({ ...expecting(Timestamp), updatedAt: undefined });
});
