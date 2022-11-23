u16 = "El Niño".encode("utf_16")
print(u16)
# b'\xff\xfeE\x00l\x00 \x00N\x00i\x00\xf1\x00o\x00'
# b'`xff`xfe
# The bytes are b'\xff\xfe'. That is a BOM—byte-order mark—denoting the “little-endian” byte ordering of the Intel CPU where the encoding was performed.
# 혼란을 막기 위해 UTF-16은 prepends the text with ZERO WIDTH NO_BREAK SPACE(U+FEFF)
# BOM은 UTF-16 codec에 의해 필터링된다. 