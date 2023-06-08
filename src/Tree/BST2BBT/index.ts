/**
 * 题目:
 * 给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值
 *
 * 示例一:
 * 输入 [1,null,2,null,3,null,4,null,null]
 * 输出 [2,1,3,null,null,null,4]
 *
 * 思路很简单
 * 中序遍历传入的树,然后我们通过中序遍历拿到的结果自己构造
 */

import { TreeNode } from '..';

export function BST2BBT(tree: TreeNode<number>) {
  const values: number[] = [];
  const inorder = (root?: TreeNode<number>) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    values.push(root.value);
    inorder(root.right);
  };

  function buildAVL(low: number, high: number): TreeNode<number> | undefined {
    // 若 low > high，则越界，说明当前索引范围对应的子树已经构建完毕
    if (low > high) {
      return undefined;
    }
    // 取数组的中间值作为根结点值
    const mid = Math.floor(low + (high - low) / 2);
    // 创造当前树的根结点
    const cur = new TreeNode(values[mid]);
    // 构建左子树
    const left = buildAVL(low, mid - 1);
    left && (cur.left = left);
    // 构建右子树
    const right = buildAVL(mid + 1, high);
    right && (cur.right = right);
    // 返回当前树的根结点
    return cur;
  }

  // 调用中序遍历方法，求出 nums
  inorder(tree);
  // 基于 nums，构造平衡二叉树
  return buildAVL(0, values.length - 1);
}
