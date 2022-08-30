---
title: 이진 트리
---

*영어 번역에 주의. 교재에서는 포화 이진 트리를 full binary tree로 번역하지만 위키피디아와 다른 자료에서 포화 이진 트리는 perfect binary tree이다.*

**이진 트리**

> In computer science, a binary tree is a tree data structure in which each node has at most two children, which are referred to as the left child and the right child.
> A recursive definition using just set theory notions is that a (non-empty) binary tree is a tuple (L, S, R), where L and R are binary trees or the empty set and S is a singleton set containing the root. Some authors allow the binary tree to be the empty set as well.
> - Wikipedia

## 이진 트리의 종류

**정 이진 트리**

> A full binary tree (sometimes referred to as a proper or plane binary tree) is a tree in which every node has either 0 or 2 children.

**포화 이진 트리**

>A perfect binary tree is a binary tree in which all interior nodes have two children and all leaves have the same depth or same level.

**완전 이진 트리**

> In a complete binary tree every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible

## ADT

``` {class="language-c}
BTreeNode *MakeBTreeNode(void);

Data GetData(BTreeNode *bt);

void SetData(BTreeNode *bt, Data data);

BTreeNode *GetLeftSubTree(BTreeNode *bt);

BTreeNode *GetRightSubTree(BTreeNode *bt);

void MakeLeftSubTree(BTreeNode *main, BTreeNode *sub);

void MakeRightSubTree(BTreeNode *main, BTreeNode *sub);
```

## 순회(traverse)

위 ADT를 구현하려면 서브트리의 모든 노드에 대해 free를 할 수 있어야 한다. 

루트 노드가 중간에 방문되면 중위(inorder), 마지막이면 후위(postorder), 처음이면 전위(preorder).

내가 처음에 구현한 이 방법보다는 

``` {class="language-c"}
void InOrderTraverse(BTreeNode *main, void (*Transform)(Data))
{
    if (main->left)
        InOrderTraverse(main->left, Transform);
    Transform(main);
    if (main->right)
        InOrderTraverse(main->right, Transform);
}
```

책의 이 방법이 나아보인다. 

``` {class="language-c"}
void InOrderTraverse(BTreeNode *main, void (*Transform)(Data))
{
    if (!(main))
        return;
    InOrderTraverse(main->left, Transform);
    Transform(main);
    InOrderTraverse(main->right, Transform);
}
```

## 구현

연결 리스트처럼 자료 구조를 위한 구조체를 따로 선언할 필요는 없다. 루트 노드가 곧 트리이기 때문. 

void MakeLeftSubTree(BTreeNode *main, BTreeNode *sub)에서 free 잊지 말기!!! 세상에. 근데 free한거 그대로 쓰다가 에러난거 찾느라 한참 찾았다. 세상에. 

``` {class="language-c"}
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef int Data;

typedef struct _BTreeNode
{
    Data data;
    struct _BTreeNode *left;
    struct _BTreeNode *right;
} BTreeNode;

BTreeNode *MakeBTreeNode()
{
    BTreeNode *node = malloc(sizeof(BTreeNode));
    node->left = NULL;
    node->right = NULL;
    return node;
}

Data GetData(BTreeNode *bt)
{
    return bt->data;
}

void SetData(BTreeNode *bt, Data data)
{
    bt->data = data;
}

BTreeNode *GetLeftSubTree(BTreeNode *bt)
{
    return bt->left;
}

BTreeNode *GetRightSubTree(BTreeNode *bt)
{
    return bt->right;
}

void PostOrderTraverse(BTreeNode *main, void (*Transform)(BTreeNode *))
{
    if (!(main))
        return;
    PostOrderTraverse(main->left, Transform);
    PostOrderTraverse(main->right, Transform);
    Transform(main);
}

void FreeTreeNode(BTreeNode *main)
{
    printf("%d Deleted\n", main->data);
    free(main);
}

void DeleteTree(BTreeNode *main)
{
    PostOrderTraverse(main, FreeTreeNode);
}

void MakeLeftSubTree(BTreeNode *main, BTreeNode *sub)
{
    main->left = sub;
}

void MakeRightSubTree(BTreeNode *main, BTreeNode *sub)
{
    main->right = sub;
}

void PrintContent(BTreeNode *node)
{
    printf("%d", node->data);
}

int main()
{

    BTreeNode *bt1 = MakeBTreeNode();
    BTreeNode *bt2 = MakeBTreeNode();
    BTreeNode *bt3 = MakeBTreeNode();
    BTreeNode *bt4 = MakeBTreeNode();

    SetData(bt1, 1);
    SetData(bt2, 2);
    SetData(bt3, 3);
    SetData(bt4, 4);

    MakeLeftSubTree(bt1, bt2);
    MakeRightSubTree(bt1, bt3);
    MakeLeftSubTree(bt2, bt4);

    PostOrderTraverse(bt1, PrintContent);

    puts("");

    DeleteTree(bt1);

    return 0;
}
```