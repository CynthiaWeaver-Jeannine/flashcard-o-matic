import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai'; 
import { BsBookmarks, BsTrash } from 'react-icons/bs'

//create the design of the deck display
//use react icons and bootstrap 4
//DeckDesign() used in HomePageSetup
function DeckDesign({ deck, cards, deleteHandler }) {
  return (
    <div className="border rounded m-3 p-3">
      <div className="d-flex justify-content-between">
        <h2>{deck.name}</h2>
        <p className="text-secondary">{cards.length} cards</p>
      </div>
      <p className="deckName">{deck.description}</p>
      <div className="d-flex justify-content-between">
        <div>
          <Link to={`decks/${deck.id}`}>
            <button type="button" className="m-1 btn btn-secondary">
              <AiOutlineEye /> View
            </button>
          </Link>
          <Link to={`decks/${deck.id}/study`}>
            <button type="button" className="m-1 btn btn-primary">
              <BsBookmarks /> Study
            </button>
          </Link>
        </div>
        <button className="m-1 btn btn-danger" onClick={deleteHandler}>
          <BsTrash />
        </button>
      </div>
    </div>
  );
}

export default DeckDesign;
