import { describe, expect, it } from 'vitest';
import { hIndex } from '../first';
import { RandomizedSet } from '../second';

describe('2023-11-04', () => {
  it('first', () => {
    const r = hIndex([3, 0, 6, 1, 5]);
    expect(r).toBe(3);
    const r1 = hIndex([100]);
    expect(r1).toBe(1);
    const r2 = hIndex([0]);
    expect(r2).toBe(0);
    const r3 = hIndex([0, 0]);
    expect(r3).toBe(0);
    // 突然发现自己理解错题目了
    const r4 = hIndex([11, 15]);
    expect(r4).toBe(2);
    const r5 = hIndex([1, 1]);
    expect(r5).toBe(1);
    const r6 = hIndex([0, 1, 0]);
    expect(r6).toBe(1);
    const r7 = hIndex([1, 2, 2]);
    expect(r7).toBe(2);
    const r8 = hIndex([1, 1, 3, 6, 7, 10, 7, 1, 8, 5, 9, 1, 4, 4, 3]);
    expect(r8).toBe(6);
    const r9 = hIndex([4, 4, 0, 0]);
    expect(r9).toBe(2);
  });

  it('second', () => {
    type Keys = keyof Pick<RandomizedSet, 'insert' | 'remove' | 'getRandom'>;

    function test(
      inputStr: (Keys | 'RandomizedSet')[],
      inputParams: number[][],
    ) {
      const r: (null | boolean | number)[] = [null];
      const rs = new RandomizedSet();

      for (let i = 1; i < inputStr.length; i++) {
        const p = inputParams[i] as [number];
        const method = inputStr[i] as Keys;
        r.push(rs[method](...p));
      }

      return r;
    }

    const r = test(
      [
        'RandomizedSet',
        'insert',
        'insert',
        'remove',
        'insert',
        'remove',
        'getRandom',
      ],
      [[], [0], [1], [0], [2], [1], []],
    );

    expect(r).toEqual([null, true, true, true, true, true, 2]);
  });
});
