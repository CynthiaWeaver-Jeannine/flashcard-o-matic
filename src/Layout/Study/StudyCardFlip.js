import React from "react";

function StudyCardFlip({ cards, card, side, flipHandler, nextHandler }) {
    

    if (side === true) {
        return (
            <div>
                <p>{cards[card].front}</p>
                <button type="button" className="btn btn-secondary rounded" onClick={flipHandler}>Flip Card</button>
            </div>
        )
    } else {
        return (
            <div>
                <p>{cards[card].back}</p>
                <button type="button" className="btn btn-secondary rounded" onClick={flipHandler}>Flip Card</button>
                <button type="button" className="btn btn-primary rounded ml-2" onClick={nextHandler}>Next Card</button>
            </div>
        )
    }
}

export default StudyCardFlip;