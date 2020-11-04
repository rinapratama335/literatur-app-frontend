import React from "react";
import { Card, CardImg, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "./index.css";

function MyLiteratures({ id, cover, title, publication, user, status }) {
  return (
    <div style={{ marginBottom: 15 }}>
      <Card>
        {status !== "approved" ? (
          <img src={cover} className="cover" />
        ) : (
          <Link to={`/detail-literature/${id}`}>
            <CardImg src={cover} className="cover" />
          </Link>
        )}

        <div className="desc-wrap">
          <h1 className="col-title">{title}</h1>
          <Row>
            <Col md={12}>
              <div className="desc">
                <h6>{user}</h6>
                <h6 className="publication">{publication}</h6>
              </div>
              <h6 className="status">
                Status : <strong>{status}</strong>
              </h6>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default MyLiteratures;
