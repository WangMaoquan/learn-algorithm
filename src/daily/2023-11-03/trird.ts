/*

给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。


示例 1：

输入：nums = [2,3,1,1,4]
输出：true
解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
示例 2：

输入：nums = [3,2,1,0,4]
输出：false
解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。


提示：

1 <= nums.length <= 104
0 <= nums[i] <= 105

*/

/**
 * 初始位置在 arr[0] 我们可以根据 arr[0] 的值取 [1, arr[0]] 去跳跃, 依次类推, 最后需要达到 arr.length - 1 这个下标
 */

// 打算是化成小部分的来做, 但是 for 循环 那超时..., 后续把dp 贪心看了看能不能优化
export function canJump1(nums: number[]): boolean {
  const step = nums[0];
  if (step >= nums.length - 1) {
    return true;
  } else if (step === 0) {
    return false;
  }
  if (step >= 2) {
    // todo 优化
    for (let i = step; i > 0; i--) {
      if (canJump(nums.slice(i))) {
        return true;
      }
    }
    return false;
  } else {
    return canJump(nums.slice(1));
  }
}

// 核心思路就是 保存 能达到的最远距离

export function canJump(nums: number[]): boolean {
  let step = 0;
  for (let i = 0; i < nums.length; i++) {
    step = Math.max(nums[i], step);
    if (step >= nums.slice(i).length - 1) {
      return true;
    } else if (step === 0) {
      return false;
    }
    step--;
  }
  return false;
}
