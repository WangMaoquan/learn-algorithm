import { describe, test, expect } from 'vitest';
import {
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
