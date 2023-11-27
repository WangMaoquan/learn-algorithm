/*

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

示例 1:

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
示例 2:

输入: strs = [""]
输出: [[""]]
示例 3:

输入: strs = ["a"]
输出: [["a"]]


提示：

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] 仅包含小写字母

*/

/**
 * 字母异位词 其实我们可以很简单的理解为 str.split().sort().join('') 后的结果是一样的
 */

export function groupAnagrams(strs: string[]): string[][] {
  const r: string[][] = [];
  const temp = strs.slice().map((str) => str.split('').sort().join(''));
  const map = new Map<string, string[]>();

  for (let i = 0; i < temp.length; i++) {
    if (map.has(temp[i])) {
      const s = map.get(temp[i])!;
      s.push(strs[i]);
    } else {
      map.set(temp[i], [strs[i]]);
    }
  }

  for (let [v, strs] of map) {
    r.push(strs);
  }

  return r;
}

/*

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 O(n) 的算法解决此问题。



示例 1：

输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
示例 2：

输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9


提示：

0 <= nums.length <= 105
-109 <= nums[i] <= 109

*/

/*

是否能连续? 即 存在 curr + 1. 

怎么判断存在? 遍历寻找 or map 存在

*/

export function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let r = 0;
  for (let i = 0; i < nums.length; i++) {
    let curr = nums[i];
    // 不判断 会超时, 因为长度为 1 其实我们没必要去 while
    if (!set.has(curr - 1)) {
      let cr = 1;
      while (set.has(curr + 1)) {
        curr++;
        cr++;
      }
      r = Math.max(cr, r);
    }
  }
  return r;
}
