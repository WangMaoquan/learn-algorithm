import { describe, test, expect } from 'vitest';
import { TreeNode } from '..';
import { postOrder } from '.';

describe('post order', () => {
  test('后序遍历', () => {
    const tree = new TreeNode(1);
    const treeNode2 = new TreeNode(2);
    const treeNode3 = new TreeNode(3);
    const treeNode4 = new TreeNode(4);
    tree.left = treeNode2;
    tree.right = treeNode3;
    treeNode3.left = treeNode4;

    expect(postOrder(tree)).toEqual([2, 4, 3, 1]);
  });
});
