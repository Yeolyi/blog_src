from unicodedata import name

result = {chr(i) for i in range(32, 256) if 'SIGN' in name(chr(i), '')}
{'§', '=', '¢', '#', '¤', '<', '¥', 'µ', '×', '$', '¶', '£', '©',
 '°', '+', '÷', '±', '>', '¬', '®', '%'}
print(result)  # salted hash때문에 순서는 매번 바뀐다.
