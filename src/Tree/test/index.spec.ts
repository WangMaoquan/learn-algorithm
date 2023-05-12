import { describe, test, expect } from 'vitest';
import { Tree, TreeNode } from '..';

describe('tree', () => {
  test('create a tree', () => {
    const treeNode = new TreeNode(1);
    const tree = new Tree(treeNode);
    expect(tree).toEqual({
      root: {
        value: 1,
        level: 0,
      },
    });
  });

  test('getNodesCount', () => {
    const treeNode1 = new TreeNode(1);
    const treeNode2 = new TreeNode(2);
    const treeNode3 = new TreeNode(3);
    const treeNode4 = new TreeNode(4);
    const treeNode5 = new TreeNode(5);
    const tree = new Tree(treeNode1);
    tree.addNode(treeNode2);
    tree.addNode(treeNode3);
    tree.addNode(treeNode4);
    tree.addNode(treeNode5);
    const rootLeft = tree?.root.left;
    const countLeft = tree!.getNodesCount(rootLeft);
    expect(countLeft).toBe(3);
    const rootRight = tree?.root.right;
    const countRight = tree!.getNodesCount(rootRight);
    expect(countRight).toBe(1);
  });

  test('addTreeNode', () => {
    const treeNode = new TreeNode(1);
    const treeNode1 = new TreeNode(2);
    const treeNode2 = new TreeNode(3);
    const tree = new Tree(treeNode);
    tree.addNode(treeNode1);
    tree.addNode(treeNode2);
    expect(tree).toEqual({
      root: {
        value: 1,
        level: 0,
        left: {
          value: 2,
          level: 1,
        },
        right: {
          value: 3,
          level: 1,
        },
      },
    });

    const treeNode4 = new TreeNode(4);
    const treeNode5 = new TreeNode(5);
    tree.addNode(treeNode4);
    tree.addNode(treeNode5);
    expect(tree).toEqual({
      root: {
        value: 1,
        level: 0,
        left: {
          value: 2,
          level: 1,
          left: {
            value: 4,
            level: 2,
          },
          right: {
            value: 5,
            level: 2,
          },
        },
        right: {
          value: 3,
          level: 1,
        },
      },
    });
    const treeNode6 = new TreeNode(6);
    const treeNode7 = new TreeNode(7);
    tree.addNode(treeNode6);
    tree.addNode(treeNode7);
    expect(tree).toEqual({
      root: {
        value: 1,
        level: 0,
        left: {
          value: 2,
          level: 1,
          left: {
            value: 4,
            level: 2,
          },
          right: {
            value: 5,
            level: 2,
          },
        },
        right: {
          value: 3,
          level: 1,
          left: {
            value: 6,
            level: 2,
          },
          right: {
            value: 7,
            level: 2,
          },
        },
      },
    });

    // const treeNode8 = new TreeNode(8);
    // const treeNode9 = new TreeNode(9);
    // tree.addNode(treeNode8);
    // tree.addNode(treeNode9);
    // expect(tree).toEqual({
    //   root: {
    //     value: 1,
    //     left: {
    //       value: 2,
    //       left: {
    //         value: 4,
    //         left: {
    //           value: 8,
    //         },
    //         right: {
    //           value: 9,
    //         },
    //       },
    //       right: {
    //         value: 5,
    //       },
    //     },
    //     right: {
    //       value: 3,
    //       left: {
    //         value: 6,
    //       },
    //       right: {
    //         value: 7,
    //       },
    //     },
    //   },
    // });
  });

  test('pre', () => {});
});
