import React from "react";
import { Link } from "react-router-dom";
import { BsTrash, BsPencil } from "react-icons/bs";

/* card view setup to be imported by MapCards component and displayed on the ViewDeck screen with both the question and the answer, an edit button and a delete button */
function ViewCards({index, card, cardDeleteHandler, deckId}) {   
    if (index === 0) {
        return (
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-around">
                    <p className="m-3 flex-grow">{card.front}</p>
                    <p className="m-3 flex-grow">{card.back}</p>
                </div>
                <div className="d-flex justify-content-end">
                    <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                        <button type="button" className="mr-2 mb-3 btn btn-secondary"><BsPencil /> Edit</button>
                    </Link>
                    <button className="mr-3 mb-3 btn btn-danger" onClick={cardDeleteHandler}><BsTrash /></button>
                </div>
            </div>
        )
    }
    return (
        <div className="d-flex flex-column border-top">
            <div className="d-flex justify-content-around">
                <p className="m-3 flex-grow">{card.front}</p>
                <p className="m-3 flex-grow">{card.back}</p>
            </div>
            <div className="d-flex justify-content-end">
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                    <button type="button" className="mr-2 mb-3 btn btn-secondary"><BsPencil /> Edit</button>
                </Link>
                <button className="mr-3 mb-3 btn btn-danger" onClick={cardDeleteHandler}><BsTrash /></button>
            </div>
        </div>
    )
}

export default ViewCards;