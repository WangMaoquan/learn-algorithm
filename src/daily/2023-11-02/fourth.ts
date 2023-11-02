/*
给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

你可以假设数组是非空的，并且给定的数组总是存在多数元素。


示例 1：

输入：nums = [3,2,3]
输出：3
示例 2：

输入：nums = [2,2,1,1,1,2,2]
输出：2

提示：
n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109

进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

*/

/**
 * 1. 保存对应的 item 出现的次数, 最后比较次数
 * 2. 变量保存当前最多的, 返回变量
 */

export function majorityElement(nums: number[]): number {
  const temp: Record<number, number> = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (temp[num]) {
      temp[num] = temp[num]! + 1;
    } else {
      temp[num] = 1;
    }
  }
  let max = 0;
  let r = 0;
  // 最开始使用的数组, 但是当 nums[i] 超大的时候, 形成的数组长度也就巨长, 遍历就炸了
  const keys = Object.keys(temp).map(Number);
  for (let i = 0; i < keys.length; i++) {
    const item = temp[keys[i]] || 0;
    if (max < item) {
      max = item;
      r = keys[i];
    }
  }
  return r;
}

// 借助题目的 大于 ⌊ n/2 ⌋ 的元素

export function majorityElement1(nums: number[]): number {
  const temp: Record<number, number> = {};
  const len = nums.length;
  for (let num of nums) {
    if (temp[num]) {
      if (++temp[num] > len / 2) {
        return num;
      }
    } else {
      temp[num] = 1;
    }
  }
  // 处理 数组长度为1
  return nums[0];
}
