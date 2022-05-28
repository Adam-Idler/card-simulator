import React from "react";
import { GameButton, GameMessage } from "../../../components/gameUI";

export function BeginMessage({ setPlayerOne, setPlayerTwo, setIsBegin, setMessage }) {
  return (
    <>
      <GameMessage style={{ marginBottom: '20px' }}>Имя первого игрока</GameMessage>
      <input
        type="text"
        style={{
          width: '400px',
          height: '50px',
          backgroundColor: 'transparent',
          border: '3px solid #fff',
          outline: 'none',
          borderRadius: '8px',
          fontSize: '24px',
          color: '#fff',
          marginBottom: '20px'
        }}
        onChange={(e) => setPlayerOne(prev => ({ ...prev, name: e.target.value }))}
      />
      <GameMessage style={{ marginBottom: '20px' }}>Имя второго игрока</GameMessage>
      <input
        type="text"
        style={{
          width: '400px',
          height: '50px',
          backgroundColor: 'transparent',
          border: '3px solid #fff',
          outline: 'none',
          borderRadius: '8px',
          fontSize: '24px',
          color: '#fff'
        }}
        onChange={(e) => setPlayerTwo(prev => ({ ...prev, name: e.target.value }))}
      />
      <GameButton
        style={{ marginTop: '20px' }}
        onClick={
          () => {
            setIsBegin(false);
            setMessage("");
          }
        }
      >Начать</GameButton>
    </>
  );
}