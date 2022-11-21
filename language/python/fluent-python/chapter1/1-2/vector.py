import math


class Vector:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def __repr__(self):
        return f'Vector({self.x!r}, {self.y!r})'

    def __abs__(self):
        return math.hypot(self.x, self.y)

    def __bool__(self):
        # The builtins True and False are the only two instances of the class bool.
        # The class bool is a subclass of the class int, and cannot be subclassed.
        return bool(abs(self))

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y*scalar)


v1 = Vector(3, 4)
v2 = Vector(2, 1)

print(v1 + v2)
print(abs(v1))
print(v1 * 3)
print(abs(v1*3))
