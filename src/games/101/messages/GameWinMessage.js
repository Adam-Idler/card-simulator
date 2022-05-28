import React from "react";
import { GameButton, GameMessage } from "../../../components/gameUI";
import { classicDeckData } from "../../../cardsTypes/classicCard/classicDeckData";
import { shuffle, getCard } from "../../../common";
import { declOfNum } from "../../../helpers";

export function GameWinMessage({
  winner,
  loser,
  setWinner,
  setLoser,
  setDeck,
  setPlayerOne,
  setPlayerTwo,
  setIsRoundOver,
  setDisabled,
  setIsGetCard,
  setIsEndTurn,
  setGameBoard
}) {
  const defaultDeck = [...classicDeckData];

  return (
    <>
      <GameMessage>
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

          setGameBoard({ count: 0, cards: [] });
          setPlayerOne(prev => ({ ...prev, name: prev.name, score: 0, cards: [] }));
          setPlayerTwo(prev => ({ ...prev, name: prev.name, score: 0, cards: [] }));

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
  );
}