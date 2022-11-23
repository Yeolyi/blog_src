s = "café"
print(len(s))  # 4
b = s.encode("utf8")
print(b)  # b'caf\xc3\xa9'
print(len(b))  # 5
print(b.decode("utf8"))

for codec in ["latin_1", "utf_8", "utf_16"]:
    print(codec, "El Niño".encode(codec))
