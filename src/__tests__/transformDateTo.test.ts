import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';

test('ransform date to number', () => {
  const date = new Date();
  expect(Dates.transformDateTo(date, 'number')).toEqual(expect.any(Number));
});

 test('ransform string to timestamp', () => {
  const date = new Date().toString();
  expect(Dates.transformDateTo(date, 'timestamp')).toEqual(expect.any(Timestamp));
});

test('ransform fieldDate to date', () => {
  const date = '2012-06-16';
  expect(Dates.transformDateTo(date, 'date')).toEqual(expect.any(Date));
});