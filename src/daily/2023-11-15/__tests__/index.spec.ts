import { describe, it, expect } from 'vitest';
import { intToRoman } from '..';

describe('2023-11-15', () => {
  it('整数转罗马数字', () => {
    const r = intToRoman(3);
    expect(r).toBe('III');

    const r1 = intToRoman(4);
    expect(r1).toBe('IV');

    const r2 = intToRoman(9);
    expect(r2).toBe('IX');

    const r3 = intToRoman(58);
    expect(r3).toBe('LVIII');

    const r4 = intToRoman(1994);
    expect(r4).toBe('MCMXCIV');
  });
});
