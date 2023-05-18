import { myAtoi } from './index';
import { describe, test, expect } from 'vitest';

describe('string to number', () => {
  test('my atoi', () => {
    expect(myAtoi('12')).toBe(12);
    expect(myAtoi('12 2')).toBe(12);
    expect(myAtoi('-12')).toBe(-12);
    expect(myAtoi('s12')).toBe(0);
    expect(myAtoi(' 12')).toBe(12);
    expect(myAtoi('11111111111111')).toBe(Math.pow(2, 31) - 1);
    expect(myAtoi('-11111111111111')).toBe(-Math.pow(2, 31) - 1);
  });
});
