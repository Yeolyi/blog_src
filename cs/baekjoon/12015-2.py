N = int(input())
S = list(map(int, input().split()))

cache = []

for x in S:
    for i in range(len(cache)):
        if x < cache[i]:
            cache[i] = x
            break
        elif x == cache[i]:
            break
    else:
        cache.append(x)

print(len(cache))
