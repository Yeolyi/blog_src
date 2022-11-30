from itertools import product

N = int(input())
# 3^7*3^7면 이차원 배열로 저장할만하다.
arr = [[False] * N for _ in range(N)]

iterAround = [
    (dm, dn) for dm, dn in product(range(3), range(3)) if not (dm == 1 and dn == 1)
]

# 크기 N의 패턴은 N/3의 패턴으로 구성되어있다.
# N==3일때까지 쪼개보자.
def draw(m, n, size):
    # 기저 사례. 별을 찍는다.
    if size == 3:
        for dm, dn in iterAround:
            arr[n + dn][m + dm] = True
    else:
        # 작은 사이즈로 쪼갠다
        # /으로 나누면 int가 아니어서 에러
        size2 = size // 3
        for dm, dn in iterAround:
            draw(m + size2 * dm, n + size2 * dn, size2)


draw(0, 0, N)

for row in arr:
    print("".join(["*" if x else " " for x in row]))
