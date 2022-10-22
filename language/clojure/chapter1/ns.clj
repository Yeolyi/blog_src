(println (ns alice.favfoods)) ; nil
; (println ns alice.favfoods) ; 이러면 터짐
;이후의 def는 해당 이름 공간에 할당된다.

; REPL에서 *ns*로 현재 네임스페이스 알 수 있음
; 별표는 earmuff로 used as a convention for things that are intended for rebinding

(def fav-food "strawberry jam")
(println fav-food)

(ns rabbit.favfoods)

(def fav-food "lettuce soup")
(println fav-food)
(println alice.favfoods/fav-food)

; 클로저 libs도 이를 적극 활용 중
; REPL이 실행될 때 auto-required되지만 아니면 아래 구문으로 require
; (require 'clojure.set)

(ns wonderland)
(require '[alice.favfoods :as af])
(println af/fav-food) ; strawberry jam

(ns wonderland (:require [alice.favfoods :as af])) ; ?????

; Most Clojure code will use libs with a require and specify an alias using :as

; :refer :all은 추천하지 않는다니 공부 생략

