def merge_sort(A, a=0, b=None):
    if b is None:
        b = len(A)
    if 1 < b - a:
        # a + b가 짝수면 1 더하는거 의미 없고
        # 홀수인 경우 c가 b에 더 가깝도록 한다. 
        c = (a + b + 1) // 2
        merge_sort(A, a, c)
        merge_sort(A, c, b)
        L, R = A[a:c], A[c:b]
        i, j = 0, 0
        while a < b:
            if (j >= len(R)) or (i < len(L) and L[i] < R[j]):
                A[a] = L[i]
                i += 1
            else:
                A[a] = R[j]
                j += 1
            a += 1


arr = [9, 8, 7, 6, 5, 34, 3, 2, 1]
merge_sort(arr)
print(arr)
