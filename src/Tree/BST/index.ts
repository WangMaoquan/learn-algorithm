/**
 * 什么是 二叉搜索树(binary serach tree)
 *
 * 1. 是一棵空树
 * 2. 是一棵由根结点、左子树、右子树组成的树，同时左子树和右子树都是二叉搜索树，
 *    且左子树上所有结点的数据域都小于等于根结点的数据域，
 *    右子树上所有结点的数据域都大于等于根结点的数据域
 *
 * 二叉搜索树强调的是数据域的有序性
 * 也就是说，二叉搜索树上的每一棵子树，都应该满足 左孩子 <= 根结点 <= 右孩子 这样的大小关系
 *
 * 关于二叉搜索树，需要掌握以下高频操作：
 * 1. 查找数据域为某一特定值的结点
 * 2. 插入新结点
 * 3. 删除指定结点
 */

import { TreeNode } from '..';

/**
 * 查找数据域为某一特定值的结点
 *
 * 1. 递归遍历二叉树，若当前遍历到的结点为空，就意味着没找到目标结点，直接返回
 * 2. 若当前遍历到的结点对应的数据域值刚好等于n，则查找成功，返回
 * 3. 若当前遍历到的结点对应的数据域值大于目标值n，则应该在左子树里进一步查找，设置下一步的遍历范围为 root.left 后，继续递归
 * 4. 若当前遍历到的结点对应的数据域值小于目标值n，则应该在右子树里进一步查找，设置下一步的遍历范围为 root.right 后，继续递归
 */

type Search<T = any> = (n: T, root?: TreeNode<T>) => TreeNode<T> | undefined;

export const search: Search = (n, root?: TreeNode) => {
  if (!root) {
    return;
  }
  if (root.value === n) {
    return root;
  } else if (root.value > n) {
    return search(n, root.left);
  } else {
    return search(n, root.right);
  }
};

/**
 * 插入新结点
 * 插入的逻辑其实和 查找差不多
 * 不同的就是 root 为 null, 也就说明 n 可以插入到 这里了
 */

type Insert<T = any> = (n: T, root?: TreeNode<T>) => TreeNode<T>;

export const insert: Insert = (n, root) => {
  if (!root) {
    return new TreeNode(n);
  }
  if (root.value > n) {
    root.left = insert(n, root.left);
  } else {
    root.right = insert(n, root.right);
  }
  return root;
};

/**
 * 删除指定结点
 *
 * 删除不外乎这么几种情况
 * 1. 不存在指定的节点
 * 2. 指定节点为叶子节点
 * 3. 指定节点 只有 左子树, 删除后我们为了保持 BST 节点值的有序性, 我们需要从左子树 中的最大值 填补这个删除的节点
 * 4. 指定节点 只有 右子树, 删除后我们为了保持 BST 节点值的有序性 我们需要从右子树 中的最小值, 填补这个删除的节点
 * 5. 指定节点 既有左又有右, 3, 4 任选一种就行
 */

type DeleteNode<T = any> = (
  n: T,
  root?: TreeNode<T>,
) => TreeNode<T> | undefined;

// 二叉搜索的最大值 一定是 最深的那一层的 最右边
export function findBinarySearchTreeMaxNode<T>(root: TreeNode<T> | undefined) {
  while (root) {
    if (!root?.left && !root?.right) {
      return root;
    }
    if (root.right) {
      root = root.right;
    } else if (root.left) {
      if (root.left && root.left.right) {
        root = findBinarySearchTreeMaxNode(root.left.right);
      } else {
        root = root.left;
      }
    }
  }
  return root!;
}

// 二叉搜索的最小值 一定是 最深的那一层的 最左边
export function findBinarySearchTreeMinNode<T>(root: TreeNode<T> | undefined) {
  while (root) {
    if (!root?.left && !root?.right) {
      return root;
    }
    if (root.left) {
      root = root.left;
    } else if (root.right) {
      if (root.right && root.right.left) {
        root = findBinarySearchTreeMinNode(root.right.left);
      } else {
        break;
      }
    }
  }
  return root!;
}

export const deleteNode: DeleteNode = (n, root) => {
  if (!root) {
    return root;
  }
  if (root.value === n) {
    // 处理 没有 left 和 right
    if (!root.left && !root.right) {
      root = undefined;
    } else if (root.left) {
      // 找到 left 中的最大值
      const maxNode = findBinarySearchTreeMaxNode(root.left);
      // 修改值
      root.value = maxNode.value;
      // 删除 max那个node
      root.left = deleteNode(maxNode.value, root.left);
    } else {
      // 找到 right 中最小值
      const minNode = findBinarySearchTreeMinNode(root.right);
      // 修改值
      root.value = minNode.value;
      // 删除 min 那个node
      root.right = deleteNode(minNode.value, root.right);
    }
  } else if (root.value > n) {
    root.left = deleteNode(n, root.left);
  } else {
    root.right = deleteNode(n, root.right);
  }
  return root;
};
