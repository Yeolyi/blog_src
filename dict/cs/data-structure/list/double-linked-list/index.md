---
title: 양방향 연결 리스트
---

더미 노드를 헤드에만 붙였는데, 두 개를 붙이면 LInsert 함수가 좀 더 간단해질 것 같다. 

``` {class="language-c"}
typedef struct _Node
{
    LData data;
    struct _Node *next;
    struct _Node *prev;
} Node;

typedef struct _DBLinkedList
{
    Node *head;
    Node *cur;
    int size;
} DBLinkedList;

typedef DBLinkedList List;

void LInit(List *plist)
{
    plist->head = malloc(sizeof(Node));
    plist->head->next = NULL;
    plist->head->prev = NULL;
    plist->size = 0;
}

void LInsert(List *plist, LData data)
{
    Node *node = malloc(sizeof(Node));
    node->data = data;
    node->next = plist->head->next;
    node->prev = plist->head;
    if (plist->head->next)
        plist->head->next->prev = node;
    plist->head->next = node;
    (plist->size)++;
}

bool LFirst(List *plist, LData *data)
{
    if (!(plist->head->next))
        return false;
    plist->cur = plist->head->next;
    if (data)
        *data = plist->cur->data;
    return true;
}

bool LNext(List *plist, LData *data)
{
    if (!(plist->cur->next))
        return false;
    plist->cur = plist->cur->next;
    if (data)
        *data = plist->cur->data;
    return true;
}

bool LPrev(List *plist, LData *data)
{
    if (plist->cur->prev == plist->head)
        return false;
    plist->cur = plist->cur->prev;
    if (data)
        *data = plist->cur->data;
    return true;
}

int main()
{
    List list;
    Point data;
    LInit(&list);

    for (int i = 1; i < 8; i++)
    {
        data.x = i;
        data.y = i;
        data.level = i;
        LInsert(&list, data);
    }
    if (LFirst(&list, &data))
    {
        PrintPoint(&data);
        while (LNext(&list, &data))
            PrintPoint(&data);
        while (LPrev(&list, &data))
            PrintPoint(&data);
    }
    return 0;
}
```