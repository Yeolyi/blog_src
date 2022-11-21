import array

# h - 16-bit signed integers
numbers = array.array('h', [-2, -1, 0, 1, 2])
memv = memoryview(numbers)
# cast to bytes
memv_oct = memv.cast('B')
print(memv_oct.tolist())
# 엔디안??
# [254, 255, 255, 255, 0, 0, 1, 0, 2, 0]
