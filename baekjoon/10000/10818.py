input()
# 그냥 map을 하면 min에서 iterator를 exhaust하는 듯
l = list(map(int, input().split()))
print(f"{min(l)} {max(l)}")
