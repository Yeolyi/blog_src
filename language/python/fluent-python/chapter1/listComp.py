symbols = '가나다라'
print([ord(symbol) for symbol in symbols])

# for에 대입된 변수를 담을 별도의 지역 스코프가 있다
x = 'ABC'
codes = [ord(x) for x in x]
print(x)  # ABC
print(codes)  # [65, 66, 67]
# Walrus operator는 예외. 얘는 enclosing function이 스코프이다.
codes = [last := ord(c) for c in x]
print(last)  # 67

# Cartesian product
colors = ['black', 'white']
sizes = ['S', 'M', 'L']
tshirts = [(color, size) for color in colors for size in sizes]
print(tshirts)


