import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  Row,
} from "reactstrap";
import { API } from "../../../apiConfig/api";
import "./index.css";

const AddLiterature = () => {
  let history = useHistory();

  const [state, dispatch] = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [publication, setPublication] = useState("");
  const [pages, setPages] = useState(1);
  const [ISBN, setISBN] = useState();
  const [cover, setCover] = useState();
  const [file, setFile] = useState();
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("publication", publication);
    data.append("pages", pages);
    data.append("ISBN", ISBN);
    data.append("cover", cover);
    data.append("file", file);

    API.post("/add-literature", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setAlert(true);
  };

  const offAllert = () => {
    setAlert(false);
  };

  return (
    <div className="add-wrapper">
      <Container>
        <Card body={true} style={{ backgroundColor: "#000" }}>
          <CardBody>
            {alert && (
              <Alert color="primary" isOpen={alert} toggle={offAllert}>
                Data has been successfully add
              </Alert>
            )}
            <Row>
              <Col>
                <h3 className="add-title">Add Literature</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <FormGroup className="form-group">
                    <Input
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Title"
                      onChange={(e) => {
                        const { value } = e.target;
                        setTitle(value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Input
                      type="number"
                      name="publication"
                      value={publication}
                      placeholder="Publication year"
                      onChange={(e) => {
                        const { value } = e.target;
                        setPublication(value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Input
                      type="number"
                      name="pages"
                      value={pages}
                      placeholder="Pages"
                      onChange={(e) => {
                        const { value } = e.target;
                        setPages(value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup className="form-group">
                    <Input
                      type="number"
                      name="ISBN"
                      value={ISBN}
                      placeholder="ISBN"
                      onChange={(e) => {
                        const { value } = e.target;
                        setISBN(value);
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="file"
                      name="cover"
                      onChange={(e) => {
                        const cover = e.target.files[0];
                        setCover(cover);
                      }}
                    />
                    <FormText color="light">Upload Cover</FormText>
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="file"
                      name="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setFile(file);
                      }}
                    />
                    <FormText color="light">Upload File</FormText>
                  </FormGroup>
                  <button className="btn-add-literature">Add Literature</button>
                </Form>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default AddLiterature;
