import collections

ct = collections.Counter('abracadabra')
print(ct)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
ct.update = 'aaaaazzz'
print(ct)
print(ct.most_common(3))  # [('a', 5), ('b', 2), ('r', 2)]
