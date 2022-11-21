import numpy as np
a = np.arange(12)
print(a)  # [ 0  1  2  3  4  5  6  7  8  9 10 11]
print(a.shape)
a.shape = 3, 4
print(a)
print(a[:, 1])
print(a.transpose())
