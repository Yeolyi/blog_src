input()
while True:
    try:
        a = input().split()
        cnt = int(a[0])
        s = a[1]
        for c in s:
            print(c * cnt, end="")
        print()
    except:
        break
