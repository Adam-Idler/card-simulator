import styled from "styled-components";
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { PlaySide } from "../../components/PlaySide";
import { Container } from "../../components/Container";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";
import { getCard } from "../../common/getCard";
import { shuffle } from "../../common/shuffle";

const BlackJackButton = styled.button`
  cursor: pointer;
  background: transparent;
  outline: none;
  min-width: 180px;
  font-size: 18px;
  color: #eee;
  border: 2px solid #eee;
  border-radius: 8px;
  padding: 5px 0px;
  transition: opacity .2s, transform .1s;
  ${props =>
  props.disabled
    ? 'opacity: .6; cursor: not-allowed;'
    : ""
}

  &:hover {
      opacity: .7;
  }

  &:active {
      transform: scale(1.04);
  }
`;

const BlackJackScore = styled.p`
  display: flex;
  color: #eee;
  font-size: 18px;
`;

const BlackJackMessage = styled.h3`
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 42px;
  text-align: center;
  color: #eee;

  &.win {
      color: #03d203;
  }

  &.loose {
      color: #e50b16;
  }
`;

export function BlackJack() {
  const defaultDeck = [...classicDeckData];
  const [deck, setDeck] = useState(defaultDeck);
  const [userCards, setUserCards] = useState([]);
  const [enemyCards, setEnemyCards] = useState([]);
  const [isEndTurn, setIsEndTurn] = useState(false);

  const [enemyScore, setEnemyScore] = useState(0);
  const [userScore, setUserScore] = useState(0);

  const [message, setMessage] = useState(null);

  useEffect(() => { shuffle(deck) }, []);
  useEffect(() => getCard(setUserCards, deck, 1), []);
  useEffect(() => setEnemyScore(enemyCards.reduce((acc, { value }) => acc + value, 0)), [enemyCards]);
  useEffect(() => setUserScore(userCards.reduce((acc, { value }) => acc + value, 0)), [userCards]);
  useEffect(() => {
    if (!isEndTurn) {
      setMessage("");
      return;
    }

    let gameMessage = "";
    let messageClassName = "loose";
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

    setMessage(<BlackJackMessage className={messageClassName}>{gameMessage}</BlackJackMessage>)
  }, [isEndTurn]);

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
        <BlackJackScore>{`Счет противника: ${enemyScore}`}</BlackJackScore>
        
        <BlackJackButton
          onClick={() => getCard(setUserCards, deck, 1)}
          disabled={!deck.length || isEndTurn || userScore > 21}
          style={{ marginBottom: "10px" }}
        >
          Взять карту
        </BlackJackButton>

        <BlackJackButton
          onClick={() => setIsEndTurn(true)}
          disabled={isEndTurn}
          style={{ marginBottom: "10px" }}

        >
          Завершить ход
        </BlackJackButton>
        <BlackJackButton
          onClick={() => {
            setEnemyCards([]);
            setUserCards([]);
            setIsEndTurn(false);
            setDeck(defaultDeck)
          }}
          disabled={!isEndTurn}
        >
          Перезапустить
        </BlackJackButton>

        <BlackJackScore>{`Ваш счет: ${userScore}`}</BlackJackScore>
      </PlaySide>

      {message}

    </GameWrapper>
  );
};
