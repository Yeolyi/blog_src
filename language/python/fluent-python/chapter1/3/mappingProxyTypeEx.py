# Immutable해야하는 것을 API 외부로 공개할 때 활용할 수 있다.
from types import MappingProxyType
d = {1: 'A'}
d_proxy = MappingProxyType(d)
print(d_proxy)  # {1: 'A'}
# TypeError: 'mappingproxy' object does not support item assignment
# d_proxy[2] = 'x'
