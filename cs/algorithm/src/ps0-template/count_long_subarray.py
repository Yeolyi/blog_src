def count_long_subarray(A):
    """
    Input:  A     | Python Tuple of positive integers
    Output: count | number of longest increasing subarrays of A
    """
    temp = []
    subArrs = []
    for i in A:
        if len(temp) == 0:
            temp.append(i)
        elif temp[-1] < i:
            temp.append(i)
        else:
            subArrs.append(temp)
            temp = [i]
    subArrs.append(temp)
    maxLen = max([len(x) for x in subArrs])
    return len([x for x in subArrs if len(x) == maxLen])

# 더 나은 풀이 있으니까 생각해보기