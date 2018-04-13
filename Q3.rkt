#lang racket

;;Q3.1
(define (count-syllables str)
  (cond
    ((null? str) 0)
    ((member (car str) '(a e i o u))
     (+ 1 (skip-vowels (cdr str))))
    (else
     (count-syllables (cdr str)))))

(define (skip-vowels str)
  (cond
    ((null? str)
     (count-syllables '()))
    ((member (car str) '(a e i o u))
     (skip-vowels (cdr str)))
    (else
     (count-syllables str))))
;;tests

(display "test for count-syllables") (newline)
(display "test1: exepted: 2 get:")
(count-syllables '(s o a r i n g)) ;;=>2
(newline)
(display "test2: exepted: 2 get:")
(count-syllables '(o a r i n g)) ;;begin with vowels=>2
(newline)
(display "test3: exepted: 0 get:")
(count-syllables '()) ;;empty word=>0
(newline)
(display "test4: exepted: 1 get:")
(count-syllables '(a e i o u )) ;;only one vowel=>1
(newline)
(display "test5: exepted: 0 get:")
(count-syllables '(1 2 3 4 5)) ;; not char*=>0
(newline)
(display "test6: exepted: 1 get:")
(count-syllables '(a a a a a a)) ;;only one vowel=>1
(newline)


;;Q3.2
(define sorted? 
  (lambda (list comp)
      (if(empty? list)
       #t
       (if(null?(cdr list))
          #t
          (if (comp (car list)(car (cdr list)))
            (sorted? (cdr list) comp)
            #f)))))
;;tests

(display "test for sorted? with operator='<'") (newline)
(display "test1: exepted: T get:")
(sorted? '(1 2 3 ) <)                                                                       ;regulat list =>output: T
(newline)
(display "test2: exepted: T get:")
(sorted? '(3 ) <)                                                                           ;only one elemnt =>output: T
(newline)
(display "test3: exepted: T get:")
(sorted? '( ) <)                                                                            ;empty list =>output: T
(newline)
(display "test4: exepted: F get:")
(sorted? '(1 3 2) <)                                                                        ;last elemnt is mistake =>output: f
(newline)
(display "test5: exepted: F get:")
(sorted? '(3 4 2) <)                                                                        ;first elemnt is mistake =>output: f
(newline)
;;changed operator
(display "test for sorted? with operator='>='")
(newline)
(display "test6: exepted: T get:")
(sorted? '(3 2 1 1) >=)                                                                     ;regulat list =>output: T
(newline)
(display "test7: exepted: T get:")
(sorted? '(3 ) >=)                                                                           ;only one elemnt =>output: T
(newline)
(display "test8: exepted: T get:")
(sorted? '( ) >=)                                                                            ;empty list =>output: T
(newline)
(display "test9: exepted: F get:")
(sorted? '(1 3 2) >)                                                                        ;first elemnt is mistake =>output: f
(newline)
(display "test10: exepted: F get:")
(sorted? '(3 4 2) >)                                                                        ;last elemnt is mistake =>output: f
(newline)
;Q3.3
(define (merge list1 list2)
  (if (sorted? list1 <)
        (if (sorted? list1 <)
  (cond((null? list1) list2)
     ((null? list2) list1)
     ((>= (car list1) (car list2))
       (cons (car list2) (merge list1 (cdr list2))))
     (else
      (cons (car list1) (merge (cdr list1) list2))))(raise 'one-of-the-lists-is-not-sorted #t))(raise 'one-of-the-lists-is-not-sorted #t)))
;;tests
(display "test for merge")
(newline)
(display "test1 merge to regular array: exepted:(1 2 3 5 6 8) get:")
(merge '(1 3 8) '(2 5 6))
(newline)
(display "test2 merge empty array: exepted:(1 2 3 ) get:")
(merge '(1 3 8) '())
(newline)
(display "test3 merge with two empty list: exepted:( ) get:")
(merge '() '())

;Q3.4
(define (remove-adjacent-duplicates lst)
  (cond
    ((null? lst) '()) 
    ((null? (cdr lst)) car lst) 
    ((equal? (car lst)(car(cdr lst)))
              (remove-adjacent-duplicates(cdr lst)))
    (else (cons(car lst)(remove-adjacent-duplicates(cdr lst))))  
  ))

(display "test for remove-adjacent-duplicates")
(newline)
(display "test1 regular string: exepted:'(y a b a d a b a d o) get:")
(remove-adjacent-duplicates '(y a b b a d a b b a d o o)) ;;==>'(y a b a d a b a d o)
(newline)
(display "test2 empty string: exepted:'() get:")
(remove-adjacent-duplicates '()) ;;==>'() empty list
(newline)
(display "test3 only one elemnt: exepted:'(y) get:")
(remove-adjacent-duplicates '(y)) ;;==>'(y) only one element
(display "test4 only one elemnt duplicate a lot of time: exepted:'(y) get:")
(remove-adjacent-duplicates '(y y y y y y y y y y y y y y)) ;;==>'(y)
(display "test5 only one word duplicate a lot of time: exepted:'(ab) get:")
(remove-adjacent-duplicates '(ab ab ab ab)) ;;==>'(ab)
(display "test6 with numbers and some spaces: exepted:'(1 2 3 4 5) get:")
(remove-adjacent-duplicates '(1 1 2 3 4   4 5)) ;;==>'(ab)
