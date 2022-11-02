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

### 2. Defining Our Tokens

### 3. The Lexer

### 4. Extending our Token Set and Lexer

### 5. Start of a REPL

## 2. Parsing

## 3. Evaluation

## 4. Extending the Interpreter
