from collections import Counter

a = 1
for _ in range(3):
    a *= int(input())

b = Counter(str(a))

for i in range(0, 10):
    print(b.get(str(i), 0))
