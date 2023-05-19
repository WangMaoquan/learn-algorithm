import { describe, test, expect } from 'vitest';
import { MinStack } from '.';

describe('min stack', () => {
  test('最小栈', () => {
    const minStack = new MinStack();
    minStack.push(2);
    minStack.push(3);
    minStack.push(1);
    expect(minStack.getMin()).toBe(1);

    minStack.pop();
    expect(minStack.getMin()).toBe(2);
  });
});
