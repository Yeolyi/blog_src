lax_coordinates = (33.9425, -118.408056)
city, year, pop, chg, area = ('Tokyo', 2003, 32_450, 0.66, 8014)
traveler_ids = [('USA', '31195855'), ('BRA', 'CE342567'), ('ESP', 'XDA205856')]
for passport in sorted(traveler_ids):
    print('%s/%s' % passport)

# unpacking
# _도 유효한 변수 이름. 다만 switch에서는 와일드카드로 사용.
# 파이썬 콘솔에서는 이전 명령의 반환값이 None이 아닌한 _에 대입된다.
for country, _ in traveler_ids:
    print(country)
