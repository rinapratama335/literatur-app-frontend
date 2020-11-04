import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { BlockLoading } from "react-loadingg";
import { API } from "../../../apiConfig/api";
import { UserContext } from "../../../context/UserContext";
import "./index.css";
import { Alert, Col, Container, Row } from "reactstrap";

const MyCollections = () => {
  const [state, dispatch] = useContext(UserContext);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);

  const offAllert = () => {
    setAlert(false);
  };

  const cover_url = "http://localhost:5000/cover/";

  useEffect(() => {
    const myCollections = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/mycollections`);
        setCollections(res.data.data.mycollections.literatures);
        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    };

    myCollections();
  }, []);

  const handleDelete = async (id) => {
    console.log("Ini ID : ", id);
    console.log("Data UserID: ", state.user.id);
    try {
      await API.delete(`/mycollection/${state.user.id}/${id}`);

      setAlert(true);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("Isi Collection : ", collections);

  return (
    <Container>
      {alert && (
        <Alert color="primary" isOpen={alert} toggle={offAllert}>
          Data has been successfully deleted
        </Alert>
      )}
      <Row>
        {loading || !collections ? (
          <BlockLoading />
        ) : (
          collections.map((item) => {
            return (
              <Col md={4} key={item.id}>
                <Link to={`/detail-literature/${item.id}`}>
                  <img
                    src={`${cover_url}${item.cover}`}
                    alt="Cover"
                    className="cover-collection"
                  />
                </Link>
                <h1 className="my-collection-title">{item.title}</h1>
                <Row>
                  <Col md={12}>
                    <div className="meta">
                      <h6>{item.user?.fullName}</h6>
                      <h6>{item.publication}</h6>
                    </div>
                  </Col>
                </Row>
                <button className="btn" onClick={() => handleDelete(item.id)}>
                  Delete from collection
                </button>
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default MyCollections;
