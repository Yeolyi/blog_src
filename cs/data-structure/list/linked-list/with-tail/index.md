---
title: 꼬리가 있는 연결리스트 구현
---

꼬리가 있으면 더미가 어떻게 붙을까?

1. 머리 -> 더미 <- 꼬리
1. 머리 -> 더미 -> 더미 <- 꼬리

꼬리에 새로운 원소를 붙이려고 꼬리가 있는건데 꼬리에 더미가 있는건 의미가 없지않을까?! 1번 방식으로
구현해보자.

```{class="language-c"}
void ListInit(List *plist)
{
    plist->head = malloc(sizeof(Node));
    plist->head->next = NULL;
    plist->tail = plist->head;
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
        if (plist->tail->next)
            plist->tail = plist->tail->next;
    }
    else
    {
        plist->tail->next = node;
        plist->tail = node;
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
    if (plist->cur == plist->tail)
        plist->tail = plist->prev;
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
