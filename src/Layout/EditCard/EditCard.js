import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";
import { IoMdHome } from "react-icons/io";

/* The user can modify information on for and existing card using the EditCard functionality. The path to the EditCard Screen includes the deckId and the cardId */
function EditCard() {
    const { deckId, cardId } = useParams();

    /* Load the deck that contains the selected card selected for editing */
    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

    /* Load the card that is selected to be edited */
    useEffect(() => {
        async function loadCard() {
            const card = await readCard(cardId);
            setCard({...card});
     /* Pre-fill form with the existing card information. */
            setFormData({
                deckId: parseFloat(deckId),
                id: `${cardId}`,
                front: `${card.front}`,
                back: `${card.back}`
            })
        }
        loadCard();
    }, [deckId, cardId]);
   
    const initialFormState = {
        deckId: parseFloat(deckId),
        id: `${cardId}`,
    }
    const [formData, setFormData] = useState({});
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/"> <IoMdHome /> Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deck.id}`} >{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            {/* Selected card can be edited and updated.
            Call CardForm */}
            <h2 className="mb-3 mt-3">Edit Card</h2>
            <CardForm deckId={deckId} cardId={cardId} card={card} initialFormState={initialFormState} formData={formData} setFormData={setFormData}/>
        </div>
    );
}

export default EditCard;