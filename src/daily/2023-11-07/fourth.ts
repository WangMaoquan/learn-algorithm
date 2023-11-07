/**

给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和。


示例 1：

输入:a = "11", b = "1"
输出："100"
示例 2：

输入：a = "1010", b = "1011"
输出："10101"


提示：

1 <= a.length, b.length <= 104
a 和 b 仅由字符 '0' 或 '1' 组成
字符串如果不是 "0" ，就不含前导零

*/

export function addBinary(a: string, b: string): string {
  let maxLen = Math.max(a.length, b.length);
  a = a.padStart(maxLen, '0');
  b = b.padStart(maxLen, '0');
  let r = new Array(maxLen + 1).fill(0);
  for (let i = maxLen - 1; i >= 0; i--) {
    const ai = Number(a[i]);
    const bi = Number(b[i]);
    const r0 = r[i + 1];
    const sum = ai + bi + r0;
    if (sum > 1) {
      r[i] = 1;
      r[i + 1] = sum === 2 ? 0 : 1;
    } else {
      r[i + 1] = sum;
    }
  }

  let rs = r.join('');
  while (rs.length > 1 && rs[0] === '0') {
    rs = rs.slice(1);
  }
  return rs;
}
