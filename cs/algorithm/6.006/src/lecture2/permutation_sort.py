from itertools import permutations

# 정렬된 배열은 원래 배열의 순열 중 하나임을 보여서
# 끔찍한 알고리즘임에도 기록
# Omega(n!*n)이다. 오메가인 이유는 순열들의 배열을 만드는데 걸리는 시간은 고려 안했기 때문.
def permutation_sort(A):
    for B in permutations(A):
        if is_sorted(B):
            return B
