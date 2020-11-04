import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BlockLoading } from "react-loadingg";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { API } from "../../../apiConfig/api";
import "./index.css";

const SearchLiterature = () => {
  const search = useLocation().search;
  const find = new URLSearchParams(search).get("title");

  const [query, setQuery] = useState(find);
  const [loading, setLoading] = useState(true);
  const [dataLiteratures, setDataLiteratures] = useState([]);
  const cover_url = "http://localhost:5000/cover/";

  const thisYear = new Date().getFullYear();

  console.log(thisYear);

  useEffect(() => {
    const listLiteratures = async (year) => {
      try {
        setLoading(true);
        const res = await API.get(
          "/search-literatures?title=" + find + "&year=" + year
        );
        setDataLiteratures(res.data.data.literatures);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    listLiteratures("");
  }, [query]);

  const listLiteratures = async (year) => {
    try {
      setLoading(true);
      const res = await API.get(
        "/search-literatures?title=" + find + "&year=" + year
      );
      setDataLiteratures(res.data.data.literatures);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    listLiteratures("");
  };

  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="search-wrapper">
            <Form
              style={{ display: "flex", flexDirection: "row" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <FormGroup>
                <Input
                  name="literature"
                  type="text"
                  value={query}
                  placeholder="Search for literature"
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ width: 400 }}
                />
              </FormGroup>
              <button type="submit" className="btn-search">
                <FaSearch />
              </button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            <div className="col-12 col-md-2">
              {/* <Form>
                <FormGroup>
                  <Input
                    type="select"
                    onChange={(e) => {
                      e.preventDefault();
                      listLiteratures(e.target.value);
                    }}
                  >
                    <option value="">All Time</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                  </Input>
                </FormGroup>
              </Form> */}
              <form style={{ marginBottom: 15 }}>
                <select
                  onChange={(e) => {
                    e.preventDefault();
                    listLiteratures(e.target.value);
                  }}
                  style={{
                    paddingRight: 10,
                    paddingLeft: 15,
                    paddingBottom: 5,
                    paddingTop: 5,
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <option value="">All Time</option>
                  <option value="2020">2020</option>
                  <option value="2019">2019</option>
                  <option value="2018">2018</option>
                </select>
              </form>
            </div>
          </Col>

          <Col md={10}>
            <Row>
              {loading || !dataLiteratures ? (
                <BlockLoading />
              ) : dataLiteratures.lenth < 1 ? (
                <h2 style={{ color: "white" }}>Data tidak ada</h2>
              ) : (
                dataLiteratures.map((item) => (
                  <Col md={3} key={item.id} style={{ marginBottom: 15 }}>
                    <Card
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: 400,
                      }}
                    >
                      <Link to={`/detail-literature/${item.id}`}>
                        <CardImg
                          src={`${cover_url}${item.cover}`}
                          className="cover-literatures"
                        />
                      </Link>
                      <CardBody>
                        <h1 className="title">{item.title}</h1>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <h6>{item.user?.fullName}</h6>
                          <h6 className="publication">{item.publication}</h6>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchLiterature;
