import React from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import { useState, useEffect } from "react";
import DeckDesign from "./DeckDesign";
import { FiPlusSquare } from "react-icons/fi";

/* call DeckDesign() for deckSetup, create home page
allow for case where there are no decks
path to home screen is / */
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

/* delete deck prompt */
    const deleteHandler = (deckIdToDelete) => {
        if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")){
            deleteDeck(deckIdToDelete)
            .then(() => history.go(0));
        } else (history.go(0));
    }

    const deckSetup = deck.map((deck, index) => {
        return (
            <DeckDesign key={index} deck={deck} cards={deck.cards} deleteHandler={() => deleteHandler(deck.id)}/>
        );
    });
/* create deck button, clicking it brings the user to the create deck screen */
    if (deckSetup.length !== 0) 
    return (
        <div>
            <Link to="/decks/new"><button type="button" className="btn btn-secondary mt-0 ml-3"><FiPlusSquare /> Create Deck</button></Link>
            {/* show existing decks wit study, view, and delete button*/}
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