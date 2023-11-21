import { describe, it, expect } from 'vitest';
import { trap } from '..';

describe('2023-11-21', () => {
  it('接雨水', () => {
    const r = trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
    expect(r).toBe(6);

    const r1 = trap([4, 2, 0, 3, 2, 5]);
    expect(r1).toBe(9);
  });
});
