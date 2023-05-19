/**
 * 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈
 *
 * push(x) —— 将元素 x 推入栈中
 * pop() —— 删除栈顶的元素
 * top() —— 获取栈顶元素
 * getMin() —— 检索栈中的最小元素。
 *
 * 示例:
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); --> 返回 -3.
 * minStack.pop();
 * minStack.top(); --> 返回 0.
 * minStack.getMin(); --> 返回 -2.
 */

export class MinStack {
  store: number[];
  minStack: number[];
  constructor() {
    this.store = [];
    this.minStack = [];
  }
  pop() {
    if (this.store.pop() === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }
  push(v: number) {
    this.store.push(v);
    if (
      this.minStack.length === 0 ||
      this.minStack[this.minStack.length - 1] > v
    ) {
      this.minStack.push(v);
    }
  }
  top() {
    return this.store[this.store.length - 1];
  }
  getMin() {
    // let min = Infinity;
    // const { store } = this;
    // for (let i = 0; i < store.length; i++) {
    //   if (min > store[i]) {
    //     min = store[i];
    //   }
    // }
    // return min;
    return this.minStack[this.minStack.length - 1];
  }
}
