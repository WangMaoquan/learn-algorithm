/**
 * 题目:
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 * 如果不存在公共前缀，返回空字符串 ""
 *
 * 示例 1：
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 * 示例2:
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 *
 * 示例3:
 * 输入: strs = ["dog"]
 * 输出: "dog"
 *
 * 提示:
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 */

export function longestCommonPrefix(strs: string[]): string {
  let s = '';
  if (strs.length === 0) {
    return s;
  } else if (strs.length === 1) {
    return strs[0];
  }
  let start = 0;
  while (start < strs[0].length) {
    s += strs[0][start];
    if (strs.every((str) => str.startsWith(s))) {
      start++;
    } else {
      s = s.slice(0, start);
      break;
    }
  }

  return s;
}
