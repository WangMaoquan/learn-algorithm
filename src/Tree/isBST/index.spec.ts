import { describe, test, expect } from 'vitest';
import { TreeNode } from '..';
import { isValidBST } from '.';

describe('isBST', () => {
  test('isValidBST', () => {
    const tree = new TreeNode(10);
    const treeNode1 = new TreeNode(9);
    const treeNode2 = new TreeNode(12);
    tree.left = treeNode1;
    tree.right = treeNode2;

    expect(isValidBST(tree)).toBe(true);

    const treeNode3 = new TreeNode(14);
    treeNode1.left = treeNode3;

    expect(isValidBST(tree)).toBe(false);
  });
});
