import { describe, it, expect } from 'vitest';
import { candy } from '..';

describe('2023-11-20', () => {
  it('分发糖果', () => {
    const r = candy([1, 0, 2]);
    expect(r).toBe(5);

    const r1 = candy([1, 2, 2]);
    expect(r1).toBe(4);

    // 连续递增 糖果也需要递增, 当前代码没有实现
    const r2 = candy([1, 2, 87, 87, 87, 2, 1]);
    expect(r2).toBe(13);
  });
});
