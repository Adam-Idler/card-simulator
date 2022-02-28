import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { PlaySide } from "../../components/PlaySide";
import { Container } from "../../components/Container";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";
import { getCard } from "../../common/getCard";
import { shuffle } from "../../common/shuffle";
import { GameButton, GameMessage, GameText } from "../../components/gameUI";

export function BlackJack() {
  const defaultDeck = [...classicDeckData];
  const [deck, setDeck] = useState(defaultDeck);

  const [user, setUser] = useState({cards: [], score: 0});
  const [enemy, setEnemy] = useState({cards: [], score: 0});
  const [isEndTurn, setIsEndTurn] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => shuffle(deck), []);
  useEffect(() => setEnemy(prev => ({...prev, score: enemy.cards.reduce((acc, { value }) => acc + value, 0)})), [enemy.cards]);
  useEffect(() => setUser(prev => ({...prev, score: user.cards.reduce((acc, { value }) => acc + value, 0)})), [user.cards]);
  useEffect(() => {
    if (!user.cards.length) 
      setMessage(<GameMessage>Возьмите карту!</GameMessage>);
    else 
      setMessage("");
  }, [user.cards]);
  
  useEffect(() => {
    if (!isEndTurn) {
      setMessage("");
      return;
    }
    
    let gameMessage = "";
    let messageClassName = "loss";
    let enemyCardValues = 0;
    
    while (enemyCardValues < 17) {
      let currentCard = getCard(setEnemy, deck, 1);
      enemyCardValues += currentCard.reduce((accumulator, { value }) => accumulator + value, 0);
    }

    if (enemyCardValues > user.score && enemyCardValues <= 21 || user.score > 21) {
      gameMessage = `Вы проиграли!`;
    } else if (user.score > enemyCardValues || enemyCardValues > 21) {
      gameMessage = `Вы выиграли!`;
      messageClassName = "win";
    } else {
      gameMessage = `Ничья!`;
    }

    setMessage(<GameMessage className={messageClassName}>{gameMessage}</GameMessage>)
  }, [isEndTurn]);

  return (
    <GameWrapper className="black-jack">
      <PlaySide className="left">
        <Deck deck={deck} Card={ClassicCard} />
      </PlaySide>

      <PlaySide className="middle">
        <Container>
          {enemy.cards.map((card, index) =>
            <ClassicCard
              key={index}
              cardData={card}
              style={{ marginRight: `calc(9px - ${enemy.cards.length * 8}px)` }}
            />
          )}
        </Container>

        <Container className="bottom">
          {user.cards.map((card, index) =>
            <ClassicCard
              key={index}
              cardData={card}
              style={{ marginRight: `calc(9px - ${user.cards.length * 8}px)` }}
            />
          )}
        </Container>
      </PlaySide>

      <PlaySide className="right">
        <GameText>{`Счет противника: ${enemy.score}`}</GameText>
        
        <GameButton
          onClick={() => getCard(setUser, deck, 1)}
          disabled={!deck.length || isEndTurn || user.score > 21}
          style={{ marginBottom: "10px" }}
        >
          Взять карту
        </GameButton>

        <GameButton
          onClick={() => setIsEndTurn(true)}
          disabled={isEndTurn}
          style={{ marginBottom: "10px" }}

        >
          Завершить ход
        </GameButton>
        <GameButton
          onClick={() => {
            setEnemy({cards: []});
            setUser({cards: []});
            setIsEndTurn(false);
            shuffle(defaultDeck);
            setDeck([...defaultDeck]);
          }}
          disabled={!isEndTurn}
        >
          Перезапустить
        </GameButton>

        <GameText>{`Ваш счет: ${user.score}`}</GameText>
      </PlaySide>

      {message}

    </GameWrapper>
  );
};
