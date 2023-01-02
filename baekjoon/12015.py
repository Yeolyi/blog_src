N = int(input())
S = list(map(int, input().split()))

cache = [-1] * N


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
