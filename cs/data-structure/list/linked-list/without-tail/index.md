---
title: 꼬리 없는 연결 리스트 구현
---

## 구조체 선언

```{class="language-c"}
typedef struct _node
{
    LData data;
    struct _node *next;
} Node;

typedef struct _linkedList
{
    Node *head;
    Node *cur;
    Node *prev;
    int size;
    bool (*AreInIncreasingOrder)(LData *a, LData *b);
} LinkedList;
```

## 더미 노드가 없는 끔찍한 구현

숨 쉴 때마다 head에 대한 예외를 생각해야한다. 정렬 때문에 head에 원소를 삽입해야되는 경우 예외처리를해줘야하는데 정말 끔찍하다. cur가 아무리 앞에 있어도 head에위치해있는데 이러면 head 뒤에만 원소를 이을 수밖에 없기 때문.

```{class="language-c"}
void ListInit(List *plist)
{
    plist->head = NULL;
    plist->size = 0;
    plist->AreInIncreasingOrder = NULL;
}

void LInsert(List *plist, LData data)
{
    Node *node = malloc(sizeof(Node));
    node->data = data;
    (plist->size)++;
    if (!plist->head)
    {
        node->next = NULL;
        plist->head = node;
        return;
    }
    if (plist->AreInIncreasingOrder)
    {
        if (plist->AreInIncreasingOrder(&data, &(plist->head->data)))
        {
            node->next = plist->head;
            plist->head = node;
            return;
        }
        Node *cur = plist->head;
        while (cur->next && plist->AreInIncreasingOrder(&cur->next->data, &data))
            cur = cur->next;
        node->next = cur->next;
        cur->next = node;
    }
    else
    {
        node->next = plist->head->next;
        plist->head = node;
    }
}

bool LFirst(List *plist, LData *data)
{
    if (!(plist->size))
        return false;
    plist->prev = NULL;
    plist->cur = plist->head;
    if (data)
        *data = plist->cur->data;
    return true;
}

bool LNext(List *plist, LData *data)
{
    if (!(plist->cur->next))
        return false;
    plist->prev = plist->cur;
    plist->cur = plist->cur->next;
    if (data)
        *data = plist->cur->data;
    return true;
}

int LCount(List *plist) { return plist->size; }

void LRemove(List *plist)
{
    (plist->size)--;
    if (!plist->prev)
    {
        plist->head = plist->head->next;
        free(plist->cur);
        plist->cur = plist->head;
        return;
    }
    plist->prev->next = plist->cur->next;
    free(plist->cur);
    plist->cur = plist->prev;
}

void LClear(List *plist)
{
    while (LFirst(plist, NULL))
    {
        LRemove(plist);
    }
}

void SetSortRule(List *plist, bool (*AreInIncreasingOrder)(LData *a, LData *b))
{
    plist->AreInIncreasingOrder = AreInIncreasingOrder;
}
```

## 더미 노드가 있는 구현

> Since every position you want to insert at (and every node you're allowed to delete) has a prev and next node, the code is simplified.

[출처](https://stackoverflow.com/questions/9103577/what-is-the-difference-between-the-head-node-and-starting-node-of-link-list)

- LInit에서 head에 더미 노드를 붙인다. 더미의 data는 상관 없지만 next는 NULL이어야 한다.
- LInsert에서 초반 head가 NULL일 경우의 예외 처리 삭제.
- 정렬 삽입일 때 맨 앞에 삽입되는 경우의 예외 처리 삭제.
- 정렬 없는 삽입에서 plist->head = node;를 plist->head->next = node;로 변경
- LFirst에서 이제 prev가 더미 노드를 가르킴.
- LRemove에서 prev가 NULL인지 확인하지 않음.
- 더미가 있어서 head 노드가 삭제될 걱정을 하지 않아도 된다.

```{class="language-c"}
void ListInit(List *plist)
{
    plist->head = malloc(sizeof(Node));
    plist->head->next = NULL;
    plist->size = 0;
    plist->AreInIncreasingOrder = NULL;
}

void LInsert(List *plist, LData data)
{
    Node *node = malloc(sizeof(Node));
    node->data = data;
    (plist->size)++;
    if (plist->AreInIncreasingOrder)
    {
        Node *cur = plist->head;
        while (cur->next && plist->AreInIncreasingOrder(&cur->next->data, &data))
            cur = cur->next;
        node->next = cur->next;
        cur->next = node;
    }
    else
    {
        node->next = plist->head->next;
        plist->head->next = node;
    }
}

bool LFirst(List *plist, LData *data)
{
    if (!(plist->size))
        return false;
    plist->prev = plist->head;
    plist->cur = plist->head->next;
    if (data)
        *data = plist->cur->data;
    return true;
}

bool LNext(List *plist, LData *data)
{
    if (!(plist->cur->next))
        return false;
    plist->prev = plist->cur;
    plist->cur = plist->cur->next;
    if (data)
        *data = plist->cur->data;
    return true;
}

int LCount(List *plist) { return plist->size; }

void LRemove(List *plist)
{
    (plist->size)--;
    plist->prev->next = plist->cur->next;
    free(plist->cur);
    plist->cur = plist->prev;
}

void LClear(List *plist)
{
    while (LFirst(plist, NULL))
        LRemove(plist);
}

void SetSortRule(List *plist, bool (*AreInIncreasingOrder)(LData *a, LData *b))
{
    plist->AreInIncreasingOrder = AreInIncreasingOrder;
}
```
