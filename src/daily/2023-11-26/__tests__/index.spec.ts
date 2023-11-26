import { describe, it, expect } from 'vitest';
import { merge } from '..';

describe('2023-11-26', () => {
  it('合并区间', () => {
    const r = merge([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ]);
    expect(r).toEqual([
      [1, 6],
      [8, 10],
      [15, 18],
    ]);

    const r1 = merge([
      [1, 4],
      [4, 5],
    ]);
    expect(r1).toEqual([[1, 5]]);
  });
});
