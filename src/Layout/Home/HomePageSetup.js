import React from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import { useState, useEffect } from "react";
import DeckDesign from "./DeckDesign";
import { FiPlusSquare } from "react-icons/fi";

//
function HomePageSetup() {
    const [deck, setDeck] = useState([]);
    const history = useHistory();

    useEffect(() => {
        async function loadDecks() {
            const decks = await listDecks();
            setDeck([...decks]);
        }
        loadDecks();
    }, []);    

    const deleteHandler = (deckIdToDelete) => {
        if (window.confirm("Are you sure you want to delete this deck?")){
            deleteDeck(deckIdToDelete)
            .then(() => history.go(0));
        } else (history.go(0));
    }

    const deckSetup = deck.map((deck, index) => {
        return (
            <DeckDesign key={index} deck={deck} cards={deck.cards} deleteHandler={() => deleteHandler(deck.id)}/>
        );
    });

    if (deckSetup.length !== 0) 
    return (
        <div>
            <Link to="/decks/new"><button type="button" className="btn btn-secondary mt-0 ml-3"><FiPlusSquare /> Create Deck</button></Link>
            <span>{deckSetup}</span>
        </div>
    );
    return (
        <div>
            <Link to="/decks/new"><button type="button" className="btn btn-secondary ml-3"><FiPlusSquare /> Create Deck</button></Link>
            <p>There are no decks! nothing to study. . .</p>
        </div>
    )
}

export default HomePageSetup;