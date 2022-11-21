import array

symbols = 'abcde'
# 대괄호 대신 소괄호
print(tuple(ord(symbol) for symbol in symbols))

# I는 storage type
print(array.array('I', (ord(symbol) for symbol in symbols)))

# 메모리를 아낄 수 있다.
colors = ['black', 'white']
sizes = ['S', 'M', 'L']
for tshirt in (f'{c} {s}' for c in colors for s in sizes):
    print(tshirt)
