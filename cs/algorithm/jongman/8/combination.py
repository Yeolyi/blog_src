def bino(n, r):
    bino.cnt += 1
    # 기저 사례
    if r == 0 or n == r:
        return 1
    return bino(n - 1, r - 1) + bino(n - 1, r)


bino.cnt = 0
bino(25, 12)
print(bino.cnt)  # 10400599


cache = [[-1]*30 for _ in range(30)]

# 캐시를 사용한 경우는 세지 않음에 유의
def bino2(n, r):
    if r == 0 or n == r:
        bino2.cnt += 1
        return 1
    if cache[n][r] != -1:
        return cache[n][r]
    bino2.cnt += 1
    val = bino2(n-1, r-1) + bino2(n-1, r)
    cache[n][r] = val
    return val


bino2.cnt = 0
bino2(25, 12)
print(bino2.cnt)  # 181
