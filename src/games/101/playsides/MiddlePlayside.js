import React from "react";
import { PlaySide } from "../../../components/PlaySide";
import { Container } from "../../../components/Container";
import { GameMessage } from "../../../components/gameUI";
import { ClassicCard } from "../../../cardsTypes/classicCard/ClassicCard";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getCard } from "../../../common";
import { randomInteger } from "../../../helpers";

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

export function MiddlePlayside({
    deck,
    playerOne,
    playerTwo,
    isRoundOver,
    gameBoard,
    isEndTurn,
    setPlayerOne,
    setPlayerTwo,
    setIsEndTurn,
    setIsQuin,
    setMessage,
    setGameBoard
  }) {
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
        playerOne.cards,
        source.index,
        destination.index
      );

      setPlayerOne(prev => ({ ...prev, cards: items }));
    } else {
      const result = move(
        playerOne.cards,
        gameBoard.cards,
        source,
        destination
      );

      if (!result) return;

      setIsEndTurn(true);

      const { name: lastCardName, suit: lastCardSuit } = result.gameBoard[0];

      const cardsAction = {
        '6': () => {
          setIsEndTurn(false);
          getCard(setPlayerTwo, deck, 1);
        },
        '7': () => {
          setIsEndTurn(false);
          if (lastCardSuit === 'spades') {
            getCard(setPlayerTwo, deck, 4);
          } else {
            getCard(setPlayerTwo, deck, 2);
          }
        },
        'K': () => {
          if (lastCardSuit === 'spades') {
            getCard(setPlayerTwo, deck, 4);
          }
        },
        'A': () => {
          setIsEndTurn(false);
        },
        '9': () => {
          setIsEndTurn(false);
        },
        'Q': () => {
          setIsQuin(true);

          function quinClickHandler(suit) {
            setIsQuin(false);
            result.gameBoard[0].suit = suit;
          }

          setMessage(
            <>
              <GameMessage style={{ marginBottom: '20px' }}>Выбери масть</GameMessage>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <ClassicCard
                  cardData={{ suit: 'heart' }}
                  style={{ padding: '12px' }}
                  className="choose-card"
                  onClick={() => quinClickHandler('heart')}
                />
                <ClassicCard
                  cardData={{ suit: 'tambourine' }}
                  style={{ padding: '12px' }}
                  className="choose-card"
                  onClick={() => quinClickHandler('tambourine')}
                />
                <ClassicCard
                  cardData={{ suit: 'cross' }}
                  style={{ padding: '12px' }}
                  className="choose-card"
                  onClick={() => quinClickHandler('cross')}
                />
                <ClassicCard
                  cardData={{ suit: 'spades' }}
                  style={{ padding: '12px' }}
                  className="choose-card"
                  onClick={() => quinClickHandler('spades')}
                />
              </div>
            </>
          )
        }
      }

      try {
        cardsAction[lastCardName]();
      } catch (e) { }

      result.gameBoard[0].rotateValue = randomInteger(-5, 5);

      setPlayerOne(prev => ({ ...prev, cards: result.playerOne }));
      setGameBoard(prev => ({ ...prev, cards: result.gameBoard }));
    }
  }

  return (
    <PlaySide className="middle">
      <Container className="top">
        {playerTwo.cards?.map((card, index) =>
          <ClassicCard
            key={index}
            cardData={card}
            backSide={!isRoundOver}
            style={{ marginRight: `calc(9px - ${playerTwo.cards.length * 8}px)`, marginTop: '-70px', zIndex: `${1000 - index}` }}
          />
        )}
      </Container>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="gameBoard">
          {(provided) =>
            <Container className="middle" {...provided.droppableProps} ref={provided.innerRef} style={{ position: 'relative' }}>
              {gameBoard.cards?.reverse().map((card, index) =>
                <ClassicCard
                  key={`game-board-card-${index}`}
                  cardData={card}
                  style={{ position: 'absolute', zIndex: `${1000 - index}`, transform: `rotate(${index && card?.rotateValue}deg)` }}
                />
              )}
              {provided.placeholder}
            </Container>
          }
        </Droppable>
        <Droppable droppableId="playerOne" direction="horizontal">
          {(provided) =>
            <Container className="bottom" {...provided.droppableProps} ref={provided.innerRef}>
              {playerOne.cards?.map((card, index) =>
                <Draggable key={`card-${index}`} draggableId={`card-${index}`} index={index}>
                  {(provided) =>
                    <ClassicCard
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      cardData={card}
                      className={
                        `user-card 
                          ${(card.value === gameBoard.cards[0].value ||
                          card.suit === gameBoard.cards[0].suit ||
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
  );
}