import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardForm from "../EditCard/CardForm";
import { IoMdHome } from "react-icons/io";

/* Add functionality to allow users to add anew card to an existing deck 

The path to this screen includes the deckId*/
function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

/* Load the deck to which the card will be added. */
    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck});
        }
        loadDeck();
    }, [deckId]);

/* The sides of the new card are initially set to an empty string. */
    const initialFormState = {
        front: "",
        back: "",
    }
    const [formData, setFormData] = useState({...initialFormState});

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><IoMdHome /><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deck.id}`} >{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
                </nav>                
            <span className="d-flex">
                <h2 className="mb-3 mt-3 mr-2">{deck.name}: Add Card</h2>
            </span>

            {/* call the CardForm component form the EditCard folder */}
            <CardForm deckId={deckId} initialFormState={initialFormState} formData={formData} setFormData={setFormData}/>
        </div>
    )
}

export default AddCard;