---
title: 재귀를 활용한 하노이의 탑 풀이
---

```{class="language-c"}
#include <stdio.h>

void Hanoi(char from, char through, char to, int num)
{
    if (num == 1)
    {
        printf("%c에서 %c로 %d번 원반을 이동\n", from, to, num);
    }
    else
    {
        Hanoi(from, to, through, num - 1);
        printf("%c에서 %c로 %d번 원반을 이동\n", from, to, num);
        Hanoi(through, from, to, num - 1);
    }
}

int main()
{
    Hanoi('A', 'B', 'C', 3);
}
```
