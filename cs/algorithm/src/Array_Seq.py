class Array_Seq:
    def __init__(self):
        self.A = []
        self.size = 0

    def __len__(self):
        return self.size

    def __iter__(self):
        yield from self.A

    def build(self, X):
        self.A = [a for a in X]  # 정적 배열을 만든다고 속아주자
        self.size = len(self.A)

    def get_at(self, i):
        return self.A[i]

    def set_at(self, i, x):
        self.A[i] = x

    def _copy_forward(self, i, n, A, j):
        for k in range(n):
            A[j + k] = self.A[i + k]

    def _copy_backward(self, i, n, A, j):
        for k in range(n - 1, -1, -1):
            A[j + k] = self.A[i + k]

    def insert_at(self, i, x):
        n = len(self)
        A = [None] * (n + 1)
        self._copy_forward(0, i, A, 0)
        A[i] = x
        self._copy_forward(i, n - i, A, i + 1)
        self.build(A)

    def delete_at(self, i):
        n = len(self)
        A = [None] * (n - 1)
        self._copy_forward(0, i, A, 0)
        x = self.A[i]
        self._copy_forward(i + 1, n - i - 1, A, i)
        self.build(A)
        return x

    def insert_first(self, x):
        self.insert_at(0, x)

    def delete_first(self):
        return self.delete_at(0)

    def insert_last(self, x):
        self.insert_at(len(self), x)

    def delete_last(self):
        return self.delete_at(len(self) - 1)

    def __repr__(self) -> str:
        return ", ".join(map(str, self.A))
