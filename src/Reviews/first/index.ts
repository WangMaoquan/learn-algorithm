/**
 * 两数求和
 * 使用map 空间换时间
 */

import { LinkHead, LinkNode } from '../../LinkedList';

export const twoSum = (nums: number[], target: number) => {
  const len = nums.length;
  const map = new Map<number, number>();
  for (let i = 0; i < len; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) {
      return [map.get(diff), i];
    }
    map.set(nums[i], i);
  }
};

/**
 * 合并两个有序数组
 */

export const mergeTwoOrderedArrays = (
  num1: number[],
  m: number,
  num2: number[],
  n: number,
) => {
  let n1 = m - 1;
  let n2 = n - 1;
  let ne = m + n - 1;

  while (n1 >= 0 && n2 >= 0) {
    if (num1[n1] < num2[n2]) {
      num1[ne] = num2[n2];
      n2--;
      ne--;
    } else {
      num1[ne] = num1[n1];
      n1--;
      ne--;
    }
  }
  while (n2 >= 0) {
    num1[ne] = num2[n2];
    n2--;
    ne--;
  }
  return num1;
};

/**
 * 三数求和
 */

export const threeSum = (nums: number[]) => {
  const result: number[][] = [];
  const len = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < len; i++) {
    let left = i + 1;
    let right = len - 1;

    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    while (left < right) {
      const sum = nums[i] + nums[right] + nums[left];
      if (sum < 0) {
        left++;
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
      } else if (sum > 0) {
        right--;
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
      } else {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }
      }
    }
  }
  return result;
};

/**
 * 有效的括号
 */

const map = {
  '{': '}',
  '(': ')',
  '[': ']',
} as const;

type MapType = typeof map;
type MapKey = keyof MapType;

export function isValid(s: string): boolean {
  if (!s) {
    return true;
  }
  const stack: MapType[MapKey][] = [];
  for (let i = 0; i < s.length; i++) {
    let str = s[i];
    if (str === '{' || str === '[' || str === '(') {
      stack.push(map[str]);
    } else {
      if (!stack.length || str !== stack.pop()) {
        return false;
      }
    }
  }
  return !stack.length;
}

/**
 * 合并有序链表
 * https://leetcode.cn/problems/merge-two-sorted-lists/submissions/
 */

export function mergeTwoLists(
  list1: LinkNode | null,
  list2: LinkNode | null,
): LinkNode | null {
  if (!list1 && !list2) {
    return null;
  } else if (list1 && !list2) {
    return list1;
  } else if (!list1 && list2) {
    return list2;
  }
  const result = new LinkHead();
  let cur = result;
  while (list1 && list2) {
    if (list1.value > list2.value) {
      cur.next = list2;
      list2 = list2.next;
    } else {
      cur.next = list1;
      list1 = list1.next;
    }
    cur = cur.next;
  }

  //  while(list1) {
  //      cur.next = list1;
  //      list1 = list1.next;
  //      cur = cur.next
  //  }

  //  while(list2) {
  //           cur.next = list2;
  //      list2 = list2.next;
  //      cur = cur.next
  //  }
  cur.next = list1 !== null ? list1 : list2;

  return result.next;
}

/**
 * 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 */

export function plusOne(nums: number[]) {
  for (let i = nums.length - 1; i >= 0; i--) {
    if (nums[i] === 9) {
      nums[i] = 0;
    } else {
      nums[i]++;
      return nums;
    }
  }
  return [1, ...nums];
}

/**
 * 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替
 */

export function dailyTemperature(temperature: number[]) {
  const len = temperature.length;
  // 保存的是下标, 下标对应的 温度是一个递减的趋势
  const stack: number[] = [];
  const result = new Array<number>(len).fill(0);

  for (let i = 0; i < len; i++) {
    // 当我们 遍历到一个 温度比 栈顶的温度还大的温度时
    // 就修改 result[top] = i = top 这就是改变的天数
    while (
      stack.length &&
      temperature[i] > temperature[stack[stack.length - 1]]
    ) {
      const top = stack.pop()!;
      result[top] = i - top;
    }
    stack.push(i);
  }
  return result;
}

/**
 *
 * 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量)
 */

export function hammingWeight(n: number): number {
  let result = 0;
  for (const char of n.toString(2)) {
    if (char === '1') {
      result++;
    }
  }
  return result;
}
