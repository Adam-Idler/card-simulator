import styled from "styled-components";
import { PlaySide } from "../../components/PlaySide";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { Container } from "../../components/Container";
import { GameWrapper } from "../../components/GameWrapper";
import { GameButton, GameMessage, GameText, GameModal } from "../../components/gameUI";
import { Deck } from "../../components/Deck";
import { getCard } from "../../common/getCard";
import { shuffle } from "../../common/shuffle";
import { declOfNum, randomInteger } from "../../helpers";

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

export function Game101() {
  const defaultDeck = [...classicDeckData];
  const [deck, setDeck] = useState(defaultDeck);
  
  const [disabled, setDisabled] = useState(false);
  const [isGetCard, setIsGetCard] = useState(false);
  const [isEndTurn, setIsEndTurn] = useState(false);
  const [isRoundOver, setIsRoundOver] = useState(false);
  
  const [gameBoard, setGameBoard] = useState({count: 0, cards: []});
  const [playerOne, setPlayerOne] = useState({name: 'Игрок 1', score: 0, cards: []});
  const [playerTwo, setPlayerTwo] = useState({name: 'Игрок 2', score: 0, cards: []});
  const [winner, setWinner] = useState({});
  const [loser, setLoser] = useState({});

  const [message, setMessage] = useState("");

  useEffect(() => {
    shuffle(deck);
    getCard(setPlayerOne, deck, 5);
    getCard(setPlayerTwo, deck, 4);
    getCard(setGameBoard, deck, 1);

  }, []);

  useEffect(() => {
    let result = playerOne.cards.every(card =>
      card.value !== gameBoard.cards[0].value &&
      card.suit !== gameBoard.cards[0].suit &&
      card.name !== 'Q'
    );

    setDisabled(!result);
    if (isGetCard && result) setIsEndTurn(true);
    if (gameBoard.cards && gameBoard.cards.length !== 1 && gameBoard.cards[0]?.name === '9' && result) {setIsEndTurn(false);setDisabled(false); setIsGetCard(false)} 
  }, [playerOne.cards]);

  useEffect(() => {
    if (!deck.length) {
      shuffle(defaultDeck);
      setGameBoard({count: 0, cards: []});
      getCard(setGameBoard, defaultDeck, 1);
      setDeck([...defaultDeck]);
    }
  }, [deck.length])

  useEffect(() => {
    if (playerOne.score === 101 || playerTwo.score === 101) {
      setIsRoundOver(true);
      
      playerOne.score === 101 && setPlayerOne(prev => ({...prev, score: 0}))
      playerTwo.score === 101 && setPlayerTwo(prev => ({...prev, score: 0}))
    } else if (playerOne.score > 101 || playerTwo.score > 101) {
      setMessage("");
      setIsRoundOver(true);

      if (playerOne.score > 101) {
        setWinner({...playerTwo, method: 'game'});
        setLoser(playerOne);
      } else {
        setWinner({...playerOne, method: 'game'});
        setLoser(playerTwo);
      }
    }
  }, [playerOne.score, playerTwo.score])

  useEffect(() => {
    setIsRoundOver(false);

    if (!playerOne.cards.length || !playerTwo.cards.length) {
      setIsRoundOver(true);

      const loser = !playerOne.cards.length ? [...playerTwo.cards] : [...playerOne.cards]; 
      const lossPoints = loser.reduce((accumulator, { value }) => value !== 9 ? accumulator + value : accumulator + 0, 0);

      !playerOne.cards.length
        ? setPlayerTwo(prev => ({...prev, score: prev.score + lossPoints}))
        : setPlayerOne(prev => ({...prev, score: prev.score + lossPoints}))

      if (!playerOne.cards.length) {
        setWinner({...playerOne, method: 'round'});
        setLoser(playerTwo);
      } else {
        setWinner({...playerTwo, method: 'round'});
        setLoser(playerOne);
      }
    }
  }, [playerOne.cards.length, playerTwo.cards.length])

  useEffect(() => {
    if (winner.method === 'round') {
      const loser = !playerOne.cards.length ? [...playerTwo.cards] : [...playerOne.cards]; 
      const lossPoints = loser.reduce((accumulator, { value }) => value !== 9 ? accumulator + value : accumulator + 0, 0);

      setMessage(
        <>
          <GameMessage style={{ position: 'static', transform: 'none' }}>
            <span style={{ color: '#15ac13' }}>{winner.name}</span> победил.
            <br />
            <span style={{ color: '#863232' }}>{loser.name}</span> получает <i>{declOfNum(lossPoints, ['очко', 'очка', 'очков'])}</i>.
          </GameMessage>
          <GameButton
            onClick={() => {
              setIsRoundOver(false);
              setDisabled(false);
              setIsGetCard(false);
              setIsEndTurn(false);
              shuffle(defaultDeck);

              setGameBoard({count: 0, cards: []});
              setPlayerOne(prev => ({...prev, cards: []}));
              setPlayerTwo(prev => ({...prev, cards: []}));

              setWinner({});
              setLoser({});

              getCard(setPlayerOne, defaultDeck, 5);
              getCard(setPlayerTwo, defaultDeck, 4);
              getCard(setGameBoard, defaultDeck, 1);

              setDeck([...defaultDeck]);
            }}
            style={{ marginTop: '30px', maxWidth: '350px', fontSize: '28px', padding: '8px 15px' }}
          >
            Перезапустить
          </GameButton>
        </>
      )
    }
    if (winner.method === 'game') {
      setMessage("");
      setIsRoundOver(true);

      setMessage(
        <>
          <GameMessage style={{ position: 'static', transform: 'none' }}>
            <span style={{ color: '#15ac13' }}>{winner.name}</span> выиграл.
            <br />
            <span style={{ color: '#863232' }}>{loser.name}</span> проиграл, набрав {declOfNum(loser.score, ['очко', 'очка', 'очков'])} 
          </GameMessage>
          <GameButton
            onClick={() => {
              setIsRoundOver(false);
              setDisabled(false);
              setIsGetCard(false);
              setIsEndTurn(false);
              shuffle(defaultDeck);

              setGameBoard({count: 0, cards: []});
              setPlayerOne(prev => ({...prev, name: prev.name, score: 0, cards: []}));
              setPlayerTwo(prev => ({...prev, name: prev.name, score: 0, cards: []}));

              setWinner({});
              setLoser({});

              getCard(setPlayerOne, defaultDeck, 5);
              getCard(setPlayerTwo, defaultDeck, 4);
              getCard(setGameBoard, defaultDeck, 1);

              setDeck([...defaultDeck]);
            }}
            style={{ marginTop: '30px', maxWidth: '350px', fontSize: '28px', padding: '8px 15px' }}
          >
            Начать заново
          </GameButton>
        </>
      )
    }
  }, [winner]);

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

      setPlayerOne(prev => ({...prev, cards: items}));
    } else {
      const result = move(
        playerOne.cards,
        gameBoard.cards,
        source,
        destination
      );

      if (!result) return;

      setIsEndTurn(true);

      let lastCard = result.gameBoard[0];
      if (lastCard.name === '6') {
        setIsEndTurn(false);
        getCard(setPlayerTwo, deck, 1);
      } else if (lastCard.name === '7') {
        setIsEndTurn(false);
        if (lastCard.suit === 'spades') {
          getCard(setPlayerTwo, deck, 4);
        } else {
          getCard(setPlayerTwo, deck, 2);
        }
      } else if (lastCard.name === 'K' && lastCard.suit === 'spades') {
        getCard(setPlayerTwo, deck, 4);
      } else if (lastCard.name === 'A' || lastCard.name === '9') {
        setIsEndTurn(false);
      }

      result.gameBoard[0].rotateValue = randomInteger(-5, 5);

      setPlayerOne(prev => ({...prev, cards: result.playerOne}));
      setGameBoard(prev => ({...prev, cards: result.gameBoard}));
    }
  }

  return (
    <GameWrapper>
      <PlaySide className="left">
        <Deck deck={deck} Card={ClassicCard} />
      </PlaySide>

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

      <PlaySide className="right">
        <GameText GameText>{playerTwo.name}: {playerTwo.score}</GameText>

        <GameButton
          onClick={() => {
            getCard(setPlayerOne, deck, 1);
            setIsGetCard(true);
          }}
          disabled={disabled || isEndTurn || isRoundOver}
          style={{ marginBottom: "10px" }}
        >
          Взять карту
        </GameButton>

        <GameButton
          onClick={() => {
            let temp = {...playerOne};
            setPlayerOne(playerTwo);
            setPlayerTwo(temp);

            setIsGetCard(false);
            setIsEndTurn(false);
          }}
          disabled={!isEndTurn || isRoundOver}
          style={{ transition: 'box-shadow .2s', boxShadow: `${isEndTurn ? '0px 0px 10px 5px #15ac13' : ''}` }}
        >
          Завершить ход
        </GameButton>

        <GameText>{playerOne.name}: {playerOne.score}</GameText>
      </PlaySide>

      <GameModal style={{ display: `${isRoundOver ? 'flex' : 'none'}` }}>
        {message}
      </GameModal>
    </GameWrapper>
  );
};