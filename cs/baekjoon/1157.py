from collections import Counter

a = Counter(x.lower() for x in input())
maxVal = max(a.values())

r = [key for key, value in a.items() if value == maxVal]

print("?" if len(r) != 1 else r[0].upper())
