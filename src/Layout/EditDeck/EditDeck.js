import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import { IoMdHome } from "react-icons/io";

/* The EditDeck screen allows the user to modify information on an existing deck.
The path to this screen includes the deckId */
function EditDeck() {
    const history = useHistory();
    const { deckId } = useParams();

/* load existing deck */
    useEffect(() => {
        async function loadDeck() {
            const deck = await readDeck(deckId);
            setDeck({...deck})
            setFormData({
                id: `${deckId}`,
                name: `${deck.name}`,
                description: `${deck.description}`
            })
        }
        loadDeck();

    }, [deckId]);

    const [deck, setDeck] = useState({id: 0});
    const [formData, setFormData] = useState({})

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    /* cancel and submit return user to the deck screen */
    const cancelHandler = () => {
        history.go(-1);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        updateDeck(formData)
        .then(() => setFormData({
            id: `${deckId}`,
            name: `${deck.name}`,
            description: `${deck.description}`
        }))
        .then(() => history.go(-1));
    }

    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/"><IoMdHome /> Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deck.id}`} >{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">EditDeck</li>
                </ol>
                </nav>
            <h2 className="mb-3 mt-3">Edit Deck</h2>
            {/* form is pre-filled with existing deck information */}
            <form onSubmit={submitHandler}>
                <div className="mt-2">Name</div>
                <input name="name" type="text" id="name" onChange={changeHandler} value={formData.name}/>
                <div className="mt-2">Description</div>
                <textarea name="description" type="textarea" id="name" onChange={changeHandler} value={formData.description}/>
                <div>
                    <button type="button" className="btn btn-secondary mr-1" onClick={cancelHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                </div>
            </form>
        </>
    )
}

export default EditDeck;