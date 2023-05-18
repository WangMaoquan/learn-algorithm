/**
 * 题目:
 * 设计一个支持以下两种操作的数据结构
 * void addWord(word)
 * bool search(word)
 *
 * search(word) 可以搜索文字或正则表达式字符串，字符串只包含字母 . 或 a-z
 * . 可以表示任何一个字母
 *
 * 例子:
 * addWord("bad")
 * addWord("dad")
 * addWord("mad")
 *
 * search("pad") -> false
 * search("bad") -> true
 * search(".ad") -> true
 * search("b..") -> true
 *
 * 说明:
 * 你可以假设所有单词都是由小写字母 a-z 组成的
 */

export class WordDictionary {
  private words: Map<number, string[]>;
  constructor() {
    this.words = new Map();
  }

  addWord(str: string) {
    if (this.words.has(str.length)) {
      const records = this.words.get(str.length);
      records!.push(str);
    } else {
      this.words.set(str.length, [str]);
    }
  }
  search(str: string) {
    const records = this.words.get(str.length);
    // 处理没有记录的情况
    if (!records) {
      return false;
    }
    // 处理没有dot的字符串的情况
    if (!str.includes('.')) {
      return records.includes(str);
    }

    const reg = new RegExp(str);
    return records.some((r) => reg.test(r));
  }
}
