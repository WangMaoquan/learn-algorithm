/**
 * 题目:
 * 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合
 *
 * 示例:
 * 输入: n = 4, k = 2
 *
 * 输出: [[2,4],[3,4],[2,3],[1,2],[1,3],[1,4]]
 */

// 也就是 当 curr.length  === k 时 我们才需要 push 进 result 同时也要 中止 这次递归
// 这个满足条件的过程 称为剪枝
// 在深度优先搜索中，有时我们会去掉一些不符合题目要求的、没有作用的答案，进而得到正确答案。这个丢掉答案的过程，形似剪掉树的枝叶，所以这一方法被称为“剪枝”

export const rangeOfCombination = (n: number, k: number) => {
  const result: number[][] = [];
  const curr: number[] = [];

  // 主要逻辑
  const dfs = (index: number) => {
    if (curr.length === k) {
      // 只有长度满足 k 才会被push
      result.push(curr.slice());
      return;
    }
    // 生成 1 - n 的值
    for (let i = index; i <= n; i++) {
      curr.push(i);
      dfs(i + 1);
      curr.pop();
    }
  };
  dfs(1); // 从1 开始
  return result;
};
