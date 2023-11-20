import { describe, it, expect } from 'vitest';
import {
  candy,
  candyH2LSum,
  candyL2HSum,
  createRangeStores,
  createRanges,
} from '..';

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

    const r3 = createRangeStores([1, 3, 2, 2, 1]);
    expect(r3).toEqual([
      {
        h2l: [3, 2, 2, 1],
        l2h: [1],
      },
    ]);

    const r4 = createRangeStores([1, 3, 4, 5, 2]);
    expect(r4).toEqual([
      {
        h2l: [5, 2],
        l2h: [1, 3, 4],
      },
    ]);
  });

  it('createRanges', () => {
    const r = createRanges([1, 0, 2]);
    expect(r).toEqual([
      {
        type: 'h2l',
        ratings: [1],
      },
      {
        type: 'l2h',
        ratings: [0, 2],
      },
    ]);

    const r1 = createRanges([1, 3, 4, 5, 2]);
    expect(r1).toEqual([
      {
        type: 'l2h',
        ratings: [1, 3, 4],
      },
      {
        type: 'h2l',
        ratings: [5, 2],
      },
    ]);
  });

  it('candyH2LSum', () => {
    const r = candyH2LSum([87, 2, 1]);
    expect(r).toEqual({
      sum: 6,
      c: 3,
    });

    const r1 = candyH2LSum([3, 2, 2, 1]);
    expect(r1).toEqual({
      sum: 6,
      c: 2,
    });
  });

  it('candyL2HSum', () => {
    const r = candyL2HSum([1, 2, 87, 87]);
    expect(r).toEqual({
      sum: 7,
      c: 3,
    });
  });

  it('分发糖果', () => {
    const r = candy([1, 0, 2]);
    expect(r).toBe(5);

    const r1 = candy([1, 2, 2]);
    expect(r1).toBe(4);

    // 连续递增 糖果也需要递增, 当前代码没有实现
    const r2 = candy([1, 2, 87, 87, 87, 2, 1]);
    expect(r2).toBe(13);

    // todo 处理 maxCandy 可能不为 new Set().size
    const r3 = candy([1, 3, 2, 2, 1]);
    expect(r3).toBe(7);

    // todo 处理 l2h bi h2l 长
    const r4 = candy([1, 3, 4, 5, 2]);
    expect(r4).toBe(11);
  });
});
