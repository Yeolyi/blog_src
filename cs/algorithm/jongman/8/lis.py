import time
import random

# 구종만 - 알고리즘 문제 해결 전략

# 최대 증가 부분 수열(LIS, Longest Increasing Subsequence)

# 부분 수열: 수열에서 0개 이상의 숫자를 지우고 남은 수열.
# 부분 수열의 수들이 순 증가하면 증가 부분 수열이다.
# LIS는 주어진 수열의 증가 부분 수열 중 가장 긴 것을 찾는 문제.

# 완전 탐색 풀이
# 입력이 배열이기에 메모이제이션이 어렵다.
# 수열의 크기가 1000인 백준 11053 문제를 풀 수 없다.

S = [4, 2, 3, 11, 7, 6, 9]


def lis1(A):
    if len(A) == 0:
        return 0
    ret = 0
    for i in range(len(A)):
        sub = [x for x in A[i+1:] if A[i] < x]
        ret = max(ret, 1 + lis1(sub))
    return ret


print(lis1(S))

# 동적 계획법 풀이
# 이전 구현에서 A는 다음 2가지 중 하나이다
# - 원래 주어진 수열 S
# - S[i]에 대해 S[i+1:] 부분 수열에서 S[i]보다 큰 것만 남은 부분 수열
#   - 이때 부분 수열은 S의 인덱스와 1대1 대응이다.
#   - 입력값을 인덱스로 바꿔보자!


cache = [-1] * 100
S = [4, 2, 3, 11, 7, 6, 9]

# S[start]에서 시작했을 때 최대 길이를 반환


def lis2(start):
    if cache[start] != -1:
        return cache[start]
    # 항상 S[start]는 있기에 1
    ret = 1
    for i in range(start+1, len(S)):
        if S[start] < S[i]:
            ret = max(ret, 1 + lis2(i))
    cache[start] = ret
    return ret


ret = 0
for i in range(len(S)):
    ret = max(ret, lis2(i))
print(ret)

# O(n^2)의 시간복잡도를 갖는다
# 수열의 크기가 1000인 백준 11053 문제를 풀 수 있다.
# 수열의 크기가 1000000인 백준 12015 문제를 풀 수 없다.
