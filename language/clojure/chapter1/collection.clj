; List
(println '(1 2 "A" :B))
; 쉼표는 무시되고 공백과 같이 처리된다.
; 클로저에서는 코드 스타일의 맥락에서 idiomatic이란 단어가 자주 사용된다. 
; 'You can use commas, but it is idiomatic not to.'

(println (first '(:a :b :c :d))) ; :a
(println (rest '(:a :b :c :d))) ; (:b :c :d)
(println (first (rest '(:a :b :c :d)))) ; :b

(println (first '())) ; nil

; 첫번째 인자는 추가하고자 하는 요소, 두번째는 리스트
(println (cons 5 '())) ; (5)
; 리스트의 끝은 nil로 specified되므로 아래도 된다.
(println (cons 5 nil)) ; (5)
(println (cons 1 '(2))) ; (1 2)
; (println (cons '(2) 1)) IllegalArgumentException


; Vector
; Collecting Data by Index
(println [1 2 3 4 5]) ; [1 2 3 4 5]
; 리스트와 달리 fast index access 가능
(println (nth [1 2 3 4 5] 3)) ; 4
(println (nth '(1 2 3 4 5) 3)) ; 4
; 되지만 vector에서 더 성능이 좋다. 리스트에서는 첫번째 인덱스부터 탐색한다

(println (count [1 2 3])) ; 3

; conj 함수는 가장 자연스러운 위치에 원소를 삽입한다.
(println (conj '(1 2) 3)) ; (3 1 2)
; 정황상 list는 연결리스트인 것 같기도?
(println (conj [1 2] 3)) ; [1 2 3]


; Map
(println {:jam1 "strawberry" :jam2 "blackberry"}) 
; Maps are the on place that it can be idiomatic to leave the commas in for readability.
(println {:jam1 "strawberry", :jam2 "blackberry"}) 

(println (get {:jam1 "strawberry", :jam2 "blackberry"} :jam3)) ; nil
(println (get {:jam1 "strawberry", :jam2 "blackberry"} :jam3 "not found")) ; not found

; 키를 함수로써 사용할 수 있다.
; 키워드는 맵의 키로써 가장 많이 사용된다. 
(println (:jam1 {:jam1 "strawberry", :jam2 "blackberry"})) ; strawberry

(println (keys {:jam1 "strawberry", :jam2 "blackberry"})); ; (:jam1 :jam2)
(println (vals {:jam1 "strawberry", :jam2 "blackberry"})); ; (:jam1 :jam2)
