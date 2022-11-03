---
title: Writing an Interpreter in Go
---

Thorsten Ball

## Introduction

인터프리터는 매우 다양한 종류가 있지만, 근본적으로는 모두 소스 코드를 받아 평가하여 실행될 수 있는 눈에 보이는 중간 산물을 만든다는 것이다.

이 책에서는 소스 코드를 파싱해서 AST를 만들고 이를 평가하는 **tree walking interpreter**를 만들 것이다.

### The Monkey Programming Language & Interpreter

아래의 특징을 가지고

- C-like syntax
- variable bindings
- integers and booleans
- arithmetic expressions
- built-in functions
- first-class and higher-order functions
- closures
- a string data structure
- an array data structure
- a hash data structure

아래 부분들로 구성된다.

- the lexer
- the parser
- the Abstract Syntax Tree (AST) • the internal object system
- the evaluator

## 1. Lexing

### 1. Lexical Analysis

소스 코드를 다루기 쉬운 다른 형태로 바꿀 필요성이 있다. 소스 코드에서 토큰으로, 토큰에서 AST로.

토큰으로의 변환은 **lexer**(tokenizer, scanner)가 맡는다.

AST로의 변환은 **parser**가 맡는다.

### 2. Defining Our Tokens

```monkey
// lex할 첫번째 Monkey Language
let five = 5; let ten = 10;
let add = fn(x, y) {
  x + y;
};
let result = add(five, ten);
```

number, identifier, keyword로 구성된다.

!@token/token.go@!

### 3. The Lexer

> We’ll initialize the lexer with our source code and then repeatedly call NextToken() on it to go through the source code, token by token, character by character.

!@lexer/lexer.go@!

> it’s left as an exercise to the reader to fully support Unicode (and emojis!) in Monkey.

### 4. Extending our Token Set and Lexer

따로 소스코드 파일을 만들지는 않음. 위 코드들은 여기 챕터에서 추가된 기능을 담고 있음.

코드가 말이 되고 에러가 있는지 없는지 판단하는 것은 lexer의 일이 아니다.

> The test cases I write for lexers cover all tokens and also try to provoke off-by-one errors, edge cases at end-of-file, newline handling, multi-digit number parsing and so on.

[Off-by-one error](https://en.wikipedia.org/wiki/Off-by-one_error)

Most lexers and parser have such a “peek” function that looks ahead and most of the time it only returns the immediately next character. The difficulty of parsing different languages often comes down to how far you have to peek ahead (or look backwards!) in the source code to make sense of it.

### 5. Start of a REPL

Sometimes the REPL is called “console”, sometimes “interactive mode”.

!@repl/repl.go@!

## 2. Parsing

### 1. Parsers

> A parser is a software component that takes input data (frequently text) and builds a data structure – often some kind of parse tree, abstract syntax tree or other hierarchical structure – giving a structural representation of the input, checking for correct syntax in the process. [...] The parser is often preceded by a separate lexical analyser, which creates tokens from the sequence of input characters;
>
> Wikipedia

JS의 JSON.parse를 떠올리자. Serialization language의 파서라서 프로그래밍 언어의 파서와는 느낌이 다를 수는 있다.

Lisp에서는 소스 코드를 나타내기 위한 데이터 구조를 프로그램에서 데이터로 사용할 수 있다. 'Code is data, data is code"

AST에는 공백문자, 괄호, 대괄호 등등이 생략되어있을 수 있다.

### 2. Why Not a Parser Generator?

Parser generator: yacc, bison, ANTLR, 언어를 묘사하면 parser를 만들어준다. 대부분은 BNF(Backus-Naur Form), EBNF(Extended Backus-Naur Form)과 같은 CFG(context-free grammer)를 입력으로 받는다.

파서는 자동적으로 생성되기에 매우 적합하며 CS에서 잘 연구된 분야이다. 

그래도 학습을 위해 스스로 만들어보자. 

### 3. Writing a Parser For the Monkey Programming Language

top-down parsing - recursive descent parsing, early parsing, predictive parsing,,,
bottom-up parsing

Recursive descent parsing이 직관에 가장 맞는다. 

### 4. Parser's First Steps: Parsing Let Statements

Programs in Monkey are a series of statements.

Expressions produce values, statements don’t.

!@ast/ast.go@!

!@parser/parser.go@!

We will get to this later and look at expression parsing in detail, since it’s probably the most complicated but also the most beautiful part of the parser, making heavy use of “Pratt parsing”.

Parser는 토큰을 계속 advance하며 현재 토큰을 통해 무슨 작업을 할지 결정한다. 

## 3. Evaluation

## 4. Extending the Interpreter
