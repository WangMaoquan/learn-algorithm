import { describe, test, expect } from 'vitest';
import { TreeNode } from '..';
import { reverseTree } from '.';

describe('reverse tree', () => {
  test('反转二叉树', () => {
    const tree = new TreeNode(1);
    const treeNode2 = new TreeNode(2);
    const treeNode3 = new TreeNode(3);
    const treeNode4 = new TreeNode(4);
    tree.left = treeNode2;
    tree.right = treeNode3;
    treeNode3.left = treeNode4;

    const r = reverseTree(tree);
    // expect(r).toBe(tree);
    expect(r).toEqual({
      value: 1,
      left: {
        value: 3,
        right: {
          value: 4,
        },
      },
      right: {
        value: 2,
      },
    });
  });
});
