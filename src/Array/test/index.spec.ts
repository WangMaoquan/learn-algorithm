import { test, describe, expect } from 'vitest';

describe('array', () => {
  describe('create Array', () => {
    test('arraylength parameter', () => {
      const arr = new Array<number>(1);
      expect(arr.length).toBe(1);
      expect(arr[0]).not.toBe(1);
    });

    test('not integer parameter', () => {
      const arr = new Array(1, 2, 3);
      expect(arr.length).toBe(3);
      expect(arr).toStrictEqual([1, 2, 3]);
    });

    test('Array literal', () => {
      const arr = [1, 2, 3];
      expect(arr.length).toBe(3);
    });
  });

  test('array[Symbol.spceise]', () => {
    class LikeArray {
      constructor(public length: number) {
        this.length = length;
      }
    }

    const testArr = [1, 2, 3];
    testArr.constructor = {
      [Symbol.species]: LikeArray,
    } as any;

    const arr1 = testArr.map((i) => i);
    const arr2 = testArr.filter((i) => i);
    const arr3 = testArr.concat([1, 2]);
    expect(arr1).toBeInstanceOf(LikeArray);
    expect(arr2).toBeInstanceOf(LikeArray);
    expect(arr3).toBeInstanceOf(LikeArray);
  });

  test('array.at not change origin array', () => {
    const arr = [1, 2, 3];
    expect(arr.at(1)).toBe(2);
    expect(arr.at(-1)).toBe(3);
    // 超过数组长度 undefined
    expect(arr.at(4)).toBe(undefined);
    expect(arr.at(-4)).toBe(undefined);
  });

  describe('array.concat not change origin array', () => {
    const origin: (string | number)[] = [1, 2, 3, 4];
    test('concat not change origin', () => {
      const source = [5, 6, 7];
      const result = origin.concat(source);

      expect(origin).toStrictEqual([1, 2, 3, 4]);
      expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('concat more source', () => {
      const source1 = [5];
      const source2 = 'string';
      const source3 = 1;
      const result = origin.concat(source1, source2, source3);
      expect(result).toStrictEqual([1, 2, 3, 4, 5, 'string', 1]);
    });

    test('array [Symbol.isConcatSpreadable]', () => {
      const source = [1, 2, 3];
      // @ts-ignore
      source[Symbol.isConcatSpreadable] = false; // 设置为 false 将不会自动展开, 数组默认是 true
      const result = origin.concat(source);

      expect(result).toStrictEqual([1, 2, 3, 4, source]); // 没有展开
    });

    test('likeArray [Symbol.isConcatSpreadable]', () => {
      const likeArraySource = {
        0: 5,
        1: 6,
        2: 7,
        length: 3,
      } as any;
      const result1 = origin.concat(likeArraySource);

      expect(result1).toStrictEqual([1, 2, 3, 4, likeArraySource]);

      // 类数组的 isConcatSpreadable 默认是 false

      likeArraySource[Symbol.isConcatSpreadable] = true;
      const result2 = origin.concat(likeArraySource);
      expect(result2).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('concat should keep empty', () => {
      const source = new Array(5);
      const source1 = 1;
      const result = origin.concat(source, source1);

      expect(result).toStrictEqual([1, 2, 3, 4, , , , , , 1]); // ps vitest 处理还是当做了undefined
    });
  });

  describe('array.copyWithin can change origin Array', () => {
    describe('only target parameter, start default 0, end default length - 1', () => {
      test('length > target >= 0', () => {
        const origin = [1, 2, 3, 4, 5];
        const result = origin.copyWithin(0, 0); // mdn 上 start 可选 ts 必选
        expect(result).toStrictEqual([1, 2, 3, 4, 5]);
      });

      test('target >= length', () => {
        const origin = [1, 2, 3, 4, 5];
        const result = origin.copyWithin(origin.length, 0);
        expect(result).toStrictEqual([1, 2, 3, 4, 5]);
      });

      test('target < 0', () => {
        const origin = [1, 2, 3, 4, 5];
        const result = origin.copyWithin(-1, 0); // -1 + array.length
        expect(result).toStrictEqual([1, 2, 3, 4, 1]);

        const origin1 = [1, 2, 3, 4, 5];
        const result1 = origin1.copyWithin(-6, 0);
        expect(result1).toStrictEqual([1, 2, 3, 4, 5]);

        const origin2 = [1, 2, 3, 4, 5];
        const result2 = origin2.copyWithin(-11, 0);
        expect(result2).toStrictEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('target 0, start, end: defalut', () => {
      test('0 < start < length', () => {
        const origin = [1, 2, 3, 4, 5];
        const result = origin.copyWithin(0, 1);
        expect(result).toStrictEqual([2, 3, 4, 5, 5]); // 填充位置0, 复制元素的区间[1, 5) => 2, 3, 4, 5, 5 最后那个5 是原本位置的 5
      });

      test('start > length', () => {
        const origin = [1, 2, 3, 4, 5];
        const result = origin.copyWithin(0, 6); // 超过 length 会变成0
        expect(result).toStrictEqual([1, 2, 3, 4, 5]);
      });

      test('start < 0', () => {
        const origin = [1, 2, 3, 4, 5];
        const result = origin.copyWithin(0, -1); // (0, 4)
        expect(result).toStrictEqual([5, 2, 3, 4, 5]);

        const origin1 = [1, 2, 3, 4, 5];
        const result1 = origin1.copyWithin(0, -6);
        expect(result1).toStrictEqual([1, 2, 3, 4, 5]); // 大于 -length 变成0
      });
    });

    describe('target 0, start 1, end', () => {
      const base = [1, 2, 3, 4, 5];
      test('0 < end < length', () => {
        const origin = [...base];
        const result = origin.copyWithin(0, 1, 2);
        expect(result).toStrictEqual([2, 2, 3, 4, 5]);
      });

      test('end > length', () => {
        const origin = [...base];
        const result = origin.copyWithin(0, 1, 6);
        expect(result).toStrictEqual([2, 3, 4, 5, 5]);
      });

      test('end < 0', () => {
        const origin = [...base];
        const result = origin.copyWithin(0, 1, -2);
        expect(result).toStrictEqual([2, 3, 3, 4, 5]);

        const origin1 = [...base];
        const result1 = origin1.copyWithin(0, 1, -6); // end < -length === 0 start > end 什么都不复制
        expect(result1).toStrictEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('target any, start any, end any', () => {
      const base = [1, 2, 3, 4, 5];

      test('end > start, no copy', () => {
        const origin = [...base];
        const result = origin.copyWithin(1, 2, 1);
        expect(result).toStrictEqual([1, 2, 3, 4, 5]);
      });

      test('copyWithin can keep empty', () => {
        const origin = new Array(5);
        origin[0] = 1;
        origin[2] = 1;
        origin[4] = 1;

        const result = origin.copyWithin(0, 1, 4);

        const matched = new Array(5);
        matched[1] = 1;
        matched[4] = 1;
        expect(result).toStrictEqual(matched);
      });
    });
  });
});
