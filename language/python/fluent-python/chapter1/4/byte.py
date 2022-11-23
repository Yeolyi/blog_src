s = "café"
cafe = bytes(s, encoding="utf_8")
print(cafe)  # b'caf\xc3\xa9'
print(cafe[0])  # 99
print(cafe[:1])  # b'c'. binary sequence의 slice는 언제나 같은 타입을 반환한다.
print(bytearray(cafe))  # bytearray(b'caf\xc3\xa9')
# 32-126은 숫자로, \t, \n, \r, \\, ''있으면 안에 뭐가 붙고 나머지 16진수값은 \x로 표시

print(bytes.fromhex("31 4B CE A9").decode("utf8"))
