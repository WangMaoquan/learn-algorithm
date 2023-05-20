import { describe, test, expect, beforeEach } from 'vitest';
import { TreeNode } from '..';
import {
  deleteNode,
  findBinarySearchTreeMaxNode,
  findBinarySearchTreeMinNode,
  insert,
  search,
} from '.';

let tree: TreeNode;

/**
 * beforeEach 注册一个回调,在当前上下文中的每个测试运行之前被调用
 * afterEach 注册一个回调,在当前上下文中的每个测试运行之后被调用
 * beforeAll 注册一个回调，在开始运行当前上下文中的所有测试之前被调用一次
 * afterAll 注册一个回调，在当前上下文中运行所有测试后被调用一次
 */
beforeEach(() => {
  tree = new TreeNode(10);
  const treeNode1 = new TreeNode(8);
  const treeNode2 = new TreeNode(12);
  const treeNode3 = new TreeNode(7);
  const treeNode4 = new TreeNode(9);
  const treeNode5 = new TreeNode(11);
  const treeNode6 = new TreeNode(13);

  treeNode1.left = treeNode3;
  treeNode1.right = treeNode4;

  treeNode2.left = treeNode5;
  treeNode2.right = treeNode6;

  tree.left = treeNode1;
  tree.right = treeNode2;
});

describe('BST(Binary Search Tree)', () => {
  test('查找数据域为某一特定值的结点', () => {
    expect(search(11, tree)).toEqual({
      value: 11,
    });
  });

  test('插入新结点', () => {
    expect(insert(14, tree)).toEqual({
      value: 10,
      left: {
        value: 8,
        right: {
          value: 9,
        },
        left: {
          value: 7,
        },
      },
      right: {
        value: 12,
        left: {
          value: 11,
        },
        right: {
          value: 13,
          right: {
            value: 14,
          },
        },
      },
    });

    expect(insert(6, tree)).toEqual({
      value: 10,
      left: {
        value: 8,
        right: {
          value: 9,
        },
        left: {
          value: 7,
          left: {
            value: 6,
          },
        },
      },
      right: {
        value: 12,
        left: {
          value: 11,
        },
        right: {
          value: 13,
          right: {
            value: 14,
          },
        },
      },
    });
  });

  describe('删除指定节点', () => {
    describe('findBinarySearchTreeMaxNode', () => {
      test('传入的root没有left, right 返回该 root', () => {
        expect(
          findBinarySearchTreeMaxNode({
            value: 1,
          }),
        ).toEqual({
          value: 1,
        });
      });

      test('传入的root只有left, 但left 没有right', () => {
        expect(
          findBinarySearchTreeMaxNode({
            value: 10,
            left: {
              value: 4,
            },
          }),
        ).toEqual({
          value: 4,
        });
      });

      test('传入的root只有left, 且left 也有 right', () => {
        expect(
          findBinarySearchTreeMaxNode({
            value: 10,
            left: {
              value: 4,
              right: {
                value: 6,
              },
            },
          }),
        ).toEqual({
          value: 6,
        });
        expect(
          findBinarySearchTreeMaxNode({
            value: 10,
            left: {
              value: 4,
              right: {
                value: 6,
                right: {
                  value: 7,
                },
              },
            },
          }),
        ).toEqual({
          value: 7,
        });
      });

      test('传入的 root left, right 都有', () => {
        expect(
          findBinarySearchTreeMaxNode({
            value: 10,
            left: {
              value: 4,
            },
            right: {
              value: 10,
            },
          }),
        ).toEqual({
          value: 10,
        });
      });
    });

    describe('findBinarySearchTreeMinNode', () => {
      test('传入的root没有left, right 返回该 root', () => {
        expect(
          findBinarySearchTreeMinNode({
            value: 1,
          }),
        ).toEqual({
          value: 1,
        });
      });

      test('传入的root只有right, 但right 没有left', () => {
        expect(
          findBinarySearchTreeMinNode({
            value: 10,
            right: {
              value: 15,
            },
          }).value,
        ).toBe(10);
      });

      test('传入的root只有right, 且right 也有 left', () => {
        expect(
          findBinarySearchTreeMinNode({
            value: 10,
            right: {
              value: 15,
              left: {
                value: 11,
              },
            },
          }).value,
        ).toBe(11);
        expect(
          findBinarySearchTreeMaxNode({
            value: 10,
            right: {
              value: 15,
              left: {
                value: 12,
                left: {
                  value: 11,
                },
              },
            },
          }).value,
        ).toBe(11);
      });

      test('传入的 root left, right 都有', () => {
        expect(
          findBinarySearchTreeMinNode({
            value: 10,
            left: {
              value: 4,
            },
            right: {
              value: 11,
            },
          }),
        ).toEqual({
          value: 4,
        });
      });
    });

    test('指定节点不存在', () => {
      expect(deleteNode(14, tree)).toEqual({
        value: 10,
        left: {
          value: 8,
          right: {
            value: 9,
          },
          left: {
            value: 7,
          },
        },
        right: {
          value: 12,
          left: {
            value: 11,
          },
          right: {
            value: 13,
          },
        },
      });
    });

    test('指定节点不存在left, right', () => {
      expect(deleteNode(11, tree)).toEqual({
        value: 10,
        left: {
          value: 8,
          right: {
            value: 9,
          },
          left: {
            value: 7,
          },
        },
        right: {
          value: 12,
          left: undefined,
          right: {
            value: 13,
          },
        },
      });
    });

    test('指定节点只存在 left', () => {
      insert(6, tree);
      expect(deleteNode(7, tree)).toEqual({
        value: 10,
        left: {
          value: 8,
          right: {
            value: 9,
          },
          left: {
            left: undefined,
            value: 6,
          },
        },
        right: {
          value: 12,
          left: {
            value: 11,
          },
          right: {
            value: 13,
          },
        },
      });
    });

    test('指定节点只存在 right', () => {
      insert(20, tree);
      expect(deleteNode(13, tree)).toEqual({
        value: 10,
        left: {
          value: 8,
          right: {
            value: 9,
          },
          left: {
            value: 7,
          },
        },
        right: {
          value: 12,
          left: {
            value: 11,
          },
          right: {
            value: 20,
          },
        },
      });
    });

    test('指定节点 right left 都有', () => {
      expect(deleteNode(12, tree)).toEqual({
        value: 10,
        left: {
          value: 8,
          right: {
            value: 9,
          },
          left: {
            value: 7,
          },
        },
        right: {
          value: 11,
          right: {
            value: 13,
          },
        },
      });
    });
  });
});
