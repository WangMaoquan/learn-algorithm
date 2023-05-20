import { describe, test, expect } from 'vitest';
import { TreeNode } from '..';
import { levelOrder } from '.';

describe('level order', () => {
  test('返回树结构的每一层', () => {
    const tree = new TreeNode(1);
    const treeNode2 = new TreeNode(2);
    const treeNode3 = new TreeNode(3);
    const treeNode4 = new TreeNode(4);
    tree.left = treeNode2;
    tree.right = treeNode3;
    treeNode3.left = treeNode4;

    expect(levelOrder(tree)).toEqual([[1], [2, 3], [4]]);
  });
});
