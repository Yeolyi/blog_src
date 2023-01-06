from Array_Seq import Array_Seq
from Linked_List import Linked_List_Seq

arr = Linked_List_Seq()
arr.build([1, 2, 3, 4, 5])
print(len(arr))
print(arr.get_at(0))
print(arr.set_at(1, 200))
arr.insert_at(1, 150)
arr.delete_at(0)
print(arr)
