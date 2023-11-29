import { describe, it, expect } from 'vitest';
import { isPalindrome, plusOne } from '..';

describe('2023-11-29', () => {
  it('回文数', () => {
    const r = isPalindrome(121);
    expect(r).toBe(true);

    const r1 = isPalindrome(-121);
    expect(r1).toBe(false);

    const r2 = isPalindrome(10);
    expect(r2).toBe(false);
  });

  it('加一', () => {
    const r = plusOne([1, 2, 3]);
    expect(r).toEqual([1, 2, 4]);

    const r1 = plusOne([4, 3, 2, 1]);
    expect(r1).toEqual([4, 3, 2, 2]);

    const r2 = plusOne([0]);
    expect(r2).toEqual([1]);

    const r3 = plusOne([9]);
    expect(r3).toEqual([1, 0]);
  });
});
