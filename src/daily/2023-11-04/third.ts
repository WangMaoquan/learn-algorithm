/*

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

请 不要使用除法，且在 O(n) 时间复杂度内完成此题。



示例 1:

输入: nums = [1,2,3,4]
输出: [24,12,8,6]
示例 2:

输入: nums = [-1,1,0,-3,3]
输出: [0,0,9,0,0]


提示：

2 <= nums.length <= 105
-30 <= nums[i] <= 30
保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内

进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）
*/

export function productExceptSelf(nums: number[]): number[] {
  const len = nums.length;
  const L = new Array<number>(len);
  const R = new Array<number>(len);
  const result = new Array<number>(len);
  L[0] = 1;
  for (let i = 1; i < len; i++) {
    L[i] = nums[i - 1] * L[i - 1];
  }
  R[len - 1] = 1;
  for (let i = len - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1];
  }

  for (let i = 0; i < len; i++) {
    result[i] = R[i] * L[i];
  }

  return result;
}
