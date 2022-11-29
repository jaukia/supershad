import supershad from '../src/index';

const exampleOutput = [
    "0.16px 0.53px 0.88px -0.04px hsl(var(--shadow-color) / 0.18),\n0.88px 2.89px 7.02px -0.3px hsl(var(--shadow-color) / 0.16),\n0px 0px 0px 1px hsl(var(--shadow-color) / 0.04)",
    "0.65px 2.12px 2.01px -0.15px hsl(var(--shadow-color) / 0.18),\n3.53px 11.55px 16.07px -1.21px hsl(var(--shadow-color) / 0.16),\n0px 0px 0px 1px hsl(var(--shadow-color) / 0.04)",
    "0.8px 2.61px 2.27px -0.2px hsl(var(--shadow-color) / 0.14),\n2.91px 9.51px 7.64px -0.67px hsl(var(--shadow-color) / 0.13),\n8.82px 28.87px 34.18px -3.02px hsl(var(--shadow-color) / 0.12),\n0px 0px 0px 1px hsl(var(--shadow-color) / 0.04)",
    "3.19px 10.45px 8.3px -0.8px hsl(var(--shadow-color) / 0.14),\n11.62px 38.06px 27.86px -2.7px hsl(var(--shadow-color) / 0.13),\n35.27px 115.47px 124.74px -12.07px hsl(var(--shadow-color) / 0.12),\n0px 0px 0px 1px hsl(var(--shadow-color) / 0.04)",
]

test("supershad", () => {
  expect(supershad()).toEqual(exampleOutput);
});