x = int(input().split()[1])
arr = [y for y in input().split() if int(y) < x]
print(" ".join(arr))
