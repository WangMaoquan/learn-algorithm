/*

给定一个单词数组 words 和一个长度 maxWidth ，重新排版单词，使其成为每行恰好有 maxWidth 个字符，且左右两端对齐的文本。

你应该使用 “贪心算法” 来放置给定的单词；也就是说，尽可能多地往每行中放置单词。必要时可用空格 ' ' 填充，使得每行恰好有 maxWidth 个字符。

要求尽可能均匀分配单词间的空格数量。如果某一行单词间的空格不能均匀分配，则左侧放置的空格数要多于右侧的空格数。

文本的最后一行应为左对齐，且单词之间不插入额外的空格。

注意:

单词是指由非空格字符组成的字符序列。
每个单词的长度大于 0，小于等于 maxWidth。
输入单词数组 words 至少包含一个单词。


示例 1:

输入: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
输出:
[
"This    is    an",
"example  of text",
"justification.  "
]
示例 2:

输入:words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
输出:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
解释: 注意最后一行的格式应为 "shall be    " 而不是 "shall     be",
因为最后一行应为左对齐，而不是左右两端对齐。       
第二行同样为左对齐，这是因为这行只包含一个单词。
示例 3:

输入:words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"]，maxWidth = 20
输出:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]


提示:

1 <= words.length <= 300
1 <= words[i].length <= 20
words[i] 由小写英文字母和符号组成
1 <= maxWidth <= 100
words[i].length <= maxWidth

*/

/**
 *
 * 分析
 * 非最后一行
 * 其实保证一行在尽可能的 放更多的单词, 然后保证 改行的长度为 maxWidth
 * 填充使用空串, 保证 左右两端对齐
 * 也会存在 `s1    s2( s4... )   s3` 和 `s1   s2`, 空串填充中间, 超过两个时,  不能平均分 才需要保证左侧空格数大于右侧
 *
 * 最后一行
 * 单词之间空格为 1. 然后是左对齐, 也就是填充右边就好了
 *
 *
 * 其实最后我们要处理的情况就是
 * 该行不是最后一行, 单词数量为2
 * 该行不是最后一行, 单词数量大于2
 * 该行是最后一行, 不论单词数量, 因为单词间空串固定
 *
 */

export const distributeWords = (
  words: string[],
  maxWidth: number,
): string[][] => {
  const r: string[][] = [];
  let i = 0;
  while (i < words.length) {
    let currStr = '';
    let w: string[] = [];
    while (i < words.length && currStr.length + words[i].length <= maxWidth) {
      currStr += words[i] + ' '; // 手动加上一个空格
      w.push(words[i]);
      i++;
    }
    r.push(w);
  }
  return r;
};

const createEmptyStr = (emptyStrCount: number): string => {
  let r = '';
  for (let i = 0; i < emptyStrCount; i++) {
    r += ' ';
  }
  return r;
};

export const oneWordRow = (words: string[], maxWidth: number): string => {
  let r = words[0];
  const appendEmptyStrCount = maxWidth - r.length;
  return r + createEmptyStr(appendEmptyStrCount);
};

export const lastRow = (words: string[], maxWidth: number): string => {
  let r = '';
  for (let i = 0; i < words.length; i++) {
    if (i === words.length - 1) {
      r += words[i];
    } else {
      r += words[i] + ' ';
    }
  }
  return oneWordRow([r], maxWidth);
};

export const twoWordsRow = (words: string[], maxWidth: number): string => {
  const emptyStrCount = maxWidth - words[0].length - words[1].length;
  return words[0] + createEmptyStr(emptyStrCount) + words[1];
};

export const moreWordsRow = (words: string[], maxWidth: number): string => {
  let wordsLen = 0;
  for (let i = 0; i < words.length; i++) {
    wordsLen += words[i].length;
  }
  const needEmptyStrCount = maxWidth - wordsLen;
  const preEmptyCount = Math.floor(needEmptyStrCount / (words.length - 1));
  let restEmptyCount = needEmptyStrCount % (words.length - 1);

  let r = '';
  for (let i = 0; i < words.length; i++) {
    r += words[i];
    if (i !== words.length - 1) {
      r += createEmptyStr(preEmptyCount);
      if (restEmptyCount-- > 0) {
        // 将多余的空格一个一个填充在前面, 保证左比右多
        r += ' ';
      }
    }
  }
  return r;
};

export function fullJustify(words: string[], maxWidth: number): string[] {
  const distributed = distributeWords(words, maxWidth);
  const r: string[] = [];
  for (let i = 0; i < distributed.length; i++) {
    let d = distributed[i];
    if (i === distributed.length - 1) {
      r.push(lastRow(d, maxWidth));
    } else if (d.length === 1) {
      r.push(oneWordRow(d, maxWidth));
    } else if (d.length === 2) {
      r.push(twoWordsRow(d, maxWidth));
    } else {
      r.push(moreWordsRow(d, maxWidth));
    }
  }
  return r;
}
