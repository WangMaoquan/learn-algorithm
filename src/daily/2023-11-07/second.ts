/*

给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且 abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。


示例 1：

输入：nums = [1,2,3,1], k = 3
输出：true
示例 2：

输入：nums = [1,0,1,1], k = 1
输出：true
示例 3：

输入：nums = [1,2,3,1,2,3], k = 2
输出：false


提示：

1 <= nums.length <= 105
-109 <= nums[i] <= 109
0 <= k <= 105

*/

// 找到重复元素
// 然后 和 k 比较
// 比较会出现 大于 k 情况是不允许的 所以需要更新 map[nums[i]] = i
export function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (map.has(num)) {
      const prev = map.get(num)!;
      if (Math.abs(prev - i) <= k) {
        return true;
      }
      // 更新
      map.set(num, i);
    } else {
      map.set(num, i);
    }
  }
  return false;
}
