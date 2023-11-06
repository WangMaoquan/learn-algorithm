/*

给你两个字符串：ransomNote 和 magazine ，判断 ransomNote 能不能由 magazine 里面的字符构成。

如果可以，返回 true ；否则返回 false 。

magazine 中的每个字符只能在 ransomNote 中使用一次。



示例 1：

输入：ransomNote = "a", magazine = "b"
输出：false
示例 2：

输入：ransomNote = "aa", magazine = "ab"
输出：false
示例 3：

输入：ransomNote = "aa", magazine = "aab"
输出：true


提示：

1 <= ransomNote.length, magazine.length <= 105
ransomNote 和 magazine 由小写英文字母组成

*/

// magazine

export function canConstruct(ransomNote: string, magazine: string): boolean {
  function initSourceMap(magazine: string) {
    const sourceMap = new Map<string, number>(); // magazine 中每个字符能使用的次数

    for (let i = 0; i < magazine.length; i++) {
      const s = magazine[i];
      if (sourceMap.has(s)) {
        const count = sourceMap.get(s)!;
        sourceMap.set(s, count + 1);
      } else {
        sourceMap.set(s, 1);
      }
    }

    return sourceMap;
  }

  const sourceMap = initSourceMap(magazine);

  for (let i = 0; i < ransomNote.length; i++) {
    const r = ransomNote[i];

    if (sourceMap.has(r)) {
      const count = sourceMap.get(r)!;
      if (count === 0) {
        return false;
      }
      sourceMap.set(r, count - 1);
    } else {
      return false;
    }
  }

  return true;
}
