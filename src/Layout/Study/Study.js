import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCardFlip from "./StudyCardFlip";
import { FiPlusSquare } from "react-icons/fi";
import { HiHome } from "react-icons/hi";

function Study() {
    const { deckId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState(0);
    

    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setCards([...deck.cards]);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

    const [side, setSide] = useState(true);
    const totalCards = cards.length
    
    const flipHandler = () => {
        if (side === true){
            setSide(false)
        } else {setSide(true)}
    }

    const nextHandler = () => {
        if (card + 1 === cards.length) {
            if (window.confirm("Restart Cards? Click 'cancel' to return to the home page")) {
                setCard(0);
            } else {
                history.push('/');
            }
        } else {setCard(card + 1)} 
        setSide(true);
    }


    if (deck.id) {
        if (totalCards < 3) {
            return (
                <>
                    <div className="d-flex bg-light rounded p-3">
                        <p className="text-primary m-0 mr-2"><HiHome /></p>
                        <a href="/" className="text-primary m-0">Home</a>
                        <p className="text-secondary m-0 ml-2 mr-2">/</p>
                        <a href={`/decks/${deck.id}`} className="text-primary m-0">{deck.name}</a>
                        <p className="text-secondary m-0 ml-2">/  Study</p>
                    </div>
                    <div>
                        <h2 className="mb-3 mt-3">Study: {deck.name}</h2>
                        <h3>Not enough cards.</h3>
                        <p>You need at least 3 cards to study; there are {totalCards} cards in this deck.</p>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="m-1 btn btn-primary"><FiPlusSquare /> Add Cards</button></Link>
                    </div>
                </>
            )
        }
        return (
            <div>
                <div className="d-flex bg-light rounded p-3">
                    <p className="text-primary m-0 mr-2"><HiHome /></p>
                    <a href="/" className="text-primary m-0">Home</a>
                    <p className="text-secondary m-0 ml-2 mr-2">/</p>
                    <a href={`/decks/${deck.id}`} className="text-primary m-0">{deck.name}</a>
                    <p className="text-secondary m-0 ml-2">/  Study</p>
                </div>
                <h2 className="mb-3 mt-3">Study: {deck.name}</h2>
                <div className="border rounded p-3">
                    <h3>Card {card + 1} of {totalCards}</h3>
                    <StudyCardFlip cards={cards} card={card} side={side} flipHandler={flipHandler} nextHandler={nextHandler}/>
                </div>
            </div>
        )
    }
    return (<p>Loading Deck...</p>)
}

export default Study;
