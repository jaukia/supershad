import supershad from '../src/index';

test("supershad", () => {
  expect(supershad()).toMatchSnapshot();
});