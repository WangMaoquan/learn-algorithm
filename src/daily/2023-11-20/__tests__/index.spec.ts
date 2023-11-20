import { describe, it, expect } from 'vitest';
import { candy, createRangeStores } from '..';

describe('2023-11-20', () => {
  it('createRangeStores', () => {
    const r = createRangeStores([1, 0, 2]);
    expect(r).toEqual([
      {
        h2l: [1],
        l2h: [],
      },
      {
        h2l: [],
        l2h: [0, 2],
      },
    ]);

    const r1 = createRangeStores([1, 2, 2]);
    expect(r1).toEqual([
      {
        h2l: [],
        l2h: [1, 2, 2],
      },
    ]);

    const r2 = createRangeStores([1, 2, 87, 87, 87, 2, 1]);
    expect(r2).toEqual([
      {
        h2l: [87, 2, 1],
        l2h: [1, 2, 87, 87],
      },
    ]);
  });

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
