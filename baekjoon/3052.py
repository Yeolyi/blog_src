# 집합을 사용한 풀이 - 68ms
l = set()
for _ in range(10):
    l.add(int(input()) % 42)
print(len(l))

# 비트마스크를 사용한 풀이 - 36ms
# 가능한 경우의 수가 42개이므로 
# 정수 자료형의 크기가 64비트면 괜찮고 32비트면 안된다.
# Python은 int의 크기에 상한이 없어 상관없다. 
n = 0
for _ in range(10):
    n |= 1 << (int(input()) % 42)
# int.bit_count()
# 수를 이진법으로 표현했을 때 1의 개수를 반환한다.
print(n.bit_count())
