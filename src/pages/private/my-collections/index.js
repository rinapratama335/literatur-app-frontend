import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Link } from "react-router-dom";
import { BlockLoading } from "react-loadingg";
import { API } from "../../../apiConfig/api";
import { UserContext } from "../../../context/UserContext";
import "./index.css";
import { Alert, Col, Container, Row } from "reactstrap";

const MyCollections = () => {
  const [alert, setAlert] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const offAllert = () => {
    setAlert(false);
  };

  const cover_url = "http://localhost:5000/cover/";

  const {
    isLoading,
    error,
    data: collectionsData,
    refetch,
  } = useQuery("getMyCollections", () => API.get("/mycollections"));

  const [handleDelete] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await API.delete(`/mycollection/${state.user.id}/${id}`);
      setAlert(true);
      refetch();
    } catch (err) {
      console.log(err);
    }
  });

  // console.log(
  //   "Data collections : ",
  //   collectionsData.data.data.mycollections.literatures
  // );

  return (
    <Container>
      {alert && (
        <Alert color="primary" isOpen={alert} toggle={offAllert}>
          Data has been successfully deleted
        </Alert>
      )}
      <Row>
        {isLoading ? (
          <BlockLoading />
        ) : error ? (
          <h3>Error.....</h3>
        ) : (
          collectionsData.data.data.mycollections.literatures.map((item) => {
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
