dial_codes = [
    (880, 'Bangladesh'),
    (55,  'Brazil'),
    (86,  'China'),
    (91,  'India'),
    (62,  'Indonesia'),
    (81,  'Japan'),
    (234, 'Nigeria'),
    (92,  'Pakistan'),
    (7,   'Russia'),
    (1,   'United States'),
]
country_dial = {country: code for code, country in dial_codes}

print(country_dial)
print({code: country.upper()
      for country, code in sorted(country_dial.items()) if code < 70})


def dump(**kwargs):
    return kwargs


# 여기서는 중복이 안되고
print(dump(**{'x': 1}, y=2, **{'z': 3}))
# 여기서는 된다
print({'x': 0, **{'x': 1}})

d1 = {'a': 1, 'b': 3}
d2 = {'a': 2, 'b': 4, 'c': 6}
print(d1 | d2)
