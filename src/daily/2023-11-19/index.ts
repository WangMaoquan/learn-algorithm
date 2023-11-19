/**

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其总和大于等于 target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。



示例 1：

输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
示例 2：

输入：target = 4, nums = [1,4,4]
输出：1
示例 3：

输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0


提示：

1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 105

*/

/**
 *  题目关键 连续项 之和 可以大于等于 target
 *
 *  我们求的是最小的这个连续项
 *
 *  所以我们首先想到的是 怎么去维护
 */

export function minSubArrayLen1(target: number, nums: number[]): number {
  const r: number[] = [];
  let len = Infinity;
  let currSum = 0;
  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    r.push(nums[i]);
    while (currSum >= target) {
      // 这里就是我们需要维护? 怎么维护 比如 2312 然后下一个是 4
      // 这里我们其实一眼就可以看出来 保持连续 直接把 2 踢了 变成 3124
      len = len < r.length ? len : r.length;
      currSum -= r.shift()!;
    }
  }
  return len === Infinity ? 0 : len;
}

// 完全没必要 使用 r 这样的数组, 我们只需要长度 长度 怎么来? 下标减

export function minSubArrayLen(target: number, nums: number[]): number {
  let start = 0; // 其实就是 r[0]
  let end = 0; // 其实就是 r[r.length - 1]
  let len = Infinity;
  let currSum = 0;
  for (let i = 0; i < nums.length; i++) {
    currSum += nums[i];
    while (currSum >= target) {
      const subLen = end - start + 1;
      len = len < subLen ? len : subLen;
      currSum -= nums[start++]!;
    }
    end++;
  }
  return len === Infinity ? 0 : len;
}
