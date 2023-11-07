import { describe, expect, it } from 'vitest';
import { isHappy } from '../first';
import { containsNearbyDuplicate } from '../second';
import { isValid } from '../third';

describe('2023-11-07', () => {
  it('first', () => {
    const r = isHappy(19);
    expect(r).toBe(true);

    const r1 = isHappy(2);
    expect(r1).toBe(false);
  });

  it('second', () => {
    const r = containsNearbyDuplicate([1, 2, 3, 1], 3);
    expect(r).toBe(true);

    const r1 = containsNearbyDuplicate([1, 0, 1, 1], 1);
    expect(r1).toBe(true);

    const r2 = containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2);
    expect(r2).toBe(false);
  });

  it('second', () => {
    const r = isValid('()');
    expect(r).toBe(true);

    const r1 = isValid('()[]{}');
    expect(r1).toBe(true);

    const r2 = isValid('(]');
    expect(r2).toBe(false);
  });
});
