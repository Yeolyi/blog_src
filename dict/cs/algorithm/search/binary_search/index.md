---
title: 이진 탐색
---

``` {class="language-c"}
int binary_search(int arr[], int len, int target)
{
    int lo = 0;
    int hi = len - 1;
    int mid;
    while (lo <= hi)
    {
        mid = (lo + hi) / 2;
        if (target == arr[mid])
        {
            return mid;
        }
        else
        {
            if (target < arr[mid])
            {
                hi = mid - 1;
            }
            else
            {
                lo = mid + 1;
            }
        }
    }
    return -1;
}
```