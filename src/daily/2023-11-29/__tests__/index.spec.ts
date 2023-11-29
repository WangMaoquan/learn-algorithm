import { describe, it, expect } from 'vitest';
import { isPalindrome } from '..';

describe('2023-11-29', () => {
  it('回文数', () => {
    const r = isPalindrome(121);
    expect(r).toBe(true);

    const r1 = isPalindrome(-121);
    expect(r1).toBe(false);

    const r2 = isPalindrome(10);
    expect(r2).toBe(false);
  });
});
