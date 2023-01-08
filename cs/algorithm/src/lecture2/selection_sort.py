# Sort A[:i+1]
def selection_sort(A, i=None):
    if i is None:
        i = len(A) - 1
    if i > 0:
        j = prefix_max(A, i)
        A[i], A[j] = A[j], A[i]
        selection_sort(A, i - 1)


# Return index of maximum in A[:i+1]
# 기저 사례: 0일때는 요소가 하나니 그게 최대
# Induction: assume correct for i, maximum is either the maximum of A[:i] or A[i], returns correct index in either case??
# S(1) = theta(1), S(n) = S(n-1) + theta(1). 
def prefix_max(A, i):
    if i > 0:
        j = prefix_max(A, i - 1)
        if A[i] < A[j]:
            return j
    return i
