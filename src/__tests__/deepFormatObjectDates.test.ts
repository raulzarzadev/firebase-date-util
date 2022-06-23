import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { OBJ_OBJECTS } from '../DATES_OBJS_TESTS';

const obj = OBJ_OBJECTS.obj;

const expecting = OBJ_OBJECTS.expecting;

test('deep format object dates to number', () => {
  expect(Dates.deepFormatObjectDates(obj, 'number')).toStrictEqual(expecting(Number));
});

test('deep format object dates to timestamp', () => {
  expect(Dates.deepFormatObjectDates(obj, 'timestamp')).toStrictEqual(expecting(Timestamp));
});
