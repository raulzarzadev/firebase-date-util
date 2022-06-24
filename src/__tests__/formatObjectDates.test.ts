import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { SIMPLE_OBJ } from '../DATES_OBJS_TESTS';

test('format simple object dates to number', () => {
  expect(Dates.formatObjectDates(SIMPLE_OBJ.obj, 'number')).toStrictEqual(SIMPLE_OBJ.expecting(Number));
});

test('format simple object dates to timestamp', () => {
  expect(Dates.formatObjectDates(SIMPLE_OBJ.obj, 'timestamp')).toStrictEqual(SIMPLE_OBJ.expecting(Timestamp));
});
