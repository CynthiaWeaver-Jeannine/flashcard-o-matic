import MapCards from "./MapCards";
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";
import { BsBookmarks, BsTrash, BsPencil } from "react-icons/bs";
import {  FiPlusSquare } from "react-icons/fi";
import {  IoMdHome } from "react-icons/io";

/* the path to the deck includes the deckId
the screen includes the deck name and description
 */
function ViewDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

/* load the existing deck */
    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
            setCards([...deck.cards])
        }
        loadDeck();
    }, [deckId]);

    /* deck delete prompt and warning */
    const deleteHandler = () => {
        if (window.confirm("Are you sure you want to delete this deck? You will not be able to recover it.")){
            deleteDeck(deckId)
            .then(() => history.go(0));
        } else (history.go(0));
    }
    /* card delete prompt and warning */
    const cardDeleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this card? You will not be able to recover it.")){
            deleteCard(id)
            .then(() => history.go(0));
        } else (history.go(0));
    }

    return (
        <>                  
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><IoMdHome /><a href="/">Home</a></li>           
            <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
        </nav>     
        {/* display existing deck with edit, study, add, and delete options */}  
            <div>
                <h2 className="mb-3 mt-3">{deck.name}</h2>
                <p className="deckName">{deck.description}</p>
                <span className="d-flex justify-content-between">
                    <span>
                        <Link to={`/decks/${deck.id}/edit`}><button type="button" className="mr-1 btn btn-secondary"><BsPencil /> Edit</button></Link>
                        <Link to={`/decks/${deck.id}/study`}><button type="button" className="m-1 btn btn-primary"><BsBookmarks /> Study</button></Link>
                        <Link to={`/decks/${deck.id}/cards/new`}><button type="button" className="m-1 btn btn-primary"><FiPlusSquare /> Add Card</button></Link>
                    </span>
                    <button className="m-1 btn btn-danger" onClick={deleteHandler}><BsTrash /></button>
                </span>
            </div>
            {/* display existing cards with edit and delete options */}
            <div className="mt-3">
                <h2>Cards</h2>
                <div className="border rounded mb-3">
                    <MapCards cards={cards} cardDeleteHandler={cardDeleteHandler} deckId={deckId}/>
                </div>
            </div>
        
        </>
    )
}

export default ViewDeck;