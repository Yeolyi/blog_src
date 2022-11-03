package ast

import "monkey/token"

type Node interface {
	// TokenLiteral() will be used only for debugging and testing.
	TokenLiteral() string
}

type Statement interface {
	Node
	// dummy method
	statementNode()
}

type Expression interface {
	Node
	// dummy method
	expressionNode()
}

type Program struct {
	Statements []Statement
}

// This Program node is going to be the root node of every AST our parser produces.
func (p *Program) TokenLiteral() string {
	if len(p.Statements) > 0 {
		return p.Statements[0].TokenLiteral()
	} else {
		return ""
	}
}

type LetStatement struct {
	Token token.Token
	Name  *Identifier
	Value Expression
}

func (ls *LetStatement) statementNode()       {}
func (ls *LetStatement) TokenLiteral() string { return ls.Token.Literal }

type Identifier struct {
	Token token.Token
	Value string
}

func (i *Identifier) expressionNode()      {}
func (i *Identifier) TokenLiteral() string { return i.Token.Literal }
