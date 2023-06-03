import React from "react";
import ViewCards from "./ViewCards";

/* use .map() to iterate over the cards array and create a new array of components
for each element in the cards array, the .map() is called with a callback function
The .map() method returns a new array of the ViewCards components
which is then rendered as the output */
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
