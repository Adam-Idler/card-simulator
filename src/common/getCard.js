export const getCard = (setCards, deck, count) => {
  let currentCards = [];
  for (let i = 0; i < count; i++) {
    const currentCard = deck[deck.length - 1];

    currentCards.push(currentCard);

    setCards(prevState => ({...prevState, cards: [...prevState.cards ?? [], currentCard]}));
    deck.pop();
  }

  return currentCards;
};