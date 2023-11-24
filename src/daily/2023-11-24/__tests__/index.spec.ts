import { describe, it, expect } from 'vitest';
import { maxArea } from '..';

describe('2023-11-24', () => {
  it('盛最多水的容器', () => {
    const r = maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]);
    expect(r).toBe(49);

    const r1 = maxArea([1, 1]);
    expect(r1).toBe(1);
  });
});
