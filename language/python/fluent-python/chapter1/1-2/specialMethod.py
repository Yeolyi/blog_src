import collections
from random import choice

Card = collections.namedtuple('Card', ['rank', 'suit'])


class FrenchDeck:
    ranks = [str(n) for n in range(2, 11)] + list('JQKA')
    suits = 'spafed diamonds clubs hearts'.split()

    def __init__(self):
        self._cards = [Card(rank, suit)
                       for rank in self.ranks for suit in self.suits]

    def __len__(self):
        return len(self._cards)

    def __getitem__(self, position):
        return self._cards[position]


beer_card = Card('7', 'diamonds')
print(beer_card)
# Card(rank='7', suit='diamonds')
# namedTuple이라서 예쁘게 프린트된다.

deck = FrenchDeck()
print(len(deck))  # 52
print(deck[-1])  # Card(rank='A', suit='hearts')

choice(deck)

# 이외에도 slicing, sorting, containing 기능을 사용할 수 있다.
# Although FrenchDeck implicitly inherits from the object class, most of its functionality is not inherited, but comes from leveraging the data model and composition.
