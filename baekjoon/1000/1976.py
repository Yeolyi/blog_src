N = int(input())
input()
arr = [[x == '1' for x in input().split()] for _ in range(N)]
route = [x-1 for x in map(int, input().split())]


def findParent(parent, x):
    if (parent[x] == x):
        return x
    parent[x] = findParent(parent, parent[x])
    return parent[x]


def union(parent, a, b):
    a = findParent(parent, a)
    b = findParent(parent, b)
    parent[a] = b


parent = [x for x in range(N)]
for i in range(N):
    for j in range(i):
        if arr[i][j]:
            union(parent, i, j)

routeParent = findParent(parent, route[0])

for x in route:
    if findParent(parent, x) != routeParent:
        print('NO')
        break
else:
    print('YES')
