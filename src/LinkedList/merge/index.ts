/**
 * 题目
 * 将两个有序链表合并为一个新的有序链表并返回
 * 新链表是通过拼接给定的两个链表的所有结点组成的
 *
 * 示例:
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
 */

import { LinkHead, LinkNode } from '..';

// 主要的思路就是 链表指针的移动
export const mergeLinkList = (linkList1: LinkNode, linkList2: LinkNode) => {
  const result = new LinkHead();
  let current = result;
  let l1: LinkNode | null = linkList1;
  let l2: LinkNode | null = linkList2;

  while (l1 && l2) {
    if (l1.value <= l2.value) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  current.next = l1 !== null ? l1 : l2;
  return result.next;
};
