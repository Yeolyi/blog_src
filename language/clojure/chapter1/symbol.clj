; def allows us to give something a name
(def developer "Alice")
(println developer) ; Alice

; 콘솔에서 실행시키면 아래처럼 user 네임스페이스가 있음
; Created a var object in the default namespace of our REPL called user
; (def developer "Alice")
; -> #'user/developer’
; user/devloper
; -> "Alice"


; let은 자신이 속한 context에서만 유효한 심벌에 값을 바인딩한다. 
(
  let [a "a" b "b"]
  (println a b)
)
; (print a b) 없음

; defn
(defn follow-the-rabbit [] "Off we go!")
(println  (follow-the-rabbit))

(defn shop-for-jams [jam1 jam2]
  {:name "jam-basket"
   :jam1 jam1
   :jam2 jam2
  }
)
(println (shop-for-jams "strawberry" "marmalade"))

; 괄호 두 개여야 invoke
(println ((fn [] (str "Off we go" "!"))))

; 사실 defn은 fn로 만든 익명 함수에 def한 것과 같다.

; 익명 함수 shorthand
(println (#(str "Off we go" "!")))
(println (#(str "Off we go" "!" "-" %) "again"))
(println (#(str "Off we go" "!" "-" %1 %2) "again" " again!!"))
