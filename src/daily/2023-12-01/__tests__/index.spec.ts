import { describe, it, expect } from 'vitest';
import { insert } from '..';

describe('2023-12-01', () => {
  it('插入区间', () => {
    const r = insert(
      [
        [1, 3],
        [6, 9],
      ],
      [2, 5],
    );
    expect(r).toEqual([
      [1, 5],
      [6, 9],
    ]);

    const r1 = insert(
      [
        [1, 2],
        [3, 5],
        [6, 7],
        [8, 10],
        [12, 16],
      ],
      [4, 8],
    );
    expect(r1).toEqual([
      [1, 2],
      [3, 10],
      [12, 16],
    ]);

    const r2 = insert([], [5, 7]);
    expect(r2).toEqual([[5, 7]]);

    const r3 = insert([[1, 5]], [2, 3]);
    expect(r3).toEqual([[1, 5]]);

    const r4 = insert([[1, 5]], [2, 7]);
    expect(r4).toEqual([[1, 7]]);
  });
});
