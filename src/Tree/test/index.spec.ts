import { describe, test, expect } from 'vitest';
import { Tree, TreeNode } from '..';

describe('tree', () => {
  test('create a tree', () => {
    const treeNode = new TreeNode(1);
    const tree = new Tree(treeNode);
    expect(tree).toEqual({
      root: {
        value: 1,
      },
    });
  });

  const treeNode1 = new TreeNode(1);
  const treeNode2 = new TreeNode(2);
  const treeNode3 = new TreeNode(3);
  const treeNode4 = new TreeNode(4);
  const treeNode5 = new TreeNode(5);
  const treeNode6 = new TreeNode(6);
  const treeNode7 = new TreeNode(7);
  const treeNode8 = new TreeNode(8);
  const treeNode9 = new TreeNode(9);
  const treeNode10 = new TreeNode(10);
  const treeNode11 = new TreeNode(11);
  const treeNode12 = new TreeNode(12);
  const treeNode13 = new TreeNode(13);
  const treeNode14 = new TreeNode(14);
  const treeNode15 = new TreeNode(15);

  treeNode1.left = treeNode2;
  treeNode1.right = treeNode3;

  treeNode2.left = treeNode4;
  treeNode2.right = treeNode5;
  treeNode3.left = treeNode6;
  treeNode3.right = treeNode7;

  treeNode4.left = treeNode8;
  treeNode4.right = treeNode9;
  treeNode5.left = treeNode10;
  treeNode5.right = treeNode11;
  treeNode6.left = treeNode12;
  treeNode6.right = treeNode13;
  treeNode7.left = treeNode14;
  treeNode7.right = treeNode15;

  const testTree = new Tree(treeNode1);

  /**
   *                        1
   *             2                    3
   *        4         5         6         7
   *     8    9    10  11    12  13    14  15
   */

  test('pre', () => {
    const result: number[] = [];
    const cb = (v: number) => result.push(v);

    testTree.preorderTraverse(testTree.root, cb);

    expect(result).toStrictEqual([
      1, 2, 4, 8, 9, 5, 10, 11, 3, 6, 12, 13, 7, 14, 15,
    ]);
  });

  test('in', () => {
    const result: number[] = [];
    const cb = (v: number) => result.push(v);

    testTree.inorderTraverse(testTree.root, cb);

    expect(result).toStrictEqual([
      8, 4, 9, 2, 10, 5, 11, 1, 12, 6, 13, 3, 14, 7, 15,
    ]);
  });

  test('post', () => {
    const result: number[] = [];
    const cb = (v: number) => result.push(v);

    testTree.postorderTraverse(testTree.root, cb);

    expect(result).toStrictEqual([
      8, 9, 4, 10, 11, 5, 2, 12, 13, 6, 14, 15, 7, 3, 1,
    ]);
  });
});
