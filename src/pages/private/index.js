import React from "react";
import { Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";
import Navbar from "../../components/navbar";
import AddLiterature from "./add-literature";
import AdminPage from "./admin-page/AdminPage";
import DetailLiterature from "./detail-literature";
import HomePage from "./home-page/HomePage";
import MyCollections from "./my-collections";
import ProfilePage from "./profile-page";
import SearchLiterature from "./search-literature-page";

const Private = () => {
  return (
    <div>
      <Container fluid>
        <Navbar />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/search-literatures" component={SearchLiterature} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/add-literature" component={AddLiterature} />
          <Route path="/detail-literature/:id" component={DetailLiterature} />
          <Route path="/my-collections" component={MyCollections} />
        </Switch>
      </Container>
    </div>
  );
};

export default Private;
