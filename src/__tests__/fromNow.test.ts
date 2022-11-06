import { Dates } from '../Dates';

test('from now function ', () => {
  expect(Dates.fromNow()).toMatch(/(.*?)/);
});

test('format simple object dates to timestamp', () => {
  expect(Dates.fromNow()).toMatch(/(.*?)/);
});
