---
title: 이진 탐색 트리
---

> In computer science, a binary search tree (BST), also called an ordered or sorted binary tree, is a rooted binary tree data structure whose internal nodes each store a key greater than all the keys in the node’s left subtree and less than those in its right subtree.

이중 포인터 쓰는 것 익숙해지기!

아래처럼 바꾸기

``` {class="language-c"}
while (true)
    {
        if (!cur)
            return NULL;
        if (cur->data.key == key)
            return cur;
        if (cur->data.key > key)
            cur = cur->left;
        else
            cur = cur->right;
    }
```

``` {class="language-c"}
while (!cur)
    {
        if (cur->data.key == key)
            return cur;
        if (cur->data.key > key)
            cur = cur->left;
        else
            cur = cur->right;
    }
```

이것도 첫 if문 필요 없음

```c
while (cur && (cur->data.key != key))
    {
        parent = cur;
        if (cur->data.key == key)
            break;
        else if (cur->data.key < key)
            cur = cur->right;
        else
            cur = cur->left;
    }
```

## 구현

이진 트리에서 함수 만들어놓고 왜 쓰지를 못하니,,,

``` {class="language-c"}
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct _Color
{
    int key;
    char *name;
} Color;

typedef Color Data;

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

void BSTInit(BTreeNode **pRoot)
{
    *pRoot = NULL;
}

void BSTInsert(BTreeNode **pRoot, Data data)
{
    BTreeNode *cur = *pRoot;
    BTreeNode *newNode = MakeBTreeNode();
    newNode->data = data;

    if (!cur)
    {
        *pRoot = MakeBTreeNode();
        (*pRoot)->data = data;
        return;
    }
    while (true)
    {
        if (data.key < cur->data.key)
        {
            if (cur->left)
                cur = cur->left;
            else
            {
                MakeLeftSubTree(cur, newNode);
                return;
            }
        }
        else
        {
            if (cur->right)
                cur = cur->right;
            else
            {
                MakeRightSubTree(cur, newNode);
                return;
            }
        }
    }
}

//NULL때문에 포인터 쓰는 것도 있는건가
BTreeNode *BSTSearch(BTreeNode *cur, int key)
{
    while (true)
    {
        if (!cur)
            return NULL;
        if (cur->data.key == key)
            return cur;
        if (cur->data.key > key)
            cur = cur->left;
        else
            cur = cur->right;
    }
}

void InorderTraverse(BTreeNode *node)
{
    if (node->left)
        InorderTraverse(node->left);
    printf("%s\n", node->data.name);
    if (node->right)
        InorderTraverse(node->right);
}

void BSTRemove(BTreeNode **pRoot, int key)
{
    BTreeNode *tempNode = MakeBTreeNode();
    BTreeNode *parent = tempNode;
    BTreeNode *cur = *pRoot;

    tempNode->right = *pRoot;

    while (cur && (cur->data.key != key))
    {
        parent = cur;
        if (cur->data.key < key)
            cur = cur->right;
        else
            cur = cur->left;
    }

    if (!cur)
        return;

    if (cur->left && cur->right)
    {
        BTreeNode *altNode = cur->right;
        BTreeNode *altNodeParent = cur;
        while (altNode->left)
        {
            altNodeParent = altNode;
            altNode = altNode->left;
        }
        cur->data = altNode->data;
        if (altNodeParent->left == altNode)
            altNodeParent->left = altNode->right;
        else
            altNodeParent->right = altNode->right;
        free(altNode);
    }
    else if (cur->left || cur->right)
    {
        BTreeNode *curChild;
        if (cur->left)
            curChild = cur->left;
        else
            curChild = cur->right;
        if (parent->left == cur)
            parent->left = curChild;
        else
            parent->right = curChild;
        free(cur);
    }
    else
    {
        if (parent->left == cur)
            parent->left = NULL;
        else
            parent->right = NULL;
        free(cur);
    }
    if (tempNode->right != *pRoot)
        *pRoot = tempNode->right;
    free(tempNode);
    // free(cur); 애는 지우면 안되지,,,^^
}

int main()
{
    char *colorList[] = {"Red", "Orange", "Yellow", "Green", "Blue"};
    int insertOrder[] = {3, 2, 0, 4, 1};
    BTreeNode *bstRoot;
    BSTInit(&bstRoot);
    Data data;
    for (int i = 0; i < 5; i++)
    {
        int order = insertOrder[i];
        data.key = order;
        data.name = colorList[order];
        BSTInsert(&bstRoot, data);
    }
    BSTRemove(&bstRoot, 4);
    InorderTraverse(bstRoot);
    return 0;
}
```