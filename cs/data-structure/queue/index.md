---
title: 큐
---

> In computer science, a queue is a collection of entities that are maintained
> in a sequence and can be modified by the addition of entities at one end of
> the sequence and the removal of entities from the other end of the sequence.
>
> - Wikipedia

## ADT

```{class="language-c"}
void QueueInit(Queue *pq);

bool QIsEmpty(Queue *pq);

void Enqueue(Queue *pq, Data data);

Data Dequeue(Queue *pq);
// 데이터가 하나 이상 존재함이 보장되어야 한다.

Data Qpeek(Queue *pq);
// 데이터가 하나 이상 존재함이 보장되어야 한다.
```
