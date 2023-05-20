/**
 * 题目:
 * 翻转一棵二叉树
 *
 * 示例：
 * 输入:
 *            4
 *         /   \
 *       2     7
 *     / \   / \
 *   1   3 6   9
 *
 * 输出:
 *      4
 *    /   \
 *   7     2
 *  / \   / \
 * 9   6 3   1
 */

import { TreeNode } from '..';

/**
 * 反转的其实是 左右节点
 */

export const reverseTree = <T>(root?: TreeNode<T>) => {
  if (!root) {
    return root;
  }
  let right = reverseTree(root.right);
  let left = reverseTree(root.left);
  root.left = right;
  root.right = left;
  return root;
};
