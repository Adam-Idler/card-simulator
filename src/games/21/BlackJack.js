import styled from "styled-components";
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { PlayerGround } from "../../components/PlayerGround";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";

const BlackJackButton = styled.button`
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

const BlackJackScore = styled.p`
    position: absolute;
    right: 20px;
    color: #eee;
    font-size: 22px;
`;

const BlackJackMessage = styled.h3`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 42px;
    text-align: center;
    color: #eee;

    &.win {
        color: #03d203;
    }

    &.loose {
        color: #e50b16;
    }
`;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function BlackJack() {
    const [deck, setDeck] = useState(classicDeckData);
    const [userCards, setUserCards] = useState([]);
    const [enemyCards, setEnemyCards] = useState([]);
    const [isEndTurn, setIsEndTurn] = useState(false);

    const [enemyScore, setEnemyScore] = useState(0);
    const [userScore, setUserScore] = useState(0);

    const [message, setMessage] = useState(null);

    const getCard = (cards, setCards, deck, setDeck, count) => {
        let currentCards = [];
        for (let i = 0; i < count; i++) {
            const randomNumber = getRandomNumber(0, deck.length - 1);
            const currentCard = deck[randomNumber];
            
            currentCards.push(currentCard);

            setCards(prevState => [...prevState, currentCard]);
            setDeck(prevState => prevState.filter((card, index) => index !== randomNumber));
        }

        return currentCards;
    };

    useEffect(() => getCard(userCards, setUserCards, deck, setDeck, 1), []);
    useEffect(() => setEnemyScore(enemyCards.reduce((acc, {value}) => acc + value, 0)), [enemyCards]);
    useEffect(() => setUserScore(userCards.reduce((acc, {value}) => acc + value, 0)), [userCards]);
    useEffect(() => {
        if (!isEndTurn) return;

        let gameMessage = "";
        let messageClassName = "loose";    
        let enemyCardValues = 0;

        while (enemyCardValues < 17) {
            let currentCard = getCard(enemyCards, setEnemyCards, deck, setDeck, 1);

            enemyCardValues += currentCard.reduce((accumulator, {value}) => accumulator + value, 0);
        }

        if (enemyCardValues > userScore && enemyCardValues <= 21 || userScore > 21) {
            gameMessage = `Вы проиграли!`;
        } else if (userScore > enemyCardValues || enemyCardValues > 21) {
            gameMessage = `Вы выиграли!`;
            messageClassName = "win";
        } else {
            gameMessage = `Ничья!`;
        }

        setMessage(<BlackJackMessage className={messageClassName}>{gameMessage}</BlackJackMessage>)
    }, [isEndTurn]);

    return (
        <GameWrapper>
            <Deck deck={deck} />

            <PlayerGround className="first">
                { userCards.map( (card, index) => <ClassicCard key={index} cardData={card} className="user-card" style={{marginRight: `calc(9px - ${userCards.length * 8}px)`}} /> ) }
            </PlayerGround>
            <PlayerGround className="second">
                { enemyCards.map( (card, index) => <ClassicCard key={index} cardData={card} style={{marginRight: `calc(9px - ${enemyCards.length * 8}px)`}} /> ) }
            </PlayerGround>

            {message}

            <BlackJackScore style={{top: "20%"}}>{`Счет противника: ${enemyScore}`}</BlackJackScore>
            <BlackJackButton onClick={() => getCard(userCards, setUserCards, deck, setDeck, 1)} disabled={!deck.length || isEndTurn || userScore > 21}>Взять карту</BlackJackButton>
            <BlackJackButton onClick={() => setIsEndTurn(true)} disabled={isEndTurn} top="42%">Завершить ход</BlackJackButton>
            <BlackJackScore style={{top: "51%"}}>{`Ваш счет: ${userScore}`}</BlackJackScore>
        </GameWrapper>
    );
};
