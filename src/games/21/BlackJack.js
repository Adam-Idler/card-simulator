import styled from "styled-components";
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { PlayerGround } from "../../components/PlayerGround";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";

const BlackJaskButton = styled.button`
    cursor: pointer;
    background: transparent;
    outline: none;
    min-width: 200px;
    font-size: 22px;
    color: #eee;
    border: 2px solid #eee;
    border-radius: 8px;
    padding: 5px 20px;
    position: absolute;
    top: ${props => props.top || "35%"};
    right: 20px;
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

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function BlackJack() {
    const [deck, setDeck] = useState(classicDeckData);
    const [userCards, setUserCards] = useState([]);
    const [enemyCards, setEnemyCards] = useState([]);
    const [endTurn, setEndTurn] = useState(false);

    const getCard = (cards, setCards, deck, setDeck, count) => {
        for (let i = 0; i < count; i++) {
            const randomNumber = getRandomNumber(0, deck.length - 1);
            const currentCard = deck[randomNumber];

            setCards(prevState => [...prevState, currentCard]);
            setDeck(prevState => prevState.filter((card, index) => index !== randomNumber));
        }

        return cards;
    };

    useEffect(() => getCard(userCards, setUserCards, deck, setDeck, 1), []);

    return (
        <GameWrapper>
            <Deck deck={deck} />

            <PlayerGround className="first">
                { userCards.map( (card, index) => <ClassicCard key={index} cardData={card} style={{marginRight: `calc(9px - ${userCards.length * 8}px)`}} /> ) }
            </PlayerGround>
            <PlayerGround className="second">
                { enemyCards.map( (card, index) => <ClassicCard key={index} cardData={card} style={{marginRight: `calc(9px - ${userCards.length * 8}px)`}} /> ) }
            </PlayerGround>

            <BlackJaskButton onClick={() => getCard(userCards, setUserCards, deck, setDeck, 1)} disabled={!deck.length || endTurn}>Взять карту</BlackJaskButton>
            <BlackJaskButton onClick={() => setEndTurn(true)} disabled={endTurn} top="42%">Завершить ход</BlackJaskButton>
        </GameWrapper>
    );
};
