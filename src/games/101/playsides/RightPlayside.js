import React from "react";
import { PlaySide } from "../../../components/PlaySide";
import { GameButton, GameText } from "../../../components/gameUI";
import { getCard } from "../../../common";

export function RightPlayside({
  deck,
  playerOne,
  playerTwo,
  disabled,
  isEndTurn,
  isRoundOver,
  endTurnRef,
  setPlayerOne,
  setPlayerTwo,
  setIsEndTurn,
  setIsGetCard,
  getBtnRef
}) {
  return (
    <PlaySide className="right">
      <GameText GameText>{playerTwo.name}: {playerTwo.score}</GameText>

      <GameButton
        onClick={() => {
          getCard(setPlayerOne, deck, 1);
          setIsGetCard(true);
        }}
        ref={getBtnRef}
        disabled={disabled || isEndTurn || isRoundOver}
        style={{ marginBottom: "10px" }}
      >
        Взять карту
      </GameButton>

      <GameButton
        onClick={() => {
          let temp = { ...playerOne };
          setPlayerOne(playerTwo);
          setPlayerTwo(temp);

          setIsGetCard(false);
          setIsEndTurn(false);
        }}
        ref={endTurnRef}
        disabled={!isEndTurn || isRoundOver}
        style={{ transition: 'box-shadow .2s', boxShadow: `${isEndTurn ? '0px 0px 10px 5px #15ac13' : ''}` }}
      >
        Завершить ход
      </GameButton>

      <GameText>{playerOne.name}: {playerOne.score}</GameText>
    </PlaySide>
  );
}