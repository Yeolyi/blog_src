from collections import Counter

a = 1
for _ in range(3):
    a *= int(input())

# Counter는 딕셔너리의 인터페이스를 가진다.
# 하지만 존재하지 않는 요소에 대해서 KeyError를 일으키는 대신 0을 반환한다.
b = Counter(str(a))

for i in range(0, 10):
    print(b[str(i)])
