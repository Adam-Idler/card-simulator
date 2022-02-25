import styled from "styled-components";
import { PlaySide } from "../../components/PlaySide";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { Container } from "../../components/Container";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";
import { getCard } from "../../common/getCard";
import { shuffle } from "../../common/shuffle";

const reorder = (list, startIndex, endIndex) => {
  const items = list;
  const [reorderedItems] = items.splice(startIndex, 1);
  items.splice(endIndex, 0, reorderedItems);

  return items;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = source;
  const destClone = destination;
  const [reorderedItems] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, reorderedItems);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
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

  useEffect(() => { shuffle(deck) }, []);
  useEffect(() => getCard(setUserCards, deck, 4), []);
  useEffect(() => getCard(setEnemyCards, deck, 3), []);
  useEffect(() => getCard(setGameBoardCards, deck, 1), []);

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
                        className="user-card"
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
    </GameWrapper>
  );
};