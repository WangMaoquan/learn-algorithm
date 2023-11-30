import { describe, it, expect } from 'vitest';
import { createPointsLinearFuncMap, linearFunc, maxPoints, myPow } from '..';

describe('2023-11-30', () => {
  it('Pow(x, n)', () => {
    const r = myPow(2.0, 10);
    expect(r).toBeCloseTo(1024.0, 1);

    const r1 = myPow(2.1, 3);
    // 使用toBeCloseTo 只比较三位小数
    expect(r1).toBeCloseTo(9.261, 3);

    const r2 = myPow(2.0, -2);
    expect(r2).toBeCloseTo(0.25, 2);
  });

  it('linearFunc', () => {
    const r = linearFunc([1, 1], [1, 4]);
    expect(r).toEqual([0, 4]);

    const r1 = linearFunc([1, 1], [4, 1]);
    expect(r1).toEqual([0, 1]);

    const r2 = linearFunc([1, 4], [4, 1]);
    expect(r2).toEqual([-1, 5]);

    const r3 = linearFunc([4, 1], [1, 4]);
    expect(r3).toEqual([-1, 5]);
  });

  it('createPointsLinearFuncMap', () => {
    const r = createPointsLinearFuncMap([
      [1, 1],
      [2, 2],
      [3, 3],
    ]);
    expect(r).toMatchInlineSnapshot(`
      Map {
        "1,0" => Set {
          0,
          1,
          2,
        },
      }
    `);

    const r1 = createPointsLinearFuncMap([
      [1, 1],
      [3, 2],
      [5, 3],
      [4, 1],
      [2, 3],
      [1, 4],
    ]);
    expect(r1).toMatchInlineSnapshot(`
      Map {
        "0.5,0.5" => Set {
          0,
          1,
          2,
        },
        "0" => Set {
          0,
          3,
          5,
          4,
        },
        "2,-1" => Set {
          0,
          4,
        },
        "-1,5" => Set {
          1,
          3,
          4,
          5,
        },
        "2,-7" => Set {
          2,
          3,
        },
        "-0.25,4.25" => Set {
          2,
          5,
        },
      }
    `);

    const r3 = createPointsLinearFuncMap([
      [4, 5],
      [4, -1],
      [4, 0],
    ]);
    expect(r3).toMatchInlineSnapshot(`
      Map {
        "0" => Set {
          0,
          1,
          2,
        },
      }
    `);
  });

  it('直线上最多的点数', () => {
    const r = maxPoints([
      [1, 1],
      [2, 2],
      [3, 3],
    ]);
    expect(r).toBe(3);

    const r1 = maxPoints([
      [1, 1],
      [3, 2],
      [5, 3],
      [4, 1],
      [2, 3],
      [1, 4],
    ]);
    expect(r1).toBe(4);

    // 只有一个点
    const r2 = maxPoints([[0, 0]]);
    expect(r2).toBe(1);

    // fix 斜率为0 其实一定共线
    const r4 = maxPoints([
      [4, 5],
      [4, -1],
      [4, 0],
    ]);
    expect(r4).toBe(3);
  });
});
