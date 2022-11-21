from collections import deque

dq = deque(range(10), maxlen=10)
print(dq)  # deque([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], maxlen=10)
dq.rotate(3)
print(dq)  # deque([7, 8, 9, 0, 1, 2, 3, 4, 5, 6], maxlen=10)
dq.appendleft(-1)
print(dq)  # deque([-1, 7, 8, 9, 0, 1, 2, 3, 4, 5], maxlen=10)
