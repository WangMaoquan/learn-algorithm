/**
 * 题目
 * 定义一个函数，输入一个链表的头结点，反转该链表并输出反转后链表的头结点
 *
 * 示例:
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 */

import { LinkNode } from '..';

/**
 * 三个指针
 * 一个 pre 前驱节点
 * 一个 cur 当前节点
 * 一个 next 后驱节点
 *
 * 主要修改 是 cur.next 的指向
 * 以及 重置 pre, cur, next
 */

export const reverseLinkList = (linkList: LinkNode) => {
  let pre: LinkNode | null = null;
  let cur: LinkNode | null = linkList;
  while (cur !== null) {
    let next: LinkNode | null = cur.next;
    // 反转指针
    cur.next = pre;
    // pre 往前走一步
    pre = cur;
    // cur 往前走一步
    cur = next;
  }
  return pre;
};
