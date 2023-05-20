/**
 * 题目:
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值（即逐层地，从左到右访问所有节点）
 *
 * 示例:
 * 输入 [3,9,20,null,null,15,7],
 * 输出 [[3], [9, 20], [15, 7]]
 */

import { TreeNode } from '..';

export const levelOrder = <T>(root: TreeNode<T>) => {
  const result: T[][] = [];
  if (!root) {
    return result;
  }
  const queue: TreeNode<T>[] = [];
  queue.push(root);
  /**
   *  因为要根据层级 分组, 所以我们需要对原来的 层序遍历做一下调整, 就是为了 怎么去分组
   *         1
   *     2      3
   *   4   5  6  7
   *
   * 还没有push 1.left 1.right 的时候 queue [1] 然后经过 queue.unshift queue变成[]
   * 然后 push 进 left, right  queue 变成 [2, 3], 然后 queue.unshift queue 变成 [3, 4, 5]
   * 然后 unshift queue 变成 [4, 5], 然后 push left, right [4, 5, 6, 7]
   *
   * 我们想要的应该是这样
   * [1]
   * [2, 3]
   * [4, 5, 6, 7]
   *
   * 对比发现 有一步 [3, 4, 5] 这是怎么来的 是把2 unshift 了 然后 push进了 2.left 2.right
   * 如果我们 把 3也 shift 了 是不是就 直接生成 [4, 5, 6, 7]呢
   *
   * 怎么然后 2, 3 都shift queue.length 然后循环
   *
   * const len = queue.length // 保存当前层的 初始 queue 的长度, 因为 后面 push 会改变 queue.length
   * for (let i = 0; i< len; i++) { 
   *    const top = queue.shift();
   *    level.push(top.value)
   *    queue.push(top.left);
   *    queue.push(top.right);
   * }
   */
  while (queue.length) {
    const level: T[] = [];
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const top = queue.shift()!;
      level.push(top.value);
      top.left && queue.push(top.left);
      top.right && queue.push(top.right);
    }
    result.push(level);
  }
  return result;
};
