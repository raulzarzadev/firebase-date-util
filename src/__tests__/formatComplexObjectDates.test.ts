import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { OBJ_OBJECTS } from '../DATES_OBJS_TESTS';

test('format complex dates to number', () => {
  expect(Dates.formatComplexObjectDates(OBJ_OBJECTS.obj, 'number')).toStrictEqual(OBJ_OBJECTS.expecting(Number));
});

test('format complex dates to timestamp', () => {
  expect(Dates.formatComplexObjectDates(OBJ_OBJECTS.obj, 'timestamp')).toStrictEqual(OBJ_OBJECTS.expecting(Timestamp));
});
