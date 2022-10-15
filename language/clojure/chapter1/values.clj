(println 1/3) ; 1/3
(println 4/2) ; 2
; (println 4.0/2) Invalid number: 4.0/2

(println (/ 1 3)) ; 1/3
(println (/ 1.0 3)) ; 0.3333...

(println "JAM") ; JAM

; Clojure에서 키워드는 symbolic identifier이다. 
; 아주 유용하게 사용됨. 단순 값. 
(println :jam) ; :jam

; character
(println \j) ; j

; boolean
(println true false) ; true false
; 그나저나 쉼표 유무는 상관 없는 듯?
(println true, false) ; true false

; nil 
(println nil)

(println (+ 1 1)) ; 2
(println (+ 1 ( + 8 3))) ; 12
