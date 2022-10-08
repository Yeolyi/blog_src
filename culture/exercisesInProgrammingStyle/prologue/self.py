# Instance method 사용법
class Example:
    def set_name(self, n):
        self._name = n

    def say_name(self):
        print(self._name)


e = Example()
# self가 생략되었는데, 파이썬에서 dot notation은 사실 syntatic sugar이기 때문
# Example.set_name(e, 'yeolyi')
e.set_name('yeolyi')
e.say_name()
