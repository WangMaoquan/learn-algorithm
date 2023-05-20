/**
 * 题目:
 * 给定一个没有重复数字的序列，返回其所有可能的全排列
 *
 * 示例：
 * 输入: [1,2,3]
 * 输出: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 */

/**
 * 题目可以这么理解: 拿到一个 n 个数的数组作为入参，穷举出这 n 个数的所有排列方式
 *
 * 穷举 我们可以想到用递归来实现
 *
 * 递归 需要知道 递归的出口, 由题目可以知道 全排列的每一项数组长度 其实就是 原本数组的长度 也就是 nums.length 就把此时 生成好的 push 进result 就行了
 *
 * 我们来画个图
 *                  root
 *
 *         1         2         3
 *     2     3   1     3    1     2
 *     3     2   3     1    2     1
 *
 * 看图是每一层我们只需要 确定一个数字, 将这个数字存放在 curr 里面  当层数 达到3时 我们就把 curr push 进 result, 然后结束这次
 *
 * 现在我们需要知道 怎么去控制 我们去确定 push 进 curr 的这个数字, 保存进一个map
 *
 * 怎么去维护 这个 curr 是不是 当这次 curr push 进 result 后 也就是 结束那次函数调用后 之后的代码 我们应该把 push 进 curr 的那个元素 给 pop掉
 *
 * 同时是不是应该把 那个元素在 map 中 使用的flag 重置
 */

export const permutation = (nums: number[]) => {
  const len = nums.length;
  const result: number[][] = [];
  const curr: number[] = [];
  const visited: Record<number, number> = {};

  function dfs(nth: number) {
    if (nth === len) {
      result.push(curr.slice());
      return;
    }
    // 检查手里剩下的数字有哪些
    for (let i = 0; i < len; i++) {
      // 若 nums[i] 之前没被其它坑位用过，则可以理解为“这个数字剩下了”
      if (!visited[nums[i]]) {
        // 给 nums[i] 打个“已用过”的标
        visited[nums[i]] = 1;
        // 将nums[i]推入当前排列
        curr.push(nums[i]);
        // 基于这个排列继续往下一个坑走去
        dfs(nth + 1);
        // nums[i]让出当前坑位
        curr.pop();
        // 下掉“已用过”标识
        visited[nums[i]] = 0;
      }
    }
  }
  // 从索引为 0 的坑位（也就是第一个坑位）开始 dfs
  dfs(0);
  return result;
};
