---
title: 원형 연결 리스트
---

head와 tail의 명확한 정의는 무엇일까?

- tail에 추가하면 순회할 때 순서대로 되는 걸까?
- tail인데 더미 노드를 사용한 구현을 하면 순서대로 될 수 없다. tail의 위치를 옮길 수 없기 때문.

여기서는 더미가 무조건 좋지는 않은 것 같다. LNext에서 조건문이 생겨버림.

```{class="language-c"}
typedef struct _cLinkedList
{
    Node *head;
    Node *cur;
    Node *prev;
    int size;
} CLinkedList;

typedef CLinkedList List;

void ListInit(List *plist)
{
    plist->head = malloc(sizeof(Node));
    plist->head->next = plist->head;
    plist->size = 0;
}

void LInsert(List *plist, LData data)
{
    Node *node = malloc(sizeof(Node));
    node->data = data;
    node->next = plist->head->next;
    plist->head->next = node;
}

bool LFirst(List *plist, LData *data)
{
    if (plist->head->next == plist->head)
        return false;
    plist->cur = plist->head->next;
    plist->prev = plist->head;
    if (data)
        *data = plist->cur->data;
    return true;
}

void LNext(List *plist, LData *data)
{
    plist->prev = plist->cur;
    plist->cur = plist->cur->next;
    if (plist->cur == plist->head)
    {
        plist->prev = plist->cur;
        plist->cur = plist->cur->next;
    }
    if (data)
        *data = plist->cur->data;
}

void LRemove(List *plist)
{
    plist->prev->next = plist->cur->next;
    free(plist->cur);
    plist->cur = plist->prev;
}

int LCount(List *plist)
{
    return plist->size;
}

int main(void)
{
    int testDataSize = 7;
    int xList[] = {3, 1, 4, 1, 5, 9, 2};
    int yList[] = {6, 8, 3, 5, 8, 9, 7};
    int level[] = {3, 2, 3, 8, 4, 6, 2};

    Point *testData = malloc(sizeof(Point) * testDataSize);

    for (int i = 0; i < testDataSize; i++)
    {
        testData[i].x = xList[i];
        testData[i].y = yList[i];
        testData[i].level = level[i];
    }

    List list;
    Point data;
    ListInit(&list);

    for (int i = 0; i < testDataSize; i++)
        LInsert(&list, testData[i]);

    printf("Data Count: %d\n", LCount(&list));
    if (LFirst(&list, &data))
    {
        PrintPoint(&data);
        for (int i = 0; i < 10; i++)
        {
            LNext(&list, &data);
            PrintPoint(&data);
        }
    }
    puts("");
    if (LFirst(&list, &data))
    {
        if (data.level == 2)
            LRemove(&list);
        for (int i = 0; i < 10; i++)
        {
            LNext(&list, &data);
            if (data.level == 2)
                LRemove(&list);
        }
    }
    if (LFirst(&list, &data))
    {
        PrintPoint(&data);
        for (int i = 0; i < 10; i++)
        {
            LNext(&list, &data);
            PrintPoint(&data);
        }
    }
}
```
