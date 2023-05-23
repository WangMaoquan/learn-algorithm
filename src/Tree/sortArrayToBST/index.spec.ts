import { describe, test, expect } from 'vitest';
import { sortArrayToBST } from '.';
import { TreeNode } from '..';

describe('有序数组 转 二叉树', () => {
  test('sort array to BST', () => {
    expect(sortArrayToBST([])).toBe(null);
    const resultTree = {
      value: 0,
      left: {
        value: -10,
        right: {
          value: -3,
        },
      },
      right: {
        value: 5,
        right: {
          value: 9,
        },
      },
    };
    expect(sortArrayToBST([-10, -3, 0, 5, 9])).toEqual(resultTree);
  });
});
