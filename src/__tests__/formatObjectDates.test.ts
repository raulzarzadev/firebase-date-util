import { Timestamp } from 'firebase/firestore';
import { Dates } from '../Dates';

test('transform dates to number', () => {
  const dates = {
    nombre: 'Prueba ',
    date: new Date(),
    createdAt: 12312324432,
    startAt: '2022-06-12',
  };
  expect(Dates.formatObjectDates(dates, 'number')).toStrictEqual({
    nombre: expect.any(String),
    date: expect.any(Number),
    createdAt: expect.any(Number),
    startAt: expect.any(Number),
  });
});

test('ransform dates to timestamp', () => {
  const dates = {
    nombre: 'Prueba ',
    date: new Date(),
    createdAt: 12312324432,
    startAt: '2022-06-12',
  };
  expect(Dates.formatObjectDates(dates, 'timestamp')).toStrictEqual({
    nombre: expect.any(String),
    date: expect.any(Timestamp),
    createdAt: expect.any(Timestamp),
    startAt: expect.any(Timestamp),
  });
});
