from itertools import product
from collections import deque

N, M = map(int, input().split(' '))
arr = [[x for x in input()] for _ in range(N)]
trbl = [[-1, 0], [1, 0], [0, 1], [0, -1]]
maxVal = 99999

# 시작 위치
startPos = [0, 0]
for n, m in product(range(N), range(M)):
    if arr[n][m] == 'J':
        startPos = [n, m]
        break

# 불까지의 거리
fireDistance = [[maxVal]*M for _ in range(N)]
queue = deque()
for n, m in product(range(N), range(M)):
    if arr[n][m] == 'F':
        fireDistance[n][m] = 0
        queue.append([0, n, m])

while len(queue) != 0:
    dist, n, m = queue.popleft()
    for dn, dm in trbl:
        n2 = n + dn
        m2 = m + dm
        if n2 in range(N) and m2 in range(M) and fireDistance[n2][m2] == maxVal and arr[n2][m2] != '#':
            fireDistance[n2][m2] = dist + 1
            queue.append([dist+1, n2, m2])

# BFS
queue = deque()
visited = [[False]*M for _ in range(N)]
visited[startPos[0]][startPos[1]] = True
queue.append([0, *startPos])

while len(queue) != 0:
    time, n, m = queue.popleft()
    if n == 0 or n == N-1 or m == 0 or m == M-1:
        print(time+1)
        break
    for dn, dm in trbl:
        n2 = n + dn
        m2 = m + dm
        if n2 in range(N) and m2 in range(M):
            if not visited[n2][m2] and arr[n2][m2] != '#' and time+1 < fireDistance[n2][m2]:
                visited[n2][m2] = True
                queue.append([time+1, n2, m2])
else:
    print('IMPOSSIBLE')
