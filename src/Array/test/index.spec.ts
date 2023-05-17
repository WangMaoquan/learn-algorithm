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
    class arrayLike {
      constructor(public length: number) {
        this.length = length;
      }
    }

    const testArr = [1, 2, 3];
    testArr.constructor = {
      [Symbol.species]: arrayLike,
    } as any;

    const arr1 = testArr.map((i) => i);
    const arr2 = testArr.filter((i) => i);
    const arr3 = testArr.concat([1, 2]);
    expect(arr1).toBeInstanceOf(arrayLike);
    expect(arr2).toBeInstanceOf(arrayLike);
    expect(arr3).toBeInstanceOf(arrayLike);
  });

  test('[].at not change origin array', () => {
    const arr = [1, 2, 3];
    expect(arr.at(1)).toBe(2);
    expect(arr.at(-1)).toBe(3);
    // 超过数组长度 undefined
    expect(arr.at(4)).toBe(undefined);
    expect(arr.at(-4)).toBe(undefined);
  });

  describe('[].concat not change origin array', () => {
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

    test('arrayLike [Symbol.isConcatSpreadable]', () => {
      const arrayLikeSource = {
        0: 5,
        1: 6,
        2: 7,
        length: 3,
      } as any;
      const result1 = origin.concat(arrayLikeSource);

      expect(result1).toStrictEqual([1, 2, 3, 4, arrayLikeSource]);

      // 类数组的 isConcatSpreadable 默认是 false

      arrayLikeSource[Symbol.isConcatSpreadable] = true;
      const result2 = origin.concat(arrayLikeSource);
      expect(result2).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('concat should keep empty', () => {
      const source = new Array(5);
      const source1 = 1;
      const result = origin.concat(source, source1);

      expect(result).toStrictEqual([1, 2, 3, 4, , , , , , 1]); // ps vitest 处理还是当做了undefined
    });
  });

  describe('[].copyWithin can change origin Array', () => {
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
        const result = origin.copyWithin(-1, 0); // -1 + [].length
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

  describe('[].entries', () => {
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

    test('arrayLike use entries', () => {
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

  describe('[].every', () => {
    const base = [1, 2, 3, 4, 5];
    test('every return boolean', () => {
      const result = base.every((v) => v < 3);
      expect(result).toBe(false);
    });

    test('空数组总是返回true', () => {
      expect([].every((i) => i > 4)).toBe(true);
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

    test('arrayLike use every', () => {
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

  describe('[].fill can change origin Array', () => {
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

    test('arrayLike use fill', () => {
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

  describe('[].filter', () => {
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

  describe('[].find', () => {
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

    test('arrayLike', () => {
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

  describe('[].findIndex', () => {
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

    test('arrayLike', () => {
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

  describe('[].findLast', () => {
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

    test('arrayLike', () => {
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

  describe('[].findLastIndex', () => {
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

    test('arrayLike', () => {
      const findLastIndex = Array.prototype.findLastIndex;
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'b',
      };
      const r = findLastIndex.call(arrayLike, (v) => v === 'b');
      expect(r).toEqual(1);
    });
  });

  describe('[].flat', () => {
    test('返回一个数组, 不会改变原数组', () => {
      const arr = [1, 2, 3, [4, 5, [6]]];
      expect(arr.flat()).toEqual([1, 2, 3, 4, 5, [6]]);
      expect(arr.flat(1)).toEqual([1, 2, 3, 4, 5, [6]]);
      expect(arr.flat(2)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('被拍平的哪几层中 empty 会被忽略', () => {
      const arr = [1, , 2, [3, , 4, [5, , 6]]];
      expect(arr.flat()).toEqual([1, 2, 3, 4, [5, , 6]]);
    });

    test('arrayLike', () => {
      const flat = Array.prototype.flat;
      const arrayLike = {
        length: 5,
        0: 'a',
        1: 'b',
        2: 'c',
        3: 'd',
      };
      const r = flat.call(arrayLike, 1);
      expect(r).toEqual(['a', 'b', 'c', 'd']);
    });
  });

  describe('[].flatMap', () => {
    test('返回一个数组', () => {
      const arr = [1, 2, 3, 4];
      expect(arr.flatMap((i) => [i, i * 2])).toEqual([1, 2, 2, 4, 3, 6, 4, 8]);
    });

    test('只会拍一层', () => {
      const arr = [1, 2, 3, 4];
      expect(arr.flatMap((i) => [i, [i * 2]])).toEqual([
        1,
        [2],
        2,
        [4],
        3,
        [6],
        4,
        [8],
      ]);
    });

    test('arrayLike', () => {
      const flatMap = Array.prototype.flatMap;
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const r = flatMap.call(arrayLike, (v) => [v, v]);
      expect(r).toEqual(['a', 'a', 'b', 'b', 'c', 'c']);
    });
  });

  describe('[].forEach', () => {
    test('返回值总是undefined', () => {
      expect([].forEach((i) => i)).toBe(undefined);
    });

    test('cb', () => {
      const fn = vi.fn();
      [1, 2, 3, 4].forEach((i) => {
        fn();
        // console.log(i);
      });
      expect(fn).toBeCalledTimes(4);
    });

    test('empty not call cb', () => {
      const fn = vi.fn();
      [1, 2, , 4].forEach((i) => {
        fn();
        // console.log(i);
      });
      expect(fn).toBeCalledTimes(3);
    });

    test('arrayLike', () => {
      const forEach = Array.prototype.forEach;
      const fn = vi.fn();
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const r = forEach.call(arrayLike, (v) => fn());
      expect(r).toEqual(undefined);
      expect(fn).toBeCalledTimes(3);
    });

    test('只有抛出异常还会中止循环', () => {
      const fn = vi.fn();
      const test = () => {
        [1, 2, 3, 4].forEach((i) => {
          if (i === 3) {
            throw Error('3');
          }
          fn();
        });
      };

      expect(test).toThrowError('3');

      // 中止循环成功
      expect(fn).toBeCalledTimes(2);
    });

    test('cb 是一个 promise', async () => {
      let sum = 0;
      const add = async (a: number, b: number) => a + b;
      [1, 2, 3, 4].forEach(async (v) => {
        sum = await add(sum, v);
      });
      expect(sum).toBe(0);
    });
  });

  describe('Array.from', () => {
    test('传入可迭代对象 Map, Set', () => {
      const map = new Map();
      map.set(1, 2);
      map.set(2, 3);
      map.set(3, 4);
      const set = new Set();
      set.add(1);
      set.add(2);
      set.add(3);

      expect(Array.from(map)).toEqual([
        [1, 2],
        [2, 3],
        [3, 4],
      ]);
      expect(Array.from(set)).toEqual([1, 2, 3]);
    });

    test('传入 类数组对象', () => {
      const arrayLike = {
        0: '1',
        1: '2',
        2: '3',
        length: 3,
      };
      expect(Array.from(arrayLike)).toEqual(['1', '2', '3']);
    });

    test('不会生成稀疏数组', () => {
      const arrayLike = {
        0: '1',
        1: '2',
        2: '3',
        a: 'b',
        5: '4',
        length: 4,
      };
      // 所有的类数组转 调用数组的 方法时 根据的是length 来的
      // 假设 length 是3  只会去寻找 0 1 2 对应的key 是否存在
      expect(Array.from(arrayLike)).toEqual(['1', '2', '3', undefined]);
    });

    test('使用 mapFn 第二个参数', () => {
      expect(
        Array.from({ length: 5 }, (v, i) => {
          // v is undefined
          return i;
        }),
      ).toEqual([0, 1, 2, 3, 4]);
    });

    test('实现一个 range', () => {
      const range = (start: number, end: number, step: number) =>
        Array.from(
          {
            length: (end - start) / step + 1,
          },
          (v, i) => {
            return start + i * step;
          },
        );

      expect(range(0, 4, 1)).toEqual([0, 1, 2, 3, 4]);
    });

    test('from() 方法可以在任何构造函数上调用，只要该构造函数接受一个表示新数组长度的单个参数', () => {
      const fn = vi.fn();
      function NotArray(len: number) {
        fn();
        console.log('NotArray called with length', len);
      }

      // @ts-ignore
      Array.from.call(NotArray, new Set(['foo', 'bar', 'baz']));
      expect(fn).toBeCalled();

      // @ts-ignore
      Array.from.call(NotArray, { length: 1, 0: 'foo' });
      expect(fn).toBeCalledTimes(2);
    });

    test('当 this 值不是构造函数，返回一个普通的数组对象', () => {
      // @ts-ignore
      expect(Array.from.call({}, { length: 1, 0: 'foo' })).toEqual(['foo']);
    });
  });

  describe('[].includes', () => {
    const base = [1, 2, 3, 4];
    test('返回值是boolean', () => {
      expect(base.includes(1)).toBe(true);
      expect(base.includes(5)).toBe(false);
    });

    describe('fromIndex parameter', () => {
      test('0 < fromIndex < length', () => {
        expect(base.includes(1, 2)).toBe(false);
      });

      test('fromIndex >= length, 不会搜索数组 直接返回false', () => {
        expect(base.includes(1, 5)).toBe(false);
      });

      test('-length < fromIndex < 0', () => {
        expect(base.includes(1, -1)).toBe(false);
      });

      test('-length > fromIndex, 当做0', () => {
        expect(base.includes(1, -7)).toBe(true);
      });
    });

    test('-0 和 0 视为相等', () => {
      expect([0, ...base].includes(-0)).toBe(true);
    });

    test('empty 会当做 undefined', () => {
      expect([, ...base].includes(undefined)).toBe(true);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        1: 3,
        2: 4,
      };
      const includes = Array.prototype.includes;
      expect(includes.call(arrayLike, 2)).toBe(false);
      expect(includes.call(arrayLike, 3)).toBe(true);
    });

    test('NaN', () => {
      expect([NaN, ...base].includes(NaN)).toBe(true);
    });
  });

  describe('[].indexOf', () => {
    const base = [1, 2, 3, 4];
    test('返回值是一个number', () => {
      expect(base.indexOf(1)).toBe(0);
      expect(base.indexOf(5)).toBe(-1);
    });

    describe('fromIndex paramter', () => {
      test('0 < fromIndex < length', () => {
        expect(base.indexOf(1, 1)).toBe(-1);
      });

      test('fromIndex >= length', () => {
        expect(base.indexOf(1, 6)).toBe(-1);
        expect(base.indexOf(1, base.length)).toBe(-1);
      });

      test('0 > fromIndex > -length, 会变成fromIndex + length', () => {
        expect(base.indexOf(1, -1)).toBe(-1);
        expect(base.indexOf(1, -4)).toBe(0);
      });

      test('-length > fromIndex, 会当做0', () => {
        expect(base.indexOf(1, -6)).toBe(0);
      });
    });

    test('使用的是严格相等', () => {
      const obj = {
        name: 'decade',
      };
      expect([obj, ...base].indexOf(obj)).toBe(0);
      expect(
        [
          {
            name: 'decade',
          },
          ...base,
        ].indexOf(obj),
      ).toBe(-1);
    });

    test('会跳过 empty', () => {
      expect([, ...base].indexOf(undefined)).toBe(-1);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        1: 3,
        2: 4,
      };
      const indexOf = Array.prototype.indexOf;
      expect(indexOf.call(arrayLike, 2)).toBe(-1);
      expect(indexOf.call(arrayLike, 3)).toBe(1);
    });
  });

  describe('Array.isArray', () => {
    test('使用数组构造函数, 字面量创建的 才返回true', () => {
      expect(Array.isArray(new Array(1))).toBe(true);
      expect(Array.isArray(new Array(1, 1, 2))).toBe(true);
      expect(Array.isArray(Array(1, 1, 2))).toBe(true);
      expect(Array.isArray([])).toBe(true);
      // Array.prototype 也是一个数组
      expect(Array.isArray(Array.prototype)).toBe(true);

      expect(Array.isArray(1)).toBe(false);
      expect(Array.isArray('')).toBe(false);
      expect(Array.isArray({})).toBe(false);
      expect(Array.isArray(null)).toBe(false);
      expect(Array.isArray(undefined)).toBe(false);
      expect(Array.isArray(new Uint8Array(32))).toBe(false);
      expect(Array.isArray({ __proto__: Array.prototype })).toBe(false);
    });
  });

  describe('[].join', () => {
    const base = [1, 2, 3, 4];
    test('返回一个字符串', () => {
      expect(base.join()).toBe('1,2,3,4');
      expect([].join()).toBe('');
    });

    test('自定义连接符', () => {
      expect(base.join(', ')).toBe('1, 2, 3, 4');
    });

    test('数组中如果有undefined 或者 null 会被变成空串', () => {
      expect([undefined, null].join('-')).toBe('-');
    });

    test('empty 会当做 undefined', () => {
      expect(new Array(5).join('-')).toBe('----');
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        0: 2,
        1: 3,
        2: 4,
        a: 'a',
      };
      const join = Array.prototype.join;
      expect(join.call(arrayLike, '-')).toBe('2-3-4');
    });
  });

  describe('[].keys', () => {
    const base = [1, 2, 3, 4];
    test('返回的是一个数组迭代器对象', () => {
      const iterator = base.keys();
      expect(iterator.next()).toEqual({
        value: 0,
        done: false,
      });
    });

    test('empty 会被当做 undefined', () => {
      const iterator = [,].keys();
      expect(iterator.next()).toEqual({
        value: 0,
        done: false,
      });
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        1: 3,
        2: 4,
        a: 'a',
      };
      const keys = Array.prototype.keys;
      const iterator = keys.call(arrayLike);
      expect(iterator.next()).toEqual({
        value: 0,
        done: false,
      });
    });
  });

  describe('[].lastIndexOf', () => {
    const base = [1, 2, 3, 4];
    test('返回值是一个数字', () => {
      expect(base.lastIndexOf(1)).toBe(0);
      expect(base.lastIndexOf(5)).toBe(-1);
    });

    describe('fromIndex parameter', () => {
      test('0 < fromIndex < length', () => {
        expect(base.lastIndexOf(1, 1)).toBe(0);
        expect(base.lastIndexOf(2, 1)).toBe(1);
        expect(base.lastIndexOf(3, 1)).toBe(-1);
      });

      test('fromIndex >= length, 会当做 length - 1', () => {
        expect(base.lastIndexOf(1, base.length)).toBe(0);
      });

      test('0 > fromIndex > -length', () => {
        // -2 + 4 = 2
        expect(base.lastIndexOf(2, -2)).toBe(1);
        // -3 + 4 = 1
        expect(base.lastIndexOf(2, -3)).toBe(1);
      });

      test('-length > fromIndex', () => {
        // 这种情况会 直接返回 -1
        expect(base.lastIndexOf(2, -5)).toBe(-1);
      });
    });

    test('使用的是严格相等', () => {
      const obj = {
        name: 'decade',
      };
      expect([obj, ...base].lastIndexOf(obj)).toBe(0);
      expect(
        [obj, ...base].lastIndexOf({
          name: 'decade',
        }),
      ).toBe(-1);
    });

    test('empty 会被跳过', () => {
      expect([, ...base].lastIndexOf(undefined)).toBe(-1);
      expect([undefined, ...base].lastIndexOf(undefined)).toBe(0);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        1: 3,
        2: 4,
        a: 'a',
      };
      const lastIndexOf = Array.prototype.lastIndexOf;
      expect(lastIndexOf.call(arrayLike, undefined)).toBe(-1);
      expect(lastIndexOf.call(arrayLike, 3)).toBe(1);
    });
  });

  describe('[].map', () => {
    const base = [1, 2, 3, 4];
    test('返回一个数组', () => {
      expect(base.map((i) => i * 2)).toEqual([2, 4, 6, 8]);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        1: 3,
        2: 4,
      };
      const map = Array.prototype.map;
      // 0 位置 浏览器打印其实是 empty
      expect(map.call(arrayLike, (v) => v)).toEqual([, 3, 4]);
    });

    test('empty 不会执行 cb', () => {
      const fn = vi.fn();
      const r = [1, 2, 3, , 4].map((i) => {
        fn(); // empty 不会 执行 cb, 看结果应该是直接返回的
        return i;
      });

      expect(fn).toBeCalledTimes(4);
      expect(r.length).toBe(5);
      expect(r).toEqual([1, 2, 3, , 4]);
    });

    test('没有 返回值时, 返回与原数组长度一样的新数组, 每一项都是undefined', () => {
      expect(
        base.map((i) => {
          //todo
        }),
      ).toEqual([undefined, undefined, undefined, undefined]);
    });
  });

  describe('Array.of', () => {
    test('create Array', () => {
      expect(Array.of(1)).toEqual([1]);
      expect(Array.of()).toEqual([]);
      expect(Array.of(1, 2, 3)).toEqual([1, 2, 3]);
    });

    test('of() 方法可以在任何接受单个参数表示新数组长度的构造函数上调用', () => {
      const of = Array.of;
      function NotArray(len: number) {
        console.log('NotArray called with length', len);
      }

      const r1 = of.call(NotArray, 1, 2, 3);
      expect(r1).toMatchObject({
        0: 1,
        1: 2,
        2: 3,
        length: 3,
      });

      const r2 = of.call(Object, 1, 2, 3);
      // Number {3, 0: 1, 1: 2, 2: 3, length: 3}
      // matchObject 匹配是子类
      expect(r2).toMatchObject({
        0: 1,
        1: 2,
        2: 3,
        length: 3,
      });

      const r3 = of.call({}, 1);
      expect(r3).toEqual([1]);
    });
  });

  describe('[].pop', () => {
    const base = [1, 2, 3, 4];
    test('删除数组最后一个元素, 并返回', () => {
      const arr = [...base];
      expect(arr.pop()).toBe(4);
      expect(arr).toEqual([1, 2, 3]);
      expect([].pop()).toBe(undefined);
    });

    test('arrayLike', () => {
      const pop = Array.prototype.pop;
      const arrayLike = {
        length: 3,
        0: 1,
        2: 2,
        4: 4,
      };

      expect(pop.call(arrayLike)).toBe(2);
      expect(arrayLike).toEqual({
        length: 2,
        0: 1,
        4: 4,
      });
      expect(pop.call(arrayLike)).toBe(undefined);
      expect(arrayLike).toEqual({
        length: 1,
        0: 1,
        4: 4,
      });

      const plainObj = {};
      expect(pop.call(plainObj)).toEqual(undefined);
      expect(plainObj).toEqual({
        length: 0,
      });
    });
  });

  describe('[].push', () => {
    test('返回值是数组长度', () => {
      const base = [1, 2, 3, 4];
      const r = base.push(5);
      expect(r === base.length).toBe(true);
    });

    test('arrayLike', () => {
      const push = Array.prototype.push;
      const arrayLike = {
        length: 3,
        0: 1,
        2: 2,
        4: 4,
      };

      expect(push.call(arrayLike, 5)).toBe(4);
      expect(arrayLike).toEqual({
        length: 4,
        0: 1,
        2: 2,
        3: 5,
        4: 4,
      });

      expect(push.call(arrayLike, 6)).toBe(5);
      expect(arrayLike).toEqual({
        length: 5,
        0: 1,
        2: 2,
        3: 5,
        4: 6,
      });
    });
  });

  describe('[].reduce', () => {
    const base = [1, 2, 3, 4];
    test('没有指定初始值, 会默认将 arr[0] 当做初始值, 迭代从 1开始', () => {
      const fn = vi.fn();
      const r = base.reduce((prev, curr) => {
        fn();
        return prev + curr;
      });
      expect(r).toBe(10);
      expect(fn).toBeCalledTimes(3);
    });

    test('指定初始值, 从0开始迭代', () => {
      const fn = vi.fn();
      const r = base.reduce((prev, curr) => {
        fn();
        return prev + curr;
      }, 0);
      expect(r).toBe(10);
      expect(fn).toBeCalledTimes(4);
    });

    test('数组长度为1 且不提供初始值 或者 数组长度为0 提供初始值, 是不会执行 cb', () => {
      const fn = vi.fn();
      [1].reduce((p) => {
        fn();
        return p;
      });
      expect(fn).toBeCalledTimes(0);

      [].reduce((p) => {
        fn();
        return p;
      }, 1);
      expect(fn).toBeCalledTimes(0);
    });

    test('empty 不会执行cb', () => {
      const fn = vi.fn();
      [1, 2, , 3].reduce((p, c) => {
        fn();
        return (p || 0) + (c || 0);
      });
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 4,
        0: 2,
        1: 3,
        2: 4,
      };
      const fn = vi.fn();
      const reduce = Array.prototype.reduce;
      expect(
        reduce.call(
          arrayLike,
          (p, c) => {
            fn();
            return p + c;
          },
          0,
        ),
      ).toBe(9);
      expect(fn).toBeCalledTimes(3);
    });
  });

  describe('[].reduceRight', () => {
    const base = [1, 2, 3, 4];
    test('没有指定初始值, 会默认将 arr[length - 1] 当做初始值, 迭代从 length - 2开始', () => {
      const fn = vi.fn();
      const indexs: number[] = [];
      const r = base.reduceRight((prev, curr, i) => {
        fn();
        indexs.push(i);
        return prev + curr;
      });
      expect(r).toBe(10);
      expect(indexs).toEqual([2, 1, 0]);
      expect(fn).toBeCalledTimes(3);
    });

    test('指定初始值, 从length - 1开始迭代', () => {
      const fn = vi.fn();
      const indexs: number[] = [];
      const r = base.reduceRight((prev, curr, i) => {
        fn();
        indexs.push(i);
        return prev + curr;
      }, 0);
      expect(r).toBe(10);
      expect(indexs).toEqual([3, 2, 1, 0]);
      expect(fn).toBeCalledTimes(4);
    });

    test('数组长度为1 且不提供初始值 或者 数组长度为0 提供初始值, 是不会执行 cb', () => {
      const fn = vi.fn();
      [1].reduceRight((p) => {
        fn();
        return p;
      });
      expect(fn).toBeCalledTimes(0);

      [].reduceRight((p) => {
        fn();
        return p;
      }, 1);
      expect(fn).toBeCalledTimes(0);
    });

    test('empty 不会执行cb', () => {
      const fn = vi.fn();
      [1, 2, , 3].reduceRight((p, c) => {
        fn();
        return (p || 0) + (c || 0);
      });
      expect(fn).toHaveBeenCalledTimes(2);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 4,
        0: 2,
        1: 3,
        2: 4,
      };
      const fn = vi.fn();
      const reduceRight = Array.prototype.reduceRight;
      expect(
        reduceRight.call(
          arrayLike,
          (p, c) => {
            fn();
            return p + c;
          },
          0,
        ),
      ).toBe(9);
      expect(fn).toBeCalledTimes(3);
    });
  });

  describe('[].reverse', () => {
    test('返回的是原本数组的索引', () => {
      const base = [1, 2, 3, 4];
      const result = base.reverse();
      expect(base === result).toBe(true);
      expect(result).toEqual([4, 3, 2, 1]);
    });

    test('会保留empty', () => {
      const base = [, , 1, , 2];
      expect(base.reverse()).toEqual([2, , 1, , ,]);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        unrelated: 'foo',
        2: 4,
        3: 3,
      };
      const reverse = Array.prototype.reverse;
      // 2 会被删掉
      expect(reverse.call(arrayLike)).toEqual({
        length: 3,
        unrelated: 'foo',
        0: 4,
        3: 3,
      });
    });
  });

  describe('[].toReversed', () => {
    // 注意需要 node 版本20+ 而且现在ts 还没有 toReversed 类型定义
    test.skip('不会改变原数组', () => {
      const base = [1, 2, 3, 4];
      // @ts-ignore
      const r = base.toReversed();
      expect(r === base).toBe(false);
      expect(base).toEqual([1, 2, 3, 4]);
      expect(r).toEqual([4, 3, 2, 1]);
    });

    test.skip('empty 会变成 undefined', () => {
      const base = [, , 1, , 2];
      // @ts-ignore
      expect(base.toReversed()).toEqual([
        2,
        undefined,
        1,
        undefined,
        undefined,
      ]);
    });

    test.skip('', () => {
      const arrayLike = {
        length: 3,
        unrelated: 'foo',
        2: 4,
        3: 3,
      };

      //@ts-ignore
      const toReversed = Array.prototype.toReversed;
      // 0 1 不存在 会变成 undefined
      expect(toReversed.call(arrayLike)).toEqual([4, undefined, undefined]);
    });
  });

  describe('[].shift', () => {
    const base = [1, 2, 3, 4];
    test('删除数组第一个一个元素, 并返回', () => {
      const arr = [...base];
      expect(arr.shift()).toBe(1);
      expect(arr).toEqual([2, 3, 4]);
      expect([].shift()).toBe(undefined);
    });

    test('arrayLike', () => {
      const shift = Array.prototype.shift;
      const arrayLike = {
        length: 3,
        0: 1,
        2: 2,
        4: 4,
      };

      expect(shift.call(arrayLike)).toBe(1);
      expect(arrayLike).toEqual({
        length: 2,
        1: 2,
        4: 4,
      });
      expect(shift.call(arrayLike)).toBe(undefined);
      expect(arrayLike).toEqual({
        length: 1,
        0: 2,
        4: 4,
      });

      const plainObj = {};
      expect(shift.call(plainObj)).toEqual(undefined);
      expect(plainObj).toEqual({
        length: 0,
      });
    });
  });

  describe('[].slice', () => {
    const base = [1, 2, 3, 4];
    test('返回值是一个数组', () => {
      const r = base.slice();
      expect(r === base).toBe(false);
      expect(r).toEqual([1, 2, 3, 4]);
    });

    describe('start, end default length', () => {
      test('0 < start < length', () => {
        expect(base.slice(1)).toEqual([2, 3, 4]);
      });

      test('start >= length, 不提取任何元素', () => {
        expect(base.slice(7)).toEqual([]);
      });

      test('0 > start >= -length', () => {
        expect(base.slice(-1)).toEqual([4]);
        expect(base.slice(-4)).toEqual([1, 2, 3, 4]);
      });

      test('start < -length, 会当做0', () => {
        expect(base.slice(-5)).toEqual([1, 2, 3, 4]);
      });
    });

    describe('start default 0, end', () => {
      test('0 < end < length', () => {
        expect(base.slice(0, 1)).toEqual([1]);
      });

      test('end >= length, 变成 length', () => {
        expect(base.slice(0, 4)).toEqual([1, 2, 3, 4]);
      });

      test('0 > end >= -length, end 在规范化后小于或等于 start 不会截取', () => {
        expect(base.slice(0, -1)).toEqual([1, 2, 3]);
        expect(base.slice(0, -4)).toEqual([]);
      });

      test('end < -length, 会当做0', () => {
        expect(base.slice(0, -5)).toEqual([]);
      });
    });

    test('保留 empty', () => {
      expect([, , , 2].slice(0, 2)).toEqual([, ,]);
    });

    test('arrayLike', () => {
      const slice = Array.prototype.slice;
      const arrayLike = {
        length: 3,
        0: 2,
        2: 4,
        3: 5,
      };

      expect(slice.call(arrayLike, 0, 1)).toEqual([2]);
      const r = slice.call(arrayLike, 0, 2);
      expect(r).toEqual([2, undefined]); // 这里其实是empty
    });
  });

  describe('[].some', () => {
    const base = [1, 2, 3, 4];
    test('返回值是一个boolean', () => {
      expect(base.some((i) => i > 4)).toBe(false);
      expect(base.some((i) => i > 2)).toBe(true);
    });

    test('空数组总是返回 false', () => {
      expect([].some((i) => i > 4)).toBe(false);
    });

    test('empty 不会执行 cb', () => {
      const fn = vi.fn();
      [, , , 1, 2, 3].some((i) => {
        fn();
        return (i || 0) > 2;
      });

      expect(fn).toHaveBeenCalledTimes(3);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        0: 'a',
        1: 'b',
        2: 'c',
      };
      const some = [].some;
      expect(some.call(arrayLike, (v) => v === 'a')).toBe(true);
    });
  });

  describe('[].sort', () => {
    test('返回的是原数组的索引地址', () => {
      const base = [4, 3, 2, 1];
      const r = base.sort();
      expect(base === r).toBe(true);
      expect(r).toEqual([1, 2, 3, 4]);
    });

    test('没有传 compareFn, 默认使用字符编码升序', () => {
      const base = ['March', 'Jan', 'Feb', 'Dec'];
      expect(base.sort()).toEqual(['Dec', 'Feb', 'Jan', 'March']);

      const base1 = [1, 30, 4, 21, 100000];
      expect(base1.sort()).toEqual([1, 100000, 21, 30, 4]);
    });

    describe('compareFn parameter', () => {
      test('针对 number[], a - b, 升序', () => {
        const base = [1, 4, 3, 2];
        expect(base.sort((a, b) => a - b)).toEqual([1, 2, 3, 4]);
      });
      test('针对 number[], b - a, 降序', () => {
        const base = [1, 4, 3, 2];
        expect(base.sort((a, b) => b - a)).toEqual([4, 3, 2, 1]);
      });

      test('undefined 不会调用 cb', () => {
        const callAB: number[][] = [];
        const base = [undefined, undefined, 1, 3, 4, 2];
        base.sort((a, b) => {
          callAB.push([a || 0, b || 0]);
          return (a || 0) - (b || 0);
        });
        expect(base).toEqual([1, 2, 3, 4, undefined, undefined]);
        // 由此可见 sort 可能会对统一元素 执行多次
        expect(callAB).toEqual([
          [3, 1],
          [4, 3],
          [2, 4],
          [2, 3],
          [2, 1],
        ]);
      });

      test('empty 会被移到最后', () => {
        const base = [1, 2, undefined, , 3, 4];
        expect(base.sort()).toEqual([1, 2, 3, 4, undefined, ,]);
      });
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        unrelated: 'foo',
        0: 5,
        2: 4,
        3: 1,
      };

      const sort = [].sort;
      expect(sort.call(arrayLike)).toEqual({
        0: 4,
        1: 5,
        3: 1,
        length: 3,
        unrelated: 'foo',
      });
    });
  });

  describe('[].splice', () => {
    test('返回的是 被删除元素组成的数组', () => {
      const base = [1, 2, 3, 4];
      expect(base.splice(1, 2)).toEqual([2, 3]);
      expect(base).toEqual([1, 4]);
      expect([].splice(0)).toEqual([]);
      // @ts-ignore 不传start 不会删除
      expect([1, 2, 3].splice()).toEqual([]);
    });

    describe('start paramter, deleteCount default', () => {
      const base = [1, 2, 3, 4];
      test('0 <= start < length', () => {
        expect([...base].splice(1)).toEqual([2, 3, 4]);
        expect([...base].splice(3)).toEqual([4]);
      });

      test('start >= length', () => {
        expect([...base].splice(4)).toEqual([]);
        expect([...base].splice(5)).toEqual([]);
      });

      test('-length <= start < 0', () => {
        expect([...base].splice(-1)).toEqual([4]);
        expect([...base].splice(-3)).toEqual([2, 3, 4]);
      });

      test('-length > start, start 当做 0', () => {
        expect([...base].splice(-5)).toEqual([1, 2, 3, 4]);
      });

      test('start undefind', () => {
        // @ts-ignore 传undefined 会被视作 0
        expect([...base].splice(undefined)).toEqual([1, 2, 3, 4]);
      });
    });

    describe('start 1, deleteCount', () => {
      test('0 < deleteCount < length - start', () => {
        const base = [1, 2, 3, 4];
        expect([...base].splice(1, 2)).toEqual([2, 3]);
      });

      test('deleteCount >= length -start', () => {
        const base = [1, 2, 3, 4];
        expect([...base].splice(1, 4)).toEqual([2, 3, 4]);
      });

      test('deleteCount < 0', () => {
        const base = [1, 2, 3, 4];
        expect([...base].splice(1, -1)).toEqual([]);
        expect([...base].splice(1, 0)).toEqual([]);
      });
    });

    test('添加元素', () => {
      const base = [1, 2, 3, 4];
      expect(base.splice(1, 0, 5, 6)).toEqual([]);
      expect(base).toEqual([1, 5, 6, 2, 3, 4]);

      const base1 = [1, 2, 3, 4];
      expect(base1.splice(1, 2, 7, 8)).toEqual([2, 3]);
      expect(base1).toEqual([1, 7, 8, 4]);
    });

    test('删除部分包含empty 返回的数组中也是 empty', () => {
      expect([1, , , , 4].splice(1)).toEqual([, , , 4]);
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        unrelated: 'foo',
        0: 5,
        2: 4,
      };
      const splice = [].splice;
      // @ts-ignore
      expect(splice.call(arrayLike, 1, 2, 3, 4)).toEqual([, 4]); // 是empty
      expect(arrayLike).toEqual({
        0: 5,
        1: 3,
        2: 4,
        length: 3,
        unrelated: 'foo',
      });
    });
  });

  describe('[].toLocaleString', () => {
    const base = [1, 2, 3, 4];
    test('返回值是一个字符串', () => {
      expect(base.toLocaleString()).toBe('1,2,3,4');
    });

    test('数组中的undefined, null 会变成空串', () => {
      expect([1, undefined, 2, null, 3].toLocaleString()).toBe('1,,2,,3');
    });

    test('empty 会当做 undefined 处理', () => {
      expect([, , , , 1].toLocaleString()).toBe(',,,,1');
    });

    test('arrayLike', () => {
      const arrayLike = {
        length: 3,
        0: 1,
        1: 2,
        2: 3,
      };
      const toLocaleString = [].toLocaleString;
      expect(toLocaleString.call(arrayLike)).toBe('1,2,3');
    });
  });

  describe('[].toString', () => {
    const base = [1, 2, 3, 4];
    test('返回值是一个字符串', () => {
      expect(base.toString()).toBe('1,2,3,4');
    });

    test('其实调用的是 数组的join 方法', () => {
      const c = [...base];
      const originJoin = c.join;
      c.join = () => {
        return originJoin.call(c, '-');
      };
      expect(c.toString()).toBe('1-2-3-4');
    });

    test('当数组的join 不是一个方法时, 调用 Object.prototype.toString', () => {
      const c = [...base];
      // @ts-ignore
      c.join = 1;
      expect(c.toString()).toBe('[object Array]');
    });

    test('类数组对象, 如果存在join且是一个方法 就调用join, 否则使用的是 Object.prototype.toString', () => {
      const toString = [].toString;
      expect(
        toString.call({
          join: () => 1,
        }),
      ).toBe(1);
      expect(toString.call({})).toBe('[object Object]');
    });
  });
});
