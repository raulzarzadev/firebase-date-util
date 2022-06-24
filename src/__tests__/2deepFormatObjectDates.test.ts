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
