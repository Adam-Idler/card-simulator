import React from "react";
import { classicDeckData } from "../../../cardsTypes/classicCard/classicDeckData";
import { shuffle, getCard } from "../../../common";
import { GameButton, GameMessage } from "../../../components/gameUI";
import { declOfNum } from "../../../helpers";

export function RoundWinMessage({
  winner,
  loser,
  setWinner,
  setLoser,
  setPlayerOne,
  setPlayerTwo,
  setGameBoard,
  setDeck,
  setIsGetCard,
  setIsEndTurn,
  setIsRoundOver,
  setDisabled,
  setIsQuin
}) {
  const defaultDeck = [...classicDeckData];
  const lossPoints = loser.cards.reduce((accumulator, { value }) => value !== 9 ? accumulator + value : accumulator + 0, 0);

  return (
    <>
      <GameMessage>
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
          setIsQuin(false);
          shuffle(defaultDeck);

          setGameBoard({ count: 0, cards: [] });
          setPlayerOne(prev => ({ ...prev, cards: [] }));
          setPlayerTwo(prev => ({ ...prev, cards: [] }));

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
  );
}