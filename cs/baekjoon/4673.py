# 10000개면 저장할만하니 배열로 관리하자
# 마지막까지 True로 남아있으면 셀프 넘버
arr = [True] * 10001

# 다음 생성자 구하기
def next(n):
    temp = n
    while 0 < n:
        n, r = divmod(n, 10)
        temp += r
    return temp


# 10000(살펴볼 범위) * 10000(생성자 개수) = 1억이니 완전 탐색해 볼 만하다
for i in range(1, 10001):
    if arr[i]:
        while (i := next(i)) < 10001:
            # 배열에서 False를 만나면 그 뒤는 살펴보지 않아도 된다.
            if arr[i] == False:
                break
            else:
                arr[i] = False

for i in range(1, 10001):
    if arr[i]:
        print(i)
