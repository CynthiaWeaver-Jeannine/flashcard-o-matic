import React from "react";
import { updateCard, createCard } from "../../utils/api";
import { useHistory } from "react-router-dom"


function CardForm({deckId, cardId, card, initialFormState, formData, setFormData}) {
    const history = useHistory();
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }

    /* Clicking cancel returns the user to the deck screen and returns the form to its initial state. */
    const cancelHandler = () => {
        setFormData({...initialFormState});
        history.push(`/decks/${deckId}`);
    }

    /* Clicking submit returns the user to the deck screen and performs the condition */
    const submitHandler = (event) => {
        event.preventDefault();
        if (!cardId) {
            createCard(deckId, formData)
            .then(() => setFormData({...initialFormState}));
        } else {
            updateCard(formData)
            .then(() => setFormData({...initialFormState}))
            .then(() => history.push(`/decks/${deckId}`));
        }
    }
/* The conditional covers the case where there is not card id for the AddCard functionality and if there is an id, the existing card is edited. */
    if (!cardId) {
        return (
            <div>
                <form onSubmit={submitHandler}>
                    <div>Front</div>
                    <textarea name="front" type="textarea" id="front" placeholder="Front of card" onChange={changeHandler} value={formData.front}/>
                    <p>Back</p>
                    <textarea name="back" type="textarea" id="back" placeholder="Back of card" onChange={changeHandler} value={formData.back}/>
                    <button type="button" className="btn btn-secondary mr-1" onClick={cancelHandler}>Done</button>
                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                </form>
            </div>
        )
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>Front</div>
                <textarea name="front" type="textarea" id="front" placeholder={`${card.front}`} onChange={changeHandler} value={formData.front}/>
                <div>Back</div>
                <textarea name="back" type="textarea" id="back" placeholder={`${card.back}`} onChange={changeHandler} value={formData.back}/>               
                <div>
                    <button type="button" className="btn btn-secondary mr-1" onClick={cancelHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary m-1">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CardForm;