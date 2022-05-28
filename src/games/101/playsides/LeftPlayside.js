import React from "react";
import { ClassicCard } from "../../../cardsTypes/classicCard/ClassicCard";
import { PlaySide } from "../../../components/PlaySide";
import { Deck } from "../../../components/Deck";

export function LeftPlayside({ deck }) {
  return (
    <PlaySide className="left">
      <Deck deck={deck} Card={ClassicCard} />
    </PlaySide>
  );
}