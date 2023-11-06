/*

给定两个字符串 s 和 t ，判断它们是否是同构的。

如果 s 中的字符可以按某种映射关系替换得到 t ，那么这两个字符串是同构的。

每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。



示例 1:

输入：s = "egg", t = "add"
输出：true
示例 2：

输入：s = "foo", t = "bar"
输出：false
示例 3：

输入：s = "paper", t = "title"
输出：true


提示：

1 <= s.length <= 5 * 104
t.length == s.length
s 和 t 由任意有效的 ASCII 字符组成

*/

// 题目的意思大概就是 s 是 abb 形式 / t 也必须是 abb 形式

export function isIsomorphic1(s: string, t: string): boolean {
  function createIsomorphicArr(s: string) {
    const isomorphicMap = new Map<string, number[]>(); // char => indexs

    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (isomorphicMap.has(c)) {
        isomorphicMap.get(c)!.push(i);
      } else {
        isomorphicMap.set(c, [i]);
      }
    }

    const isomorphicArr: string[] = [];

    isomorphicMap.forEach((v) => {
      isomorphicArr.push(v.join(','));
    });

    return isomorphicArr;
  }

  const sArr = createIsomorphicArr(s);
  const tArr = createIsomorphicArr(t);

  return sArr.length === tArr.length
    ? sArr.join(',') === tArr.join(',')
    : false;
}

// 是否同构主要判断的其实就是 重复字符 的形式, 借助这个思路 (距离 abb 和 cdd) 我们可以维护 两个 map 时  map1[b] = d map2[d] = b
// 即 我们只需要判断 map1[i] === t[i]  map2[i] === s[i]

export function isIsomorphic(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }

  const s2t: Record<string, string> = {};
  const t2s: Record<string, string> = {};

  for (let i = 0; i < s.length; i++) {
    const sChar = s[i];
    const tChar = t[i];
    if (
      (t2s[tChar] && sChar !== t2s[tChar]) ||
      (s2t[sChar] && s2t[sChar] !== tChar)
    ) {
      return false;
    }
    s2t[sChar] = tChar;
    t2s[tChar] = sChar;
  }
  return true;
}
