fruits = ['grape', 'raspberry', 'apple', 'banana']
print(sorted(fruits))
print(sorted(fruits, reverse=True))
# stable sort
print(sorted(fruits, key=len))
fruits.sort()
print(fruits)
