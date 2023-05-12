/**
 *  树的关键特性与概念
 *
 * 1. 树的层次计算规则: 根节点所在的那一层记为第一层, 其子节点为第二次, 以此类推
 * 2. 节点和树的"高度"计算规则: 叶子节点的高度为1 , 每向上一层 +1, 逐层向上累加至目标节点时, 所得的值就是目标节点的高度,  树的高度 就是 树中节点最大的高度
 * 3. 度的概念: 一个节点开叉出去多少个子树，被记为节点的“度”
 * 4. 叶子节点：叶子节点就是度为0的节点
 *
 * 什么是二叉树
 *
 * 它可以没有根节点，作为一棵空树存在
 * 如果它不是空树，那么必须由根节点、左子树和右子树组成，且左右子树都是二叉树
 *
 * 二叉树不能被简单定义为每个节点的度都是2的树。普通的树并不会区分左子树和右子树，但在二叉树中，左右子树的位置是严格约定、不能交换的
 */

export class TreeNode<T = any> {
  left?: TreeNode;
  right?: TreeNode;
  level = 0;
  constructor(public value: T) {}
}

/**
 * 二叉树的遍历
 *
 * 先序遍历
 * 中序遍历
 * 后续遍历
 *
 * 记住所谓的 先中后 指的都是 根节点的遍历位置
 * 所以
 *
 * 先序:  根 => 左 => 右
 * 中序:  左 => 根 => 右
 * 后序:  左 => 右 => 根
 */

export class Tree<T = any> {
  constructor(public root: TreeNode<T>) {}
  addNode(node: TreeNode<T>, target?: TreeNode<T>) {
    const current = target || this.root;
    const nodeLevel = current.level;
    node.level = nodeLevel + 1;
    if (current.left === undefined) {
      current.left = node;
    } else if (current.right === undefined) {
      current.right = node;
    } else if (this.shouldInsert(++node.level)) {
      this.addNode(node, current.left);
    } else {
      this.addNode(node, current.right);
    }
  }

  shouldInsert(level: number) {
    const leftCount = this.getNodesCount(this.root.left, 0, level) || 0;
    const rightCount = this.getNodesCount(this.root.right, 0, level) || 0;
    return (
      leftCount <= Math.pow(2, level) - 1 &&
      rightCount === Math.pow(2, level - 1) - 1
    );
  }

  /**
   * 获取根节点左/右的节点数量
   * @param leftOright
   */
  getNodesCount(leftOright?: TreeNode, count = 0, level = 0) {
    if (!leftOright) {
      return;
    }
    count++;
    if (leftOright.level === level) {
      return;
    }
    count = this.getNodesCount(leftOright?.left, count, level) || 0;
    count = this.getNodesCount(leftOright?.right, count, level) || 0;
    return count;
  }

  preorderTraverse(root?: TreeNode, cb?: (value: T) => void) {
    if (!root) {
      return;
    }
    cb && cb(root.value);
    this.preorderTraverse(root.left, cb);
    this.preorderTraverse(root.right, cb);
  }
  inorderTraverse(root?: TreeNode, cb?: (value: T) => void) {
    if (!root) {
      return;
    }
    this.inorderTraverse(root.left, cb);
    cb && cb(root.value);
    this.inorderTraverse(root.right, cb);
  }
  postorderTraverse(root?: TreeNode, cb?: (value: T) => void) {
    if (!root) {
      return;
    }
    this.postorderTraverse(root.left, cb);
    this.postorderTraverse(root.right, cb);
    cb && cb(root.value);
  }
}
