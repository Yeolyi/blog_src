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



## 2. Parsing

## 3. Evaluation

## 4. Extending the Interpreter
