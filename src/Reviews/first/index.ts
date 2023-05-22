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
