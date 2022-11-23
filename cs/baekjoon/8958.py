n = int(input())
for _ in range(n):
    cur = 1
    score = 0
    for c in input():
        if c == "O":
            score += cur
            cur += 1
        else:
            cur = 1
    print(score)
