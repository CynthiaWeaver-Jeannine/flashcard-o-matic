import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import { IoMdHome } from "react-icons/io";


/* build functionality for the create deck screen; display all of the information about a deck; path to create deck screen is /decks/new*/
function CreateDeck() {
    const history = useHistory();

    const initialFormState = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormState})

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        })
    }
    const submitHandler = (event) => {
        event.preventDefault();
        createDeck(formData)
        .then(() => setFormData({...initialFormState}))
        .then(() => history.push("/"));
        
    }
    const cancelHandler = () => {
        setFormData({...initialFormState});
        history.push("/")
    }
    
    return (
        <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><IoMdHome /><a href="/">Home</a></li>
                    
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
        
            <h2 className="mt-3 mb-3">Create Deck</h2>
            <form onSubmit={submitHandler}>
                <div className="mt-2">Deck Name</div>
                <input name="name" type="text" id="name" placeholder="Deck Name" onChange={changeHandler} value={formData.name}/>
                <div className="mt-2">Description</div>
                <textarea name="description" type="textarea" id="name" placeholder="Brief descritpion of the deck" onChange={changeHandler} value={formData.description}/>
                <div>
                    <button type="button" className="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
                    <button type="submit" className="btn btn-primary ml-2">Submit</button>
                </div>
            </form>
        </> 
    )
}

export default CreateDeck;