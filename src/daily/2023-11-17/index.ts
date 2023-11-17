/*

将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：

P   A   H   N
A P L S I I G
Y   I   R
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);


示例 1：

输入：s = "PAYPALISHIRING", numRows = 3
输出："PAHNAPLSIIGYIR"
示例 2：
输入：s = "PAYPALISHIRING", numRows = 4
输出："PINALSIGYAHRPI"
解释：
P     I    N
A   L S  I G
Y A   H R
P     I
示例 3：

输入：s = "A", numRows = 1
输出："A"


提示：

1 <= s.length <= 1000
s 由英文字母（小写和大写）、',' 和 '.' 组成
1 <= numRows <= 1000

*/

/*

N 型 其实很好理解, 通过 numRows 控制行数, 读取字符串 也就是 以从上往下、从左到右进行 Z 排列

最后要求我们的是 从左到右 逐行读取, 首先我们需要知道 每一行存在哪些字符, 其实就是找规律

当 numRows = 1

0 1 2 3 4 5 6 7 8

当 numRows = 2

0 2 4 6 8
1 3 5 7 9


当 numRows = 3

0   4   8     12
1 3 5 7 9  11 13 
2   6   10    14


当 numRows = 4

0     6       12        18
1   5 7    11 13     17
2 4   8 10    14  16
3     9       15

当 numRows = 5

0     8         16
1   7 9      15 17
2  6  10   14   18
3 5   11 13     19
4     12        20

最显而易见的规律 就是 第一行 和 第 numRows 行

numRows  1  2  3  4  5  6

间隔     0  2  4  6  8  10

*/

/* 

我们只要处理复数的 𠄌 这个形状的 字符串

0
1 3
2

4
5 7
6

*/

export function convert(s: string, numRows: number): string {
  if (numRows === 1) {
    return s;
  }
  const strArr = new Array<string>(numRows).fill('');
  let start = 0;
  let span = 2 * (numRows - 1); // 间隔
  let end = span + start;

  while (start < s.length) {
    let tempS = s.slice(start, end);
    for (let i = 0; i < numRows; i++) {
      if (i === 0 || i === numRows - 1) {
        strArr[i] += ensureStr(tempS[i]);
      } else {
        strArr[i] += ensureStr(tempS[i]) + ensureStr(tempS[span - i]);
      }
    }

    start = end;
    end = span + start;
  }
  return strArr.join('');
}

const ensureStr = (s: string | undefined): string => {
  return s || '';
};
