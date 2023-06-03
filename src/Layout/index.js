import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import HomePageSetup from "./Home/HomePageSetup";
import CreateDeck from "./CreateDeck/CreateDeck";
import EditDeck from "./EditDeck/EditDeck";
import Study from "./Study/Study";
import AddCard from "./AddCard/AddCard";
import EditCard from "./EditCard/EditCard";
import { Switch, Route } from "react-router-dom";
import ViewDeck from "./DeckView/ViewDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <HomePageSetup />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;