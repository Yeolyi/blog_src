a = {1, 2, 3}
print(a.union([4], [5], [1, 2, 3]))
print({*[1, 2, 3], *{4, 5, 6}})

b = {2, 3, 4}
print(a ^ b)

c = {1, 2}
print(1 in a)  # True
print(c <= a)  # True
print(c < {1, 2})  # False

c.add(4)
c.clear()
c.discard(1) # 없어도 됨
c.pop()
c.remove(1) # 없으면 KeyError