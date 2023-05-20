/**
 * 题目:
 * 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）
 *
 * 说明:
 * 不能包含重复的子集
 *
 * 示例:
 * 输入: [1, 2, 3]
 *
 * 输出: [[3],[1],[2],[1,2,3],[1,3],[2,3],[1,2],[]]
 */

/**
 * 思路分析
 * 返回的是所有子集, 也就是说, 其实我们在填充 curr 时可以选择不填充 也就是 也就是说 直接将会 curr push 进result
 *
 * 现在的每一层其实 就对应着 num 的下标 我们做的就是选 与 不选 那个下标 对应的值
 *
 *                          root
 * 1               选                 不选
 * 2        选         不选        选       不选
 * 3      选   不选  选  不选    选  不选  选  不选
 *
 *
 *
 * 讲上面的图换一下
 *
 * curr 可以生成的情况
 *
 * root                                         []
 * 第一层                          [1]                        []
 * 第二层              [1, 2]             [1]            [2]     []
 * 第三层      [1, 2, 3]  [1, 2]     [1, 3]  [1]    [2, 3] [2]  [3]  []
 *
 * 现在这么看 生成的是有重复的, 我们现在需要思考的 怎么去重
 *
 * 咋一看我们是需要 去重的 但实际上 我们只需要结束完一次 dfs  curr.pop() 一下
 *
 * 其实上面图 展示的 curr 的变化过程
 */

export const subset = (nums: number[]) => {
  const result: number[][] = [];
  const curr: number[] = [];

  const dfs = (index: number) => {
    // 调用一次 dfs 就push 进 result 一次
    result.push(curr.slice());
    // for 循环 这里可以当做出口 也就是 i === nums.length 就跳出这一次了
    // 为啥需要 i = index 因为我们传入 index 是nums 下标, 也就是我们需要 选或者不选 nums[i]
    for (let i = index; i < nums.length; i++) {
      curr.push(nums[i]); // 选中 当前的 nums[i]
      dfs(i + 1);
      curr.pop(); // pop 掉就以为着不选 num[i]
    }
  };
  dfs(0);
  return result;
};
