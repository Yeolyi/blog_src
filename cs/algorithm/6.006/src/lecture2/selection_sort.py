# 인덱스 i까지 정렬한다.
def selection_sort(A, i=None):
    if i is None:
        i = len(A) - 1
    if i > 0:
        j = prefix_max(A, i)
        A[i], A[j] = A[j], A[i]
        selection_sort(A, i - 1)


# i까지의 요소들 중 가장 큰 것의 인덱스를 반환한다.
# 기저사례인 i=0일때는 당연히 참이고, i일 때 참이라면 i+1일때의 최댓값은 A[:i+1] 혹은 A[i+1]인데 모든 경우에 잘 반환한다.
# S(1) = theta(1), S(n) = S(n-1) + theta(1).
def prefix_max(A, i):
    if i > 0:
        j = prefix_max(A, i - 1)
        if A[i] < A[j]:
            return j
    return i
