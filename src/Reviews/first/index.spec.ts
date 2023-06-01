import { describe, test, expect } from 'vitest';
import {
  dailyTemperature,
  hammingWeight,
  isValid,
  mergeTwoLists,
  mergeTwoOrderedArrays,
  plusOne,
  threeSum,
  twoSum,
} from '.';
import { LinkNode, printLinkList } from '@/LinkedList';

describe('两数求和', () => {
  test('twosum', () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });
});

describe('合并两个有序数组', () => {
  test('merge two ordered arrays', () => {
    expect(mergeTwoOrderedArrays([1, 2, 3], 3, [2, 5, 6], 3)).toEqual([
      1, 2, 2, 3, 5, 6,
    ]);
    expect(mergeTwoOrderedArrays([1, 2, 3], 3, [1, 2, 5, 6], 4)).toEqual([
      1, 1, 2, 2, 3, 5, 6,
    ]);
    expect(mergeTwoOrderedArrays([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3)).toEqual([
      1, 2, 2, 3, 5, 6,
    ]);
  });
});

describe('寻找数组中 三个数之和 为0', () => {
  test('three sum', () => {
    expect(threeSum([-1, 0, 1, 2, -1, -4])).toEqual([
      [-1, -1, 2],
      [-1, 0, 1],
    ]);
  });
});

describe('有效括号', () => {
  test('is vaild', () => {
    expect(isValid('()')).toBe(true);
    expect(isValid('([)')).toBe(false);
    expect(isValid('')).toBe(true);
  });
});

describe('合并有序链表', () => {
  test('mergeTwoLists', () => {
    const link1 = new LinkNode(1);
    const link2 = new LinkNode(2);
    const link3 = new LinkNode(3);
    const link7 = new LinkNode(6);

    const link4 = new LinkNode(4);
    const link5 = new LinkNode(5);
    const link6 = new LinkNode(6);

    link1.next = link2;
    link2.next = link3;
    link3.next = link7;

    link4.next = link5;
    link5.next = link6;

    const merged = mergeTwoLists(link1, link4);
    expect(printLinkList(merged!)).toBe('1->2->3->4->5->6->6');
  });
});

describe('给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。', () => {
  test('plus one', () => {
    expect(plusOne([1, 2, 3])).toEqual([1, 2, 4]);
    expect(plusOne([9])).toEqual([1, 0]);
  });
});

describe('根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替', () => {
  test('daily temperature', () => {
    const temperature = [73, 74, 75, 71, 69, 72, 76, 73];
    const result = dailyTemperature(temperature);
    expect(result).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });
});

describe('编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 1 的个数（也被称为汉明重量)', () => {
  test('hammingWeight', () => {
    expect(hammingWeight(123)).toBe(6);
  });
});
