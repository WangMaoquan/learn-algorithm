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
