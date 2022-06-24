import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { SIMPLE_OBJ } from '../DATES_OBJS_TESTS';

test('transform dates to number', () => {
  expect(Dates.formatComplexObjectDates(SIMPLE_OBJ.obj, 'number')).toStrictEqual(SIMPLE_OBJ.expecting(Number));
});

test('transform dates to timestamp', () => {
  expect(Dates.formatComplexObjectDates(SIMPLE_OBJ.obj, 'timestamp')).toStrictEqual(SIMPLE_OBJ.expecting(Timestamp));
});
