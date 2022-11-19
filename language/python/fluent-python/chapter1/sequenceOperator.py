l = [[]] * 3
l[0].append(1)
print(l)  # [[1], [1], [1]]

l = [1, 2, 3]
print(id(l))
l *= 2
print(id(l))

t = (1, 2, 3)
print(id(t))
t *= 2
print(id(t))

# This exmaple is quite a corner case.
# t = (1, 2, [30, 40])
# t[2] += [50, 60]
# print(t)

# 뭐지 얘는
# dis.dis('s[1] += b')
