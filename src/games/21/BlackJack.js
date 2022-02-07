import styled from "styled-components";
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { PlayerGround } from "../../components/PlayerGround";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";

const GetCardButton = styled.button`
    cursor: pointer;
    background: transparent;
    outline: none;
    font-size: 22px;
    color: #eee;
    border: 2px solid #eee;
    border-radius: 8px;
    padding: 5px 20px;
    position: absolute;
    top: 45%;
    right: 20px;
    transition: opacity .2s, transform .1s;

    &:hover {
        opacity: .7;
    }

    &:active {
        transform: scale(1.04);
    }
`;

export function BlackJack() {
    const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const [deck, setDeck] = useState(classicDeckData);
    const [cards, setCards] = useState([]);

    const getCard = () => {
        const randomNumber = getRandomNumber(0, deck.length-1);
        const currentCard = deck[randomNumber];
    
        setDeck(deck.filter((card, index) => index !== randomNumber));
        setCards([...cards, currentCard]);

        return cards;
    };

    useEffect(getCard, []);

    return (
        <GameWrapper>
            <Deck deck={deck} />
            <PlayerGround className="first">
                { cards.map( (card, index) => <ClassicCard key={index} cardData={card} /> ) }
            </PlayerGround>
            <GetCardButton onClick={getCard} disabled={!deck.length}>Взять карту</GetCardButton>
        </GameWrapper>
    );
};
