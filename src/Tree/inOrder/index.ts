import { TreeNode } from '..';

export const inOrder = <T>(root: TreeNode<T>) => {
  const result: T[] = [];
  const stack: TreeNode<T>[] = [];
  /**
   * 左 根 右
   *        1
   *   2       3
   * 4   5   6  7
   * 很明显 我们需要从 二叉树 左树 的 最后一个左叶子节点 开始 (4)
   * 所以 当栈开始 pop 时 出来的一定是 我上一句话的那个 叶子节点
   *
   * 那么我怎么让 4 代表的那个叶子叶子节点在 栈顶呢
   *
   * // 代码块 1
   * while(curr) {
   *    stack.push(curr);
   *    curr = curr.left
   * }
   *
   * 退出这个 while 时  curr 一定指向的 4
   * 也就是  curr = stack.pop(); // 此时是 4
   * 我们也就可以 result.push(curr.value);
   *
   * 此时我们相当于已经结束 4了 应该回到 2, 是不是直接 stack.pop() 此时出来的就是 2 啊
   *
   * 所以我们需要在 代码块1 外面再包一层
   *
   * while(curr || stack.length) {
   *    // 代码块1
   *    curr = stack.pop();
   *    result.push(curr.value);
   * }
   *
   * 咦上面代码执行后 是不是少了 5 这个 right 没有被 push 进去啊
   *
   * 所以还需要再加一行代码 curr = curr.right
   * 如果 right 存在 就会在 代码块1 那 push 进 stack
   * 这样 curr = stack.pop() 这里出来的其实就是 5了
   */
  let curr: TreeNode | undefined = root;
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop()!;
    result.push(curr.value);
    curr = curr.right;
  }
  return result;
};
