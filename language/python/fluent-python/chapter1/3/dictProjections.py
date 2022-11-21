d = dict(a=10, b=20, c=30)
values = d.values()
d['d'] = 40
print(values)  # dict_values([10, 20, 30, 40])
