import { useEffect, useRef, useState } from "react";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { GameWrapper } from "../../components/GameWrapper";
import { GameModal } from "../../components/gameUI";
import { shuffle, getCard, useEventListener } from "../../common";
import { LeftPlayside, MiddlePlayside, RightPlayside } from "./playsides";
import { BeginMessage, GameWinMessage, RoundWinMessage } from "./messages";

export function Game101() {
  const defaultDeck = [...classicDeckData];
  const [deck, setDeck] = useState(defaultDeck);

  const [disabled, setDisabled] = useState(false);
  const [isGetCard, setIsGetCard] = useState(false);
  const [isEndTurn, setIsEndTurn] = useState(false);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [isBegin, setIsBegin] = useState(true);
  const [isQuin, setIsQuin] = useState(false);

  const [gameBoard, setGameBoard] = useState({ count: 0, cards: [] });
  const [playerOne, setPlayerOne] = useState({ name: 'Игрок 1', score: 0, cards: [] });
  const [playerTwo, setPlayerTwo] = useState({ name: 'Игрок 2', score: 0, cards: [] });
  const [winner, setWinner] = useState({});
  const [loser, setLoser] = useState({});

  const [message, setMessage] = useState("");

  const getBtnRef = useRef(null);
  const endTurnRef = useRef(null);

  useEffect(() => {
    if (!isBegin) return;

    setMessage(
      <BeginMessage
        setPlayerOne={setPlayerOne}
        setPlayerTwo={setPlayerTwo}
        setIsBegin={setIsBegin}
        setMessage={setMessage}
      />
    );
  }, []);

  useEffect(() => {
    shuffle(deck);
    getCard(setPlayerOne, deck, 5);
    getCard(setPlayerTwo, deck, 4);
    getCard(setGameBoard, deck, 1);
  }, []);

  useEffect(() => {
    let result = playerOne.cards.every(({ name, value, suit }) =>
      value !== gameBoard.cards[0].value &&
      suit !== gameBoard.cards[0].suit &&
      name !== 'Q'
    );

    setDisabled(!result);
    if (isGetCard && result) setIsEndTurn(true);
    if (
      gameBoard.cards &&
      gameBoard.cards.length !== 1 &&
      gameBoard.cards[0]?.name === '9' &&
      result
    ) {
      setIsEndTurn(false);
      setDisabled(false);
      setIsGetCard(false)
    }
  }, [playerOne.cards]);

  useEffect(() => {
    if (!deck.length) {
      shuffle(defaultDeck);
      setGameBoard({ count: 0, cards: [] });
      getCard(setGameBoard, defaultDeck, 1);
      setDeck([...defaultDeck]);
    }
  }, [deck.length])

  useEffect(() => {
    if (playerOne.score === 101 || playerTwo.score === 101) {
      setIsRoundOver(true);

      playerOne.score === 101 && setPlayerOne(prev => ({ ...prev, score: 0 }))
      playerTwo.score === 101 && setPlayerTwo(prev => ({ ...prev, score: 0 }))
    } else if (playerOne.score > 101 || playerTwo.score > 101) {
      setMessage("");
      setIsRoundOver(true);

      if (playerOne.score > 101) {
        setWinner({ ...playerTwo, method: 'game' });
        setLoser(playerOne);
      } else {
        setWinner({ ...playerOne, method: 'game' });
        setLoser(playerTwo);
      }
    }
  }, [playerOne.score, playerTwo.score]);

  useEffect(() => {
    setIsRoundOver(false);

    if (!playerOne.cards.length && !isBegin) {
      setIsRoundOver(true);

      let score = 0;
      const lastCard = gameBoard.cards[0] ?? [];

      if (lastCard?.name === 'Q') {
        if (lastCard?.suit === 'spades') {
          score = 40;
        } else {
          score = 20;
        }
      }

      const loser = [...playerTwo.cards];
      const lossPoints = loser.reduce((accumulator, { value }) => value !== 9 ? accumulator + value : accumulator + 0, 0);

      setPlayerOne(prev => ({ ...prev, score: prev.score - score }));
      setPlayerTwo(prev => ({ ...prev, score: prev.score + lossPoints }));

      setWinner({ ...playerOne, method: 'round' });
      setLoser(playerTwo);
    }
  }, [playerOne.cards.length]);

  useEffect(() => {
    if (winner.method === 'round') {
      const loser = !playerOne.cards.length ? playerTwo : playerOne;

      setMessage(
        <RoundWinMessage
          winner={winner}
          loser={loser}

          setWinner={setWinner}
          setLoser={setLoser}
          setPlayerOne={setPlayerOne}
          setPlayerTwo={setPlayerTwo}
          setGameBoard={setGameBoard}
          setDeck={setDeck}
          setIsGetCard={setIsGetCard}
          setIsEndTurn={setIsEndTurn}
          setIsRoundOver={setIsRoundOver}
          setDisabled={setDisabled}
          setIsQuin={setIsQuin}
        />
      )
    }
    if (winner.method === 'game') {
      setMessage("");
      setIsRoundOver(true);

      setMessage(
        <GameWinMessage
          winner={winner}
          loser={loser}

          setWinner={setWinner}
          setLoser={setLoser}
          setDeck={setDeck}
          setPlayerOne={setPlayerOne}
          setPlayerTwo={setPlayerTwo}
          setIsRoundOver={setIsRoundOver}
          setDisabled={setDisabled}
          setIsGetCard={setIsGetCard}
          setIsEndTurn={setIsEndTurn}
          setGameBoard={setGameBoard}
        />
      )
    }
  }, [winner]);

  function keyDownHandler({ key }) {
    if (key === ' ') {
      if (!isEndTurn) {
        getBtnRef.current.click();
      } else {
        endTurnRef.current.click();
      }
    }
  }

  useEventListener('keydown', keyDownHandler);

  return (
    <GameWrapper>
      <LeftPlayside deck={deck} />

      <MiddlePlayside
        deck={deck}
        gameBoard={gameBoard}
        playerOne={playerOne}
        playerTwo={playerTwo}
        isRoundOver={isRoundOver}
        isEndTurn={isEndTurn}

        setPlayerOne={setPlayerOne}
        setPlayerTwo={setPlayerTwo}
        setIsEndTurn={setIsEndTurn}
        setIsQuin={setIsQuin}
        setMessage={setMessage}
        setGameBoard={setGameBoard}
      />

      <RightPlayside
        deck={deck}
        playerOne={playerOne}
        playerTwo={playerTwo}
        disabled={disabled}
        isEndTurn={isEndTurn}
        isRoundOver={isRoundOver}
        endTurnRef={endTurnRef}

        setPlayerOne={setPlayerOne}
        setPlayerTwo={setPlayerTwo}
        setIsEndTurn={setIsEndTurn}
        setIsGetCard={setIsGetCard}
        getBtnRef={getBtnRef}
      />

      <GameModal
        style={{
          display: `${isRoundOver || isBegin || isQuin ? 'flex' : 'none'}`,
          background: `${isBegin ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, .8)'}`
        }}
      >
        {message}
      </GameModal>
    </GameWrapper>
  );
};
