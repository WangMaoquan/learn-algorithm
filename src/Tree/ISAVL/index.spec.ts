import { describe, test, expect } from 'vitest';
import { TreeNode } from '..';
import { isBalanceBinaryTree } from '.';

describe('is AVL', () => {
  test('给定一个二叉树，判断它是否是高度平衡的二叉树', () => {
    const tree = new TreeNode(10);
    const treeNode1 = new TreeNode(9);
    const treeNode2 = new TreeNode(12);
    tree.left = treeNode1;
    tree.right = treeNode2;

    expect(isBalanceBinaryTree(tree)).toBe(true);

    const treeNode3 = new TreeNode(8);
    const treeNode4 = new TreeNode(6);
    treeNode1.left = treeNode4;
    treeNode1.right = treeNode3;
    const tn5 = new TreeNode(4);
    const tn6 = new TreeNode(2);
    treeNode3.left = tn5;
    tn5.left = tn6;
    expect(isBalanceBinaryTree(tree)).toBe(false);
  });
});
