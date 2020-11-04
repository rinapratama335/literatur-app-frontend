import React, { useEffect, useState, useContext } from "react";
import { FaCloudDownloadAlt, FaBookmark } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Col, Container, Row, Alert } from "reactstrap";
import { API } from "../../../apiConfig/api";
import { UserContext } from "../../../context/UserContext";
import "./index.css";

const DetailLiterature = () => {
  const { id } = useParams();
  const [detailLiterature, setDetailLiterature] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(UserContext);
  const cover_url = "http://localhost:5000/cover/";
  const file_url = "http://localhost:5000/file/";

  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);

  const offAllert = () => {
    setAlert(false);
  };

  const offAllertError = () => {
    setAlertError(false);
  };

  useEffect(() => {
    const literatureDetail = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/literature/${id}`);
        setDetailLiterature(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);

        setLoading(false);
      }
    };

    literatureDetail();
  }, []);

  const onSubmitLiterature = async () => {
    try {
      setLoading(true);
      await API.post(`/mycollection/${id}`);
      setLoading(false);
      setAlert(true);
    } catch (err) {
      setAlertError(true);
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="gap-vertical">
      <Container fluid>
        {alert && (
          <Alert color="primary" isOpen={alert} toggle={offAllert}>
            Data has been successfully add to your collection
          </Alert>
        )}

        {alertError && (
          <Alert color="primary" isOpen={alertError} toggle={offAllertError}>
            This literature is already in your collection
          </Alert>
        )}
        <Row>
          <Col md={4}>
            <img
              src={`${cover_url}${detailLiterature.cover}`}
              alt="Detail image"
              className="detail-image"
            />
          </Col>
          <Col md={4}>
            <div className="gap-bottom">
              <h1 className="white">{detailLiterature.title}</h1>
              <h5 className="gray">{detailLiterature.user?.fullName}</h5>
            </div>
            <div className="gap-bottom">
              <h4 className="white">Publication date</h4>
              <h5 className="gray">{detailLiterature.publication}</h5>
            </div>
            <div className="gap-bottom">
              <h4 className="white">Pages</h4>
              <h5 className="gray">{detailLiterature.pages}</h5>
            </div>
            <div className="gap-bottom">
              <h4 className="orange">ISBN</h4>
              <h5 className="gray">{detailLiterature.pages}</h5>
            </div>
            <div>
              <a
                href={`${file_url}${detailLiterature.file}`}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <button
                  to={`${file_url}${detailLiterature.file}`}
                  className="btn-download"
                >
                  Download{" "}
                  <FaCloudDownloadAlt
                    style={{ marginRight: 10, marginLeft: 10, marginBottom: 4 }}
                  />
                </button>
              </a>
            </div>
          </Col>
          <Col md={4}>
            <div>
              <button
                onClick={() => onSubmitLiterature({ id })}
                className="btn-download"
              >
                Add My Collection{" "}
                <FaBookmark
                  style={{ marginRight: 10, marginLeft: 10, marginBottom: 4 }}
                />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailLiterature;
