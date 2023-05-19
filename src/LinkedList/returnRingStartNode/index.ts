/**
 * 题目
 * 给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null
 *
 * 示例 1：
 * 输入: [3,2,0,-4], 链表如下
 * 3 -> 2 -> 0 -> -4 -> 2
 *
 * 输出:
 * 应该返回 2 对应的那个节点
 *
 * 示例2:
 * 输入: [1, 2], 链表如下:
 * 1- > 2 -> 1
 *
 * 输出
 * 应该返回 1 对应的节点
 *
 * 示例3:
 * 输入: [1]
 *
 * 输出:
 * 返回 null
 */

import { LinkNode } from '..';

// 思路 和检测是否有环一样 只是把 返回值改了下
// 题目如果 要求能改变原链表 我们可以 用 map 保存访问过的node
export const detectCycle = (linkList: LinkNode) => {
  let head: null | (LinkNode & { flag?: boolean }) = linkList;
  while (head) {
    if (head.flag) {
      return head;
    } else {
      head.flag = true;
      head = head.next;
    }
  }
  return null;
};

/**
 * 我们先分析思路
 * 先搞个图
 *  1 -> 2 -> 3 -> 4 -> 2
 *
 * 假设 fast 永远比 slow 多走一步
 *
 * 即 fast = fast.next.next
 *    slow = slow.next
 *
 * fast   slow
 * 1      1
 * 3      2
 * 2      3
 * 4      4
 *
 * fast 走了 1 -> (2)3 -> (4)2 -> (3)4 期间走了 7步
 * slow 走了 1 -> 2 -> 3 -> 4 期间走了 4步
 *
 * 假设 链表总长 s 其中我们可以分为两部分 一部分是 开始到 环起点 的距离 我们记为 a, 另一部分我们可以 记为 b
 *
 * fast = 2 * slow
 *
 * fast 和 slow 相遇 fast 一定比 slow 多走 n * b
 * fast = slow + n * b;
 *
 * slow = n * b
 *
 * 然后就是 slow 经过 a + nb 一定会回到 环起点
 *
 * slow === fast 了
 *
 * 相当于 slow 已经走了 nb 是不是 还需要 走 a 就是起点了
 *
 * 因为存在环 所以 一定会存在  fast === slow  的情况
 */

export const detectCycleUseFastAndSlowPointer = (linkList: LinkNode) => {
  let fast: null | LinkNode = linkList;
  let slow: null | LinkNode = linkList;
  let head: null | LinkNode = linkList;

  while (true) {
    // 说明不存在环
    if (fast === null || fast.next === null) {
      return null;
    }

    // 可以理解为 n 此时 为2;
    slow = slow?.next || null;
    fast = fast?.next?.next || null;

    // slow 已经走完 nb 了
    if (fast === slow) {
      break;
    }
  }

  // 从头开始走 a 步
  while (slow !== head) {
    head = head?.next || null;
    slow = slow?.next || null;
  }
  return slow;
};
