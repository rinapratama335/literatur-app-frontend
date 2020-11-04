import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { setAuthToken, API } from "../../../apiConfig/api";
import "../Modal.css";

const SignIn = ({ isOpen, toggle }) => {
  const [state, dispatch] = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: "irwantoadmin@yahoo.com",
    password: "irwantoadmin",
  });
  const { email, password } = formData;
  let history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await API.post("/login", body, config);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data.user,
      });

      console.log("Data respon user : ", res);

      setAuthToken(res.data.data.user.token);

      try {
        const res = await API.get("/auth");

        dispatch({
          type: "USER_LOADED",
          payload: res.data.data.user,
        });

        console.log("Role USER : ", res.data.data.user);

        history.push("/home");
      } catch (err) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_FAIL",
      });
    }
  };
  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        size="large"
        contentClassName="bg-black"
      >
        <ModalBody>
          <div className="modal-body">
            <h3 className="modal-title">Sign In</h3>
            <Form className="form" onSubmit={handleSubmit}>
              <FormGroup className="form-group">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                />
              </FormGroup>
              <Button className="btn" type="submit">
                Submit
              </Button>
            </Form>
            <p className="account-confirmation">
              Don't have an account? click here
            </p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignIn;
