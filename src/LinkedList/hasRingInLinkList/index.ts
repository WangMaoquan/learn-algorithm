/**
 * 题目
 * 给定一个链表，判断链表中是否有环
 *
 * 示例 1
 * 输入：[3,2,0,4]
 * 链表结构如下:
 *
 * 3 -> 2 -> 0 -> 4 -> 2
 *
 * 输出:
 * true
 */

import { LinkNode } from '..';

// 判断思路很简单, 访问过的节点 打个标记 如果存在标记 说明已经成环了
export const isRingLinkList = (linkList: LinkNode) => {
  let head: null | (LinkNode & { flag?: boolean }) = linkList;
  while (head) {
    if (head.flag) {
      return true;
    } else {
      head.flag = true;
      head = head.next;
    }
  }
  return false;
};
