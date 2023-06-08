/**
 * 题目:
 * 给定一个二叉树，判断它是否是高度平衡的二叉树
 *
 * 示例一:
 * 输入: 给定二叉树 [3,9,20,null,null,15,7]
 *     3
 *    / \
 *   9  20
 *  /  \
 * 15   7
 *
 * 输出: true
 *
 * 示例二:
 * 输入: [1,2,2,3,3,null,null,4,4]
 *
 *        1
 *       / \
 *      2   2
 *     / \
 *    3   3
 *   / \
 *  4   4
 * 输出: false
 *
 * 思路:
 * 平衡二叉树是任意结点的左右子树高度差绝对值都不大于1的二叉搜索树
 *
 * 1. 任意结点
 * 2. 左右子树高度差绝对值都不大于1
 * 3. 二叉搜索树
 */

import { TreeNode } from '..';

export function isBalanceBinaryTree(root: TreeNode) {
  // 是否 高度差都不大于一 的标记
  let flag = true;

  const dfs = (root?: TreeNode): number => {
    // 出口是 空树 或者 flag 已经是 false了
    if (!root || !flag) {
      return 0;
    }
    // 计算左子树的高度
    const left = dfs(root.left);
    // 计算右子树的高度
    const right = dfs(root.right);
    // 如果左右子树的高度差绝对值大于1，flag就破功了
    if (Math.abs(left - right) > 1) {
      flag = false;
      // 后面再发生什么已经不重要了，返回一个不影响回溯计算的值
      return 0;
    }
    // 返回当前子树的高度
    return Math.max(left, right) + 1;
  };

  dfs(root);
  return flag;
}
