from unicodedata import normalize

s1 = "café"
s2 = "cafe\N{COMBINING ACUTE ACCENT}"
print(s1, s2)
print(len(s1), len(s2))
print(s1 == s2)

print(normalize("NFC", s1) == normalize("NFC", s2))
