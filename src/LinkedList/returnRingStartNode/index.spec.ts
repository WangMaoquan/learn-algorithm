import { describe, test, expect } from 'vitest';
import { LinkNode } from '..';
import { detectCycle, detectCycleUseFastAndSlowPointer } from '.';

describe('return ring start node', () => {
  test('检测是否有环, 且返回环的起始节点', () => {
    const link1 = new LinkNode(1);
    const link2 = new LinkNode(2);
    const link3 = new LinkNode(3);
    const link4 = new LinkNode(3);
    const link5 = new LinkNode(5);
    const link6 = new LinkNode(6);
    const link7 = new LinkNode(6);

    link1.next = link2;
    link2.next = link3;
    link3.next = link4;
    link4.next = link1;

    link5.next = link6;
    link6.next = link7;

    expect(detectCycle(link1)).toEqual(link1);
    expect(detectCycle(link5)).toEqual(null);
  });

  test('使用双指针 解题', () => {
    const link1 = new LinkNode(1);
    const link2 = new LinkNode(2);
    const link3 = new LinkNode(3);
    const link4 = new LinkNode(4);
    const link5 = new LinkNode(5);
    const link6 = new LinkNode(6);
    const link7 = new LinkNode(7);

    link1.next = link2;
    link2.next = link3;
    link3.next = link4;
    link4.next = link2;

    link5.next = link6;
    link6.next = link7;

    // detectCycleUseFastAndSlowPointer(link1);

    expect(detectCycleUseFastAndSlowPointer(link1)).toEqual(link2);
    expect(detectCycleUseFastAndSlowPointer(link5)).toEqual(null);
  });
});
