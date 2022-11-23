# 레거시 인코딩 방법은 에러 리포트 없이 디코딩할 수도 있다.
octets = b"Montr\xe9al"
print(octets.decode("cp1252"))
print(octets.decode("iso8859_7"))
print(octets.decode("koi8_r"))
print(octets.decode("utf_8"))
