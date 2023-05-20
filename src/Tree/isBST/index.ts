/**
 * 题目
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树
 *
 * 示例1:
 * 输入:
 *     2
 *   / \
 *  1   3
 * 输出: true
 *
 * 示例2:
 * 输入:
 *       5
 *     / \
 *    1   4
 *       / \
 *      3   6
 * 输出: false
 */

import { TreeNode } from '..';

export const isValidBST = (root: TreeNode<number>) => {
  const dfs = (
    root?: TreeNode<number>,
    minValue = -Infinity,
    maxValue = Infinity,
  ): boolean => {
    if (!root) {
      return true;
    }
    // 比最小值还小, 比最大值还大 返回false
    if (root.value <= minValue || root.value >= maxValue) {
      return false;
    }
    return (
      dfs(root.left, minValue, root.value) &&
      dfs(root.right, root.value, maxValue)
    );
  };
  return dfs(root);
};
