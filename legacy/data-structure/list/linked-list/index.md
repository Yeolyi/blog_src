---
title: 연결 리스트 구현
---

## ADT 수정

ADT를 다음과 같이 수정한다. 윤성우님 자료구조 책에 따른 것인데, 연결 리스트가 배열 기반 리스트보다뒤쪽에 있어서 정렬 기능을 추가한 것인지 삽입 위치 뒤쪽에 있는모든 원소를 옮겨야 하는 배열과 다르게연결리스트는 포인터만 바꿔주면 되니 추가한것인지는 모르겠다 ㅎㅎ.

- Swift의 sort(by: ) 메소드를 참고해서 정렬 기준 함수의 이름을 AreInIncreasingOrder로 바꿨다.
- 정렬 기준 함수가 추가되어있으면 LInsert 함수는 그 순서에 맞게 원소를 삽입한다.

```{class="language-c"}
void SetSortRule(List *plist, int (*comparator)(LData d1, LData d2));
// 리스트에 정렬의 기준이 되는 함수를 등록한다.

bool IsPointIncreasingOrder(Point *a, Point *b)
{
    if (a->x == b->x)
        return a->y < b->y;
    return a->x < b->x;
}
```

지금까지 배운 범위에서는 새 노드의 추가 위치에 따라, 더미 노드의 유무에 따라 구현의 형태가 달라지는데 전자가 자료 구조의 특성을 더 바꾸는 것 같아서(순회할 때의순서가 바뀐다) 우선 이를 기준으로 나누어보았다. 더미 노드는 테크닉? 느낌이라서.

책에 따르면, 머리에 새 노드를 추가하는 것과 꼬리에 하는 것의 장단점은 다음과 같다.

머리 추가

- 장점: 포인터 변수 tail이 불필요하다.
- 단점: 저장된 순서를 유지하지 않는다.

꼬리 추가

- 장점: 저장된 순서가 유지된다.
- 단점: 포인터 변수 tail이 필요하다.

[꼬리가 있는 구현](with-tail)

[꼬리가 없는 구현](without-tail)
