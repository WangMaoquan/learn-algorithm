/**
 * 题目:
 * 使用栈实现队列的下列操作
 *
 * push(x) -- 将一个元素放入队列的尾部
 * pop() -- 从队列首部移除元素
 * peek() -- 返回队列首部的元素
 * empty() -- 返回队列是否为空
 *
 * 说明:
 *
 * 你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和 is empty 操作是合法的
 * 你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可
 * 假设所有操作都是有效的 (例如，一个空的队列不会调用 pop 或者 peek 操作)
 *
 * 示例:
 * MyQueue queue = new MyQueue()
 * queue.push(1);
 * queue.push(2);
 * queue.peek(); // 返回 1
 * queue.pop(); // 返回 1
 * queue.empty(); // 返回 false
 *
 */

/**
 * 栈 先进后出
 * 队列 先进先出
 *
 * 栈   1 2 3  出栈其实是 3 2 1
 * 队列 1 2 3  出队列其实是 1 2 3
 *
 * 其实我们只要 进栈时 是 3 2 1, 出栈不就是 1 2 3 了嘛
 *
 * 所以我们可以用两个栈来模拟
 */

export class MyQueue<T = any> {
  private inStack: T[];
  private outStack: T[];
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(v: T) {
    this.inStack.push(v);
  }

  pop() {
    if (this.outStack.length <= 0) {
      if (this.inStack.length !== 0) {
        this.outStack.push(...this.inStack.reverse());
        this.inStack = [];
      }
    }
    return this.outStack.pop();
  }

  peek() {
    if (this.outStack.length <= 0) {
      if (this.inStack.length !== 0) {
        this.outStack.push(...this.inStack.reverse());
        this.inStack = [];
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return !this.inStack.length && !this.outStack.length;
  }
}
