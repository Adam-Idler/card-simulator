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

  const [userCards, setUserCards] = useState([]);
  const [enemyCards, setEnemyCards] = useState([]);
  const [isEndTurn, setIsEndTurn] = useState(false);

  const [enemyScore, setEnemyScore] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const [message, setMessage] = useState(null);

  useEffect(() => shuffle(deck), []);
  useEffect(() => setEnemyScore(enemyCards.reduce((acc, { value }) => acc + value, 0)), [enemyCards]);
  useEffect(() => setUserScore(userCards.reduce((acc, { value }) => acc + value, 0)), [userCards]);
  useEffect(() => {
    if (!isEndTurn) {
      setMessage("");
      return;
    }
    
    let gameMessage = "";
    let messageClassName = "loss";
    let enemyCardValues = 0;
    
    while (enemyCardValues < 17) {
      let currentCard = getCard(setEnemyCards, deck, 1);
      enemyCardValues += currentCard.reduce((accumulator, { value }) => accumulator + value, 0);
    }

    if (enemyCardValues > userScore && enemyCardValues <= 21 || userScore > 21) {
      gameMessage = `Вы проиграли!`;
    } else if (userScore > enemyCardValues || enemyCardValues > 21) {
      gameMessage = `Вы выиграли!`;
      messageClassName = "win";
    } else {
      gameMessage = `Ничья!`;
    }

    setMessage(<GameMessage className={messageClassName}>{gameMessage}</GameMessage>)
  }, [isEndTurn]);
  useEffect(() => {
    if (!userCards.length) 
      setMessage(<GameMessage>Возьмите карту!</GameMessage>);
    else 
      setMessage("");
  }, [userCards]);

  return (
    <GameWrapper className="black-jack">
      <PlaySide className="left">
        <Deck deck={deck} Card={ClassicCard} />
      </PlaySide>

      <PlaySide className="middle">
        <Container>
          {enemyCards.map((card, index) =>
            <ClassicCard
              key={index}
              cardData={card}
              style={{ marginRight: `calc(9px - ${enemyCards.length * 8}px)` }}
            />
          )}
        </Container>

        <Container className="bottom">
          {userCards.map((card, index) =>
            <ClassicCard
              key={index}
              cardData={card}
              className="user-card"
              style={{ marginRight: `calc(9px - ${userCards.length * 8}px)` }}
            />
          )}
        </Container>
      </PlaySide>

      <PlaySide className="right">
        <GameText>{`Счет противника: ${enemyScore}`}</GameText>
        
        <GameButton
          onClick={() => getCard(setUserCards, deck, 1)}
          disabled={!deck.length || isEndTurn || userScore > 21}
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
            setEnemyCards([]);
            setUserCards([]);
            setIsEndTurn(false);
            setDeck(defaultDeck)
          }}
          disabled={!isEndTurn}
        >
          Перезапустить
        </GameButton>

        <GameText>{`Ваш счет: ${userScore}`}</GameText>
      </PlaySide>

      {message}

    </GameWrapper>
  );
};
