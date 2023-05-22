/**
 * 题目:
 * 给你两个二进制字符串 a 和 b ，以二进制字符串的形式返回它们的和
 *
 * 示例 1：
 * 输入:a = "11", b = "1"
 * 输出："100"
 *
 * 示例 2：
 * 输入：a = "1010", b = "1011"
 * 输出："10101"
 *
 * 提示:
 * 1 <= a.length, b.length <= 104
 * a 和 b 仅由字符 '0' 或 '1' 组成
 * 字符串如果不是 "0" ，就不含前导零
 */

export function addBinary(a: string, b: string): string {
  if (a === '0' || b === '0') {
    return a === '0' ? b : a;
  } else if (a === '0' && b === '0') {
    return '0';
  } else {
    let ae = a.length - 1;
    let be = b.length - 1;
    let result = [];
    let carry = 0;

    while (ae >= 0 && be >= 0) {
      let curr = numberize(a[ae]) + numberize(b[be]);
      // 说明不需要进位
      if (curr === 0 || (curr === 1 && carry === 0)) {
        result.unshift(curr + carry);
        carry = 0;
      } else {
        // curr 1  carry 1
        // curr 2 carry 0
        if (curr + carry === 2) {
          result.unshift(0);
          carry = 1;
        } else {
          result.unshift(carry === 1 ? 1 : 0);
          carry = 1;
        }
      }
      ae--;
      be--;
    }

    while (ae >= 0) {
      let currA = numberize(a[ae]);
      let needCarry = currA + carry > 1;
      result.unshift(needCarry ? 0 : currA + carry);
      carry = needCarry ? 1 : 0;
      ae--;
    }
    while (be >= 0) {
      let currB = numberize(b[be]);
      let needCarry = currB + carry > 1;
      result.unshift(needCarry ? 0 : currB + carry);
      carry = needCarry ? 1 : 0;
      be--;
    }
    if (carry > 0) {
      result.unshift(1);
    }
    return result.join('');
  }
}

const numberize = (s: string) => Number(s || '0');

export function addBinary1(a: string, b: string): string {
  if (a === '0' || b === '0') {
    return a === '0' ? b : a;
  } else if (a === '0' && b === '0') {
    return '0';
  } else {
    let isALong = a.length > b.length;
    if (isALong) {
      b = b.padStart(a.length, '0');
    } else {
      a = a.padStart(b.length, '0');
    }
    let carry = 0;
    let result = [];
    for (let i = a.length - 1; i >= 0; i--) {
      const curr = numberize(a[i]) + numberize(b[i]);
      if (curr + carry > 1) {
        result.unshift(curr + carry === 2 ? 0 : 1);
        carry = 1;
      } else {
        result.unshift(carry + curr);
        carry = 0;
      }
    }
    if (carry > 0) {
      result.unshift(1);
    }
    return result.join('');
  }
}

export function addBinary2(a: string, b: string): string {
  if (a === '0' || b === '0') {
    return a === '0' ? b : a;
  } else if (a === '0' && b === '0') {
    return '0';
  } else {
    let isALong = a.length > b.length;
    if (isALong) {
      b = b.padStart(a.length, '0');
    } else {
      a = a.padStart(b.length, '0');
    }
    let carry = 0;
    let result = '';
    for (let i = a.length - 1; i >= 0; i--) {
      const curr = numberize(a[i]) + numberize(b[i]);
      if (curr + carry > 1) {
        result = (curr + carry === 2 ? '0' : '1') + result;
        carry = 1;
      } else {
        result = curr + carry + '' + result;
        carry = 0;
      }
    }
    if (carry > 0) {
      result = '1' + result;
    }
    return result;
  }
}
