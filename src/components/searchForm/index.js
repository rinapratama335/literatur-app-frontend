import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import "./index.css";

const SearchForm = () => {
  const [key, setKey] = useState();
  let history = useHistory();

  const submitKey = (e) => {
    e.preventDefault();

    history.push(`/search-literatures?title=${key}`);

    setKey("");
  };

  return (
    <div>
      <Row>
        <Col className="search-wrapper">
          <Form
            style={{ display: "flex", flexDirection: "row" }}
            onSubmit={(e) => submitKey(e)}
          >
            <FormGroup>
              <Input
                type="text"
                value={key}
                placeholder="Search for literature"
                onChange={(e) => setKey(e.target.value)}
                style={{ width: 400 }}
              />
            </FormGroup>
            <button type="submit" className="btn-search">
              <FaSearch />
            </button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SearchForm;
