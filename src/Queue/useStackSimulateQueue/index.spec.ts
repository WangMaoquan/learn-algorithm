import { describe, test, expect } from 'vitest';
import { MyQueue } from '.';

describe('use stack simulate queue', () => {
  test('使用 栈 模拟 队列', () => {
    const myQueue = new MyQueue();
    myQueue.push(1);
    myQueue.push(2);
    myQueue.push(3);
    expect(myQueue.empty()).toBe(false);
    expect(myQueue.peek()).toBe(1);
    expect(myQueue.pop()).toBe(1);
    expect(myQueue.peek()).toBe(2);
    myQueue.push(4);
    expect(myQueue.peek()).toBe(2);
    expect(myQueue.pop()).toBe(2);
    expect(myQueue.peek()).toBe(3);
    expect(myQueue.empty()).toBe(false);
    expect(myQueue.pop()).toBe(3);
    expect(myQueue.empty()).toBe(false);
    expect(myQueue.pop()).toBe(4);
    expect(myQueue.empty()).toBe(true);
  });
});
