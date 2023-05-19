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
