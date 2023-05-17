/**
 * 题目:
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组\
 * 答案中不可以包含重复的三元组
 *
 * 示例:
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]
 * 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 */

export const threeSum = (nums: number[]) => {
  const result: number[][] = [];
  // 双指针需要 有序的数组
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    let l = i + 1;
    let r = nums.length - 1;
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    while (l < r) {
      const sum = nums[i] + nums[r] + nums[l];
      if (sum === 0) {
        result.push([i, l, r]);
        r--;
        l++;
        while (r < l && nums[r] === nums[r - 1]) {
          r--;
        }
        while (r < l && nums[l] === nums[l + 1]) {
          l++;
        }
      } else if (sum < 0) {
        l++;
        while (r < l && nums[l] === nums[l + 1]) {
          l++;
        }
      } else {
        r--;
        while (r < l && nums[l] === nums[l - 1]) {
          r--;
        }
      }
    }
  }

  return result;
};
