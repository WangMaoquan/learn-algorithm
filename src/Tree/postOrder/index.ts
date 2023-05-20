/**
 * 题目
 * 给定一个二叉树，返回它的后序遍历序列
 *
 * 示例:
 * 输入: [1,null,2,3]
 * 输出: [3, 2, 1]
 *
 * 使用迭代算法
 */

import { TreeNode } from '..';

// 后序遍历 是 左 右 根
// 和 根 左 右 就是 根的位置发生了变化 所以我们可以不从尾巴插入, 从头插入
export const postOrder = <T>(root: TreeNode<T>) => {
  const result: T[] = [];
  if (!root) {
    return result;
  }
  const stack: TreeNode<T>[] = [];
  stack.push(root);
  while (stack.length) {
    const curr = stack.pop()!;
    result.unshift(curr.value); // [left, right,root] => 先push left 再push right
    curr.left && stack.push(curr.left);
    curr.right && stack.push(curr.right);
  }
  return result;
};
