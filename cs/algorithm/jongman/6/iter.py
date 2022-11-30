def factorial(x):
    if x == 1:  # This is the base case
        return 1
    else:  # This is the recursive case
        return x * factorial(x - 1)


from itertools import permutations, combinations, combinations_with_replacement

for i in permutations([3, 2, 1], 2):
    print(i)
for i in combinations([3, 2, 1], 2):
    print(i)
# 같은 값 중복 허용
for i in combinations_with_replacement([3, 2, 1], 2):
    print(i)
