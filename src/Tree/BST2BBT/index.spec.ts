import { describe, test, expect } from 'vitest';
import { TreeNode } from '..';
import { BST2BBT } from '.';
import { isBalanceBinaryTree } from '../ISAVL';
import { isValidBST } from '../isBST';

describe('BST to BBT', () => {
  test('给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值', () => {
    const tree = new TreeNode(5);
    const tn1 = new TreeNode(4);
    const tn2 = new TreeNode(3);
    const tn3 = new TreeNode(2);
    tn3.left = new TreeNode(1);
    tn2.left = tn3;
    tn1.left = tn2;
    tree.left = tn1;

    const avl = BST2BBT(tree)!;

    expect(isBalanceBinaryTree(avl)).toBe(true);
    expect(isValidBST(avl)).toBe(true);
    expect(avl).toEqual({
      value: 3,
      left: {
        value: 1,
        right: {
          value: 2,
        },
      },
      right: {
        value: 4,
        right: {
          value: 5,
        },
      },
    });
  });
});
