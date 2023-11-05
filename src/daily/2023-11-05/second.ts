/*

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。



示例 1：

输入：strs = ["flower","flow","flight"]
输出："fl"
示例 2：

输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。


提示：

1 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] 仅由小写英文字母组成

*/

export function longestCommonPrefix(strs: string[]): string {
  if (strs.length === 1) {
    return strs[0];
  }

  let minStr = strs.sort((s1, s2) => s1.length - s2.length)[0];
  for (let i = 0; i < strs.length; i++) {
    while (!strs[i].startsWith(minStr)) {
      if (minStr.length === 0) {
        return '';
      }
      minStr = minStr.slice(0, -1);
    }
  }
  return minStr;
}
