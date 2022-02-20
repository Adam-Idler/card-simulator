import styled from "styled-components";
import { useEffect, useState } from "react";
import { ClassicCard } from "../../cardsTypes/classicCard/ClassicCard";
import { classicDeckData } from "../../cardsTypes/classicCard/classicDeckData";
import { Container } from "../../components/Container";
import { GameWrapper } from "../../components/GameWrapper";
import { Deck } from "../../components/Deck";
import { getCard } from "../../common/getCard";
import { shuffle } from "../../common/shuffle";

export function Game101() {
    const defaultDeck = [...classicDeckData];
    const [deck, setDeck] = useState(defaultDeck);
    const [userCards, setUserCards] = useState([]);
    const [enemyCards, setEnemyCards] = useState([]);

    useEffect(() => {shuffle(deck)}, []);
    useEffect(() => getCard(setUserCards, deck, 3), []);
    useEffect(() => getCard(setEnemyCards, deck, 4), []);

    return (
        <GameWrapper>
            <Container className="horizontal left">
                <Deck deck={deck} Card={ClassicCard} />
            </Container>

            <Container className="vertical top">
                {enemyCards.map((card, index) => 
                    <ClassicCard
                        key={index} 
                        cardData={card}
                        backSide
                        style={{marginRight: `calc(9px - ${enemyCards.length * 8}px)`, marginTop: '-70px'}} 
                    />
                )}
            </Container>

            <Container className="middle">
                
            </Container>

            <Container className="vertical bottom">
                {userCards.map((card, index) => 
                    <ClassicCard 
                        key={index} 
                        cardData={card} 
                        className="user-card" 
                        style={{marginRight: `calc(9px - ${userCards.length * 8}px)`}}
                    /> 
                )}
            </Container>

            <Container className="horizontal right">
                
            </Container>

        </GameWrapper>
    );
};