import React from "react";
import ViewCards from "./ViewCards";

function MapCards({ cards, cardDeleteHandler, deckId }) {
  return cards.map((card, index) => {
    return (
      <ViewCards
        index={index}
        card={card}
        cardDeleteHandler={() => cardDeleteHandler(card.id)}
        deckId={deckId}
      />
    );
  });
}

export default MapCards;
