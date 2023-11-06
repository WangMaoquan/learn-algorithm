/*

给定一种规律 pattern 和一个字符串 s ，判断 s 是否遵循相同的规律。

这里的 遵循 指完全匹配，例如， pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。



示例1:

输入: pattern = "abba", s = "dog cat cat dog"
输出: true
示例 2:

输入:pattern = "abba", s = "dog cat cat fish"
输出: false
示例 3:

输入: pattern = "aaaa", s = "dog cat cat dog"
输出: false


提示:

1 <= pattern.length <= 300
pattern 只包含小写英文字母
1 <= s.length <= 3000
s 只包含小写英文字母和 ' '
s 不包含 任何前导或尾随对空格
s 中每个单词都被 单个空格 分隔

*/

export function wordPattern(pattern: string, s: string): boolean {
  const sSplited = s.split(' '); // 空格分割
  const s2t: Map<string, string> = new Map();
  const t2s: Map<string, string> = new Map();

  if (pattern.length !== sSplited.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    const sChar = pattern[i];
    const tChar = sSplited[i];
    if (
      (t2s.has(tChar) && t2s.get(tChar) !== sChar) ||
      (s2t.has(sChar) && s2t.get(sChar) !== tChar)
    ) {
      return false;
    }
    s2t.set(sChar, tChar);
    t2s.set(tChar, sChar);
  }
  return true;
}
