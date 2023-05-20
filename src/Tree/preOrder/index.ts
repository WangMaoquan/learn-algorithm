/**
 * 题目
 * 给定一个二叉树，返回它的前序（先序）遍历序列
 *
 * 示例:
 * 输入: [1,null,2,3]
 * 输出: [1,2,3]
 *
 * 使用迭代算法
 */

import { TreeNode } from '..';

// 递归的思想其实就是 栈
// 所以我们这里使用 stack
// 先序遍历 是 根 左右
// 所以我们需要保证 根在栈顶
// 然后 再将 left right 入栈
export const preOrder = <T>(root: TreeNode<T>) => {
  const result: T[] = [];
  if (!root) {
    return result;
  }
  const stack: TreeNode<T>[] = [];
  stack.push(root);
  while (stack.length) {
    const top = stack.pop()!;
    result.push(top.value);

    // 因为是 左右 栈是先进后出 所以这里先push right 后push left
    top.right && stack.push(top.right);
    top.left && stack.push(top.left);
  }
  return result;
};
