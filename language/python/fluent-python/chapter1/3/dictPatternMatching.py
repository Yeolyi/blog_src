from collections import OrderedDict


def get_creators(record: dict) -> list:
    match record:
        case {'type': 'book', 'api': 2, 'authors': [*names]}:
            return names
        case {'type': 'book', 'api': 1, 'author': name}:
            return [name]
        case {'type': 'book'}:
            raise ValueError(f"Invalid 'book' record: {record!r}")
        case {'type': 'movie', 'director': name}:
            return [name]
        case _:
            raise ValueError(f'Invalid record: {record!r}')


# Sequence pattern과 다르게 부분적인 매치도 좋다.
b1 = dict(api=1, author='Douglas Hofstadter',
          type='book', title='Godel, Escher, Bach')
print(get_creators(b1))

# 순서있어도 상관없다.
b2 = OrderedDict(api=2, type='book', title='Python in a Nutshell',
                 authors='Martelli Ravenscroft Holden'.split())
print(get_creators(b2))
get_creators({'type': 'book', 'pages': 770})
