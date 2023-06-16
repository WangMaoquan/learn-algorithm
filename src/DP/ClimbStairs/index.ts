/**
 * 题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 注意：给定 n 是一个正整数。
 *
 * 示例1 :
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 1 阶 + 1 阶
 * 2 阶
 *
 * 示例 2：
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 1 阶 + 1 阶 + 1 阶
 * 1 阶 + 2 阶
 * 2 阶 + 1 阶
 */

/**
 * 使用递归的方式解决
 * 这样是有个问题的, 重复计算, 所以我们可以加个缓存
 * @param n
 * @returns
 */
export function baseClimbStairs(n: number): number {
  // 处理递归边界
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  // 递归计算
  return baseClimbStairs(n - 1) + baseClimbStairs(n - 2);
}

/**
 * 使用cache 缓存
 */
const cache: number[] = [];
export function climbStairsUseCache(n: number): number {
  if (n == 1) {
    return 1;
  }
  if (n == 2) {
    return 2;
  }
  // 若cache[n]不存在，则进行计算
  if (cache[n] === undefined) {
    cache[n] = climbStairsUseCache(n - 1) + climbStairsUseCache(n - 2);
  }
  // 若cache[n]已经求解过，直接返回
  return cache[n];
}

/**
 * 使用动态规划
 */

export function climbStairs(n: number): number {
  // 初始化状态数组
  const f = [];
  // 初始化已知值
  f[1] = 1;
  f[2] = 2;
  // 动态更新每一层楼梯对应的结果
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 2] + f[i - 1];
  }
  // 返回目标值
  return f[n];
}
