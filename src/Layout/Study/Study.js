import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCardFlip from "./StudyCardFlip";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";

/* build functionality for study page; path to study screen is displayed at /decks/:deckId/study*/
function Study() {
    const { deckId } = useParams();
    const history = useHistory();

    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState(0);
    
/* load the deck that is being studied */
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
/* restart prompt */
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
                <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><IoMdHome /><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deck.id}`} >{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
                </nav>
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
           <>
                <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><IoMdHome /><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deck.id}`} >{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
                </nav>
                <h2 className="mb-3 mt-3">Study: {deck.name}</h2>
                <div className="border rounded p-3">
                    <h3>Card {card + 1} of {totalCards}</h3>
                    <StudyCardFlip cards={cards} card={card} side={side} flipHandler={flipHandler} nextHandler={nextHandler}/>
                </div>
            </>
        )
    }
    return (<p>Loading Deck...</p>)
}

export default Study;
