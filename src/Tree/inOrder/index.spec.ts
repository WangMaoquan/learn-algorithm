import { describe, test, expect } from 'vitest';
import { TreeNode } from '..';
import { inOrder } from '.';

describe('in order', () => {
  test('中序遍历', () => {
    const tree = new TreeNode(1);
    const treeNode2 = new TreeNode(2);
    const treeNode3 = new TreeNode(3);
    const treeNode4 = new TreeNode(4);
    tree.left = treeNode2;
    tree.right = treeNode3;
    treeNode3.left = treeNode4;

    expect(inOrder(tree)).toEqual([2, 1, 4, 3]);
  });
});
