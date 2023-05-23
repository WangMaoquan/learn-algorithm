/**
 * 题目:
 * 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树
 * 一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1
 *
 * 示例:
 * [-10,-3,0,5,9],
 * 可能的答案 [0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
 *
 *       0
 *     / \
 *   -3   9
 *   /   /
 * -10  5
 */

import { TreeNode } from '..';

/**
 * 二叉搜索树的特性：题目中指明了目标树是一棵二叉搜索树，
 * 二叉搜索树的中序遍历序列是有序的，
 * 题中所给的数组也是有序的，因此我们可以认为题目中给出的数组就是目标二叉树的中序遍历序列。
 * 中序遍历序列的顺序规则是 左 -> 根 -> 右，
 * 因此数组中间位置的元素一定对应着目标二叉树的根结点。
 * 以根结点为抓手，把这个数组“拎”起来，得到的二叉树一定是符合二叉搜索树的排序规则的
 *
 * 平衡二叉树的特性: 一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1
 */

export const sortArrayToBST = (nums: number[]) => {
  if (!nums.length) {
    return null;
  }

  function buildBST(start: number, end: number) {
    if (start > end) {
      return null;
    }
    const mid = Math.floor(start + (end - start) / 2); // 获取数组中间下标, 这个作为 树的根
    const curr = new TreeNode(nums[mid]);
    const left = buildBST(start, mid - 1); // 构建左树
    const right = buildBST(mid + 1, end); // 构建右树
    left && (curr.left = left);
    right && (curr.right = right);
    return curr;
  }

  return buildBST(0, nums.length - 1);
};
