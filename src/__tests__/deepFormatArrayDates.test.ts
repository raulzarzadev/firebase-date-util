import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';
import { OBJ_ARRAYS } from '../DATES_OBJS_TESTS';

const newTimestampDate = Timestamp.fromDate(new Date());

const obj = OBJ_ARRAYS.obj;
const expecting = OBJ_ARRAYS.expecting;

test('deep  format array dates to number', () => {
  expect(Dates.deepFormatObjectDates(obj, 'number')).toStrictEqual(expecting(Number));
});

test('deep format dates array to timestamp', () => {
  expect(Dates.deepFormatObjectDates(obj, 'timestamp')).toStrictEqual(expecting(Timestamp));
});
