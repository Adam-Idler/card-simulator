import styled from "styled-components";
import { PlaySide } from "../../components/PlaySide";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { Container } from "../../components/Container";
import { GameWrapper } from "../../components/GameWrapper";
import { GameButton, GameMessage, GameText } from "../../components/gameUI";
import { Deck } from "../../components/Deck";
import { getCard } from "../../common/getCard";
import { shuffle } from "../../common/shuffle";

const reorder = (list, startIndex, endIndex) => {
  const items = list;
  const [reorderedItems] = items.splice(startIndex, 1);
  items.splice(endIndex, 0, reorderedItems);

  return items;
};

function checkCardDrawing(card, lastPlayedCard) {
  if (card.value === lastPlayedCard.value || card.suit === lastPlayedCard.suit || card.name === 'Q') {
    return true;
  }
  return false;
};

function randomInteger(min, max) {
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

export function Game101() {
  const defaultDeck = [...classicDeckData];
  const [deck, setDeck] = useState(defaultDeck);
  const [userCards, setUserCards] = useState([]);
  const [enemyCards, setEnemyCards] = useState([]);
  const [gameBoardCards, setGameBoardCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isGetCard, setIsGetCard] = useState(false);
  const [isEndTurn, setIsEndTurn] = useState(false);

  useEffect(() => shuffle(deck), []);
  useEffect(() => getCard(setUserCards, deck, 5), []);
  useEffect(() => getCard(setEnemyCards, deck, 4), []);
  useEffect(() => getCard(setGameBoardCards, deck, 1), []);
  useEffect(() => {
    let result = userCards.every(card => 
      card.value !== gameBoardCards[0].value && 
      card.suit !== gameBoardCards[0].suit && 
      card.name !== 'Q'
    );

    setDisabled(!result);
    if (isGetCard && result) setIsEndTurn(true);
    if (gameBoardCards.length !== 1 && gameBoardCards[0]?.name === '9' && result) setDisabled(false);
  });

  function move(source, destination, droppableSource, droppableDestination) {
    if (isEndTurn) return;
  
    const sourceClone = [...source];
    const destClone = [...destination];
  
    if (!checkCardDrawing(sourceClone[droppableSource.index], destClone[0])) {
      return null;
    } 
  
    const [removedItem] = sourceClone.splice(droppableSource.index, 1);
    
    destClone.splice(droppableDestination.index, 0, removedItem);
    
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
  
    return result;
  };
  
  function handleOnDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        userCards,
        source.index,
        destination.index
      );

      setUserCards(items);
    } else {
      const result = move(
        userCards,
        gameBoardCards,
        source,
        destination
      );

      if (!result) return;

      setIsEndTurn(true);

      let lastCard = result.gameBoard[0];
      if (lastCard.name === '6') {
        setIsEndTurn(false);
        getCard(setEnemyCards, deck, 1);
      } else if (lastCard.name === '7') {
        setIsEndTurn(false);
        if (lastCard.suit === 'spades') {
          getCard(setEnemyCards, deck, 4);
        } else {
          getCard(setEnemyCards, deck, 2);
        }
      } else if (lastCard.name === 'K' && lastCard.suit === 'spades') {
        getCard(setEnemyCards, deck, 4);
      } else if (lastCard.name === 'A' || lastCard.name === '9') {
        setIsEndTurn(false);
      }

      result.gameBoard[0].rotateValue = randomInteger(-5, 5);

      setUserCards(result.userCards);
      setGameBoardCards(result.gameBoard);
    }
  }

  return (
    <GameWrapper>
      <PlaySide className="left">
        <Deck deck={deck} Card={ClassicCard} />
      </PlaySide>

      <PlaySide className="middle">
        <Container className="top">
          {enemyCards.map((card, index) =>
            <ClassicCard
              key={index}
              cardData={card}
              backSide
              style={{ marginRight: `calc(9px - ${enemyCards.length * 8}px)`, marginTop: '-70px' }}
            />
          )}
        </Container>

        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="gameBoard">
            {(provided) =>
              <Container className="middle" {...provided.droppableProps} ref={provided.innerRef} style={{position: 'relative'}}>
                {gameBoardCards.reverse().map((card, index) => 
                  <ClassicCard
                    key={`game-board-card-${index}`}
                    cardData={card}
                    style={{position: 'absolute', zIndex: `${1000-index}`, transform: `rotate(${card?.rotateValue}deg)`}}
                  />
                )}
                {provided.placeholder}
              </Container>
            }
          </Droppable>
          <Droppable droppableId="userCards" direction="horizontal">
            {(provided) =>
              <Container className="bottom" {...provided.droppableProps} ref={provided.innerRef}>
                {userCards.map((card, index) => 
                  <Draggable key={`card-${index}`} draggableId={`card-${index}`} index={index}>
                    {(provided) =>
                      <ClassicCard
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        cardData={card}
                        className={
                          `user-card 
                          ${(card.value === gameBoardCards[0].value || 
                            card.suit === gameBoardCards[0].suit ||
                            card.name === 'Q') && !isEndTurn
                              ? 'can-played' 
                              : 'cant-played'
                          }`
                        }
                      />
                    }
                  </Draggable>
                )}
                {provided.placeholder}
              </Container>
            }
          </Droppable>
        </DragDropContext>
      </PlaySide>

      <PlaySide className="right">
        <GameButton
          onClick={() => {
            getCard(setUserCards, deck, 1); 
            setIsGetCard(true);
          }}
          disabled={disabled || isEndTurn}
          style={{ marginBottom: "10px" }}
        >
          Взять карту
        </GameButton>

        <GameButton
          onClick={() => {
            let temp = [...userCards];
            setUserCards(enemyCards);
            setEnemyCards(temp);

            setIsGetCard(false);
            setIsEndTurn(false);
          }}
          disabled={!isEndTurn}
          style={{transition: 'box-shadow .2s', boxShadow: `${isEndTurn ? '0px 0px 10px 5px #15ac13' : ''}`}}
        >
          Завершить ход
        </GameButton>
      </PlaySide>
    </GameWrapper>
  );
};