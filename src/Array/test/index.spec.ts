import { test, describe, expect, vi } from 'vitest';

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

  describe('array.entries', () => {
    test('return a arrIterator', () => {
      const arr = [1, 2, 3, 4, 5];
      const arrIterator = arr.entries();

      expect(arrIterator.next()).toMatchObject({
        value: [0, 1],
        done: false,
      });
    });

    test('for ... of', () => {
      const arr = [1, 2, 3, 4, 5];
      const vResult: number[] = [];
      const kResult: number[] = [];
      for (const [k, v] of arr.entries()) {
        vResult.push(v);
        kResult.push(k);
      }

      expect(vResult).toStrictEqual([1, 2, 3, 4, 5]);
      expect(kResult).toStrictEqual([0, 1, 2, 3, 4]);
    });

    test('likeArray use entries', () => {
      const entries = Array.prototype.entries;
      const likeArr = {
        0: 1,
        1: 2,
        2: 3,
        length: 3,
      };
      const iterator = entries.call(likeArr);
      expect(iterator.next()).toStrictEqual({
        value: [0, 1],
        done: false,
      });
    });

    test('sparseArr empty to undefined', () => {
      const sparseArr = [, , 1];
      const result = [];
      for (const [k, v] of sparseArr.entries()) {
        result.push(v);
      }

      expect(result).toStrictEqual([undefined, undefined, 1]);
    });
  });

  describe('array.every', () => {
    const base = [1, 2, 3, 4, 5];
    test('every return boolean', () => {
      const result = base.every((v) => v < 3);
      expect(result).toBe(false);
    });

    test('every cb return false immediately stop', () => {
      const test = vi.fn();
      base.every((v) => {
        test();
        return v < 3;
      });
      expect(test).toHaveBeenCalledTimes(3);
    });

    test('every empty not call cb', () => {
      const test = vi.fn();
      const emtpyArr = new Array(5);
      emtpyArr[0] = 1;
      emtpyArr[2] = 2;
      emtpyArr[4] = 3;

      emtpyArr.every((v) => {
        test();
        return v % 2 === 1;
      });

      expect(test).toHaveBeenCalledTimes(2);
    });

    test('likeArray use every', () => {
      const every = Array.prototype.every;
      const likeArr = {
        0: 1,
        1: 2,
        2: 3,
        length: 3,
      };
      const result = every.call(likeArr, (v) => v < 2);
      expect(result).toBe(false);
    });
  });

  describe('array.fill can change origin Array', () => {
    const base = [1, 2, 3, 4, 5];
    test('value any, start default, end default length', () => {
      const result = [...base].fill(6);
      expect(result).toStrictEqual([6, 6, 6, 6, 6]);
    });

    describe('value 6, end default length', () => {
      test('0 < start < length,  can fill', () => {
        const result = [...base].fill(6, 2);
        expect(result).toStrictEqual([1, 2, 6, 6, 6]);
      });

      test('start > length,  not fill', () => {
        const result = [...base].fill(6, 6);
        expect(result).toStrictEqual([1, 2, 3, 4, 5]);
      });

      test('-length < start < 0, newStart = length + start', () => {
        const result = [...base].fill(6, -2);
        expect(result).toStrictEqual([1, 2, 3, 6, 6]);
      });

      test('-length > start, start change to 0', () => {
        const result = [...base].fill(6, -6);
        expect(result).toStrictEqual([6, 6, 6, 6, 6]);
      });
    });

    describe('value 6, start 1', () => {
      test('start < end < length', () => {
        const result = [...base].fill(6, 1, 3);
        expect(result).toStrictEqual([1, 6, 6, 4, 5]);
      });

      test('start < end', () => {
        const result = [...base].fill(6, 4, 1);
        expect(result).toStrictEqual([1, 2, 3, 4, 5]);
      });

      test('end > length, newEnd change to length', () => {
        const result = [...base].fill(6, 1, 6);
        expect(result).toStrictEqual([1, 6, 6, 6, 6]);
      });

      test('-length < end < 0', () => {
        const result = [...base].fill(6, 1, -2);
        expect(result).toStrictEqual([1, 6, 6, 4, 5]);
      });

      test('-length > end, newEnd change to 0', () => {
        const result = [...base].fill(6, 1, -6);
        expect(result).toStrictEqual([1, 2, 3, 4, 5]);
      });
    });

    test('likeArray use fill', () => {
      const fill = Array.prototype.fill;
      const likeArr = {
        0: 1,
        1: 2,
        2: 3,
        length: 3,
      };
      fill.call(likeArr, 6);
      expect(likeArr).toStrictEqual({
        0: 6,
        1: 6,
        2: 6,
        length: 3,
      });
    });
  });

  describe('array.filter', () => {
    test('should return an array', () => {
      expect([].filter((v) => v)).toEqual([]);
    });

    test('every item should call cb', () => {
      const injectFn = vi.fn();
      [1, 2, 3, 4, 5].filter((i) => {
        injectFn();
        return i < 5;
      });

      expect(injectFn).toHaveBeenCalledTimes(5);
    });

    test('empty not call cb', () => {
      const injectFn = vi.fn();
      [1, 2, , , 4, , 5].filter((i) => {
        injectFn();
        return (i || 0) < 4;
      });

      expect(injectFn).toHaveBeenCalledTimes(4);
    });

    test('object has length key also can use', () => {
      const filter = Array.prototype.filter;
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const r = filter.call(arrayLike, (v) => v === 'b');
      expect(r).toEqual(['b']);
    });
  });

  describe('array.find', () => {
    test('should return target or undefind', () => {
      expect([1, 2, 3, 4].find((v) => v === 1)).toBe(1);
      expect([1, 2, 3, 4].find((v) => v === 5)).toBe(undefined);
    });

    test('cb 返回了真值, 将停止迭代', () => {
      const arr = [1, 2, 3, 4, 5];
      const injectFn = vi.fn();
      arr.find((i) => {
        injectFn();
        return i < 3;
      });
      expect(injectFn).toBeCalledTimes(1);
    });

    test('cb 会把 empty 当做undefined', () => {
      const injectFn = vi.fn();
      [1, , undefined, 2].find((i) => {
        injectFn();
        return i === undefined;
      });
      // 如果empty 不当做 undefined 应该是 3次
      expect(injectFn).toHaveBeenCalledTimes(2);
    });

    test('likeArray', () => {
      const find = Array.prototype.find;
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const r = find.call(arrayLike, (v) => v === 'b');
      expect(r).toEqual('b');
    });
  });

  describe('array.findIndex', () => {
    test('返回的是满足 cb 的第一个元素的下标', () => {
      const r = [1, 2, 3, 4, 1].findIndex((i) => i === 1);
      expect(r).not.toBe(4);
      expect(r).toBe(0);
    });

    test('没有找到 则返回 undefined', () => {
      expect([1, 2, 3].findIndex((v) => v === 4)).toBe(-1);
    });

    test('cb 返回真值 停止迭代', () => {
      const inFn = vi.fn();
      [1, 2, 3, 4, 5].findIndex((i) => {
        inFn();
        return i < 3;
      });
      expect(inFn).toBeCalledTimes(1);
    });

    test('empty 当做 undefined', () => {
      const inFn = vi.fn();
      [1, , undefined].findIndex((i) => {
        inFn();
        return i === undefined;
      });
      expect(inFn).toBeCalledTimes(2);
    });

    test('likeArray', () => {
      const findIndex = Array.prototype.findIndex;
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const r = findIndex.call(arrayLike, (v) => v === 'b');
      expect(r).toEqual(1);
    });
  });

  describe('array.findLast', () => {
    test('should return target or undefind', () => {
      expect([1, 2, 3, 4].findLast((v) => v === 1)).toBe(1);
      expect([1, 2, 3, 4].findLast((v) => v === 5)).toBe(undefined);
    });

    test('cb 返回了真值, 将停止迭代', () => {
      const arr = [1, 2, 3, 4, 5];
      const injectFn = vi.fn();
      arr.findLast((i) => {
        injectFn();
        return i < 3;
      });
      expect(injectFn).toBeCalledTimes(4);
    });

    test('cb 会把 empty 当做undefined', () => {
      const injectFn = vi.fn();
      [1, undefined, , 3, 2].findLast((i) => {
        injectFn();
        return i === undefined;
      });

      expect(injectFn).toHaveBeenCalledTimes(3);
    });

    test('likeArray', () => {
      const findLast = Array.prototype.findLast;
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const r = findLast.call(arrayLike, (v) => v === 'b');
      expect(r).toEqual('b');
    });
  });

  describe('array.findLastIndex', () => {
    test('返回的是满足 cb 的第一个元素的下标', () => {
      const r = [1, 2, 3, 4, 1].findLastIndex((i) => i === 1);
      expect(r).not.toBe(0);
      expect(r).toBe(4);
    });

    test('没有找到 则返回 undefined', () => {
      expect([1, 2, 3].findLastIndex((v) => v === 4)).toBe(-1);
    });

    test('cb 返回真值 停止迭代', () => {
      const inFn = vi.fn();
      [1, 2, 3, 4, 5].findLastIndex((i) => {
        inFn();
        return i < 3;
      });
      expect(inFn).toBeCalledTimes(4);
    });

    test('empty 当做 undefined', () => {
      const inFn = vi.fn();
      [1, , undefined].findLastIndex((i) => {
        inFn();
        return i === undefined;
      });
      expect(inFn).toBeCalledTimes(1);
    });

    test('likeArray', () => {
      const findLastIndex = Array.prototype.findLastIndex;
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const r = findLastIndex.call(arrayLike, (v) => v === 'b');
      expect(r).toEqual(1);
    });
  });
});
