import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Modal,
  ModalBody,
} from "reactstrap";
import { API, setAuthToken } from "../../../apiConfig/api";

const SignUp = ({ isOpen, toggle }) => {
  const [state, dispatch] = useContext(UserContext);
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("male");
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("fullName", fullName);
    data.append("gender", gender);
    data.append("phone", phone);
    data.append("address", address);
    data.append("avatar", avatar);

    console.log(data);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const res = await API.post("/register", data, config);

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

    // API.post("/register", data)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // history.push("/home");
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
            <h3 className="modal-title">Sign Up</h3>
            <Form className="form" onSubmit={handleSubmit}>
              <FormGroup className="form-group">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => {
                    const { value } = e.target;
                    setEmail(value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => {
                    const { value } = e.target;
                    setPassword(value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="fullName"
                  value={fullName}
                  placeholder="Full name"
                  onChange={(e) => {
                    const { value } = e.target;
                    setFullName(value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="select"
                  name="gender"
                  value={gender}
                  onChange={(e) => {
                    const { value } = e.target;
                    setGender(value);
                  }}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type="number"
                  name="phone"
                  value={phone}
                  placeholder="Phone"
                  onChange={(e) => {
                    const { value } = e.target;
                    setPhone(value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="address"
                  value={address}
                  placeholder="Address"
                  onChange={(e) => {
                    const { value } = e.target;
                    setAddress(value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="file"
                  name="avatar"
                  onChange={(e) => {
                    const avatar = e.target.files[0];
                    setAvatar(avatar);
                  }}
                />
                <FormText color="muted">
                  This is for your avatar in profile
                </FormText>
              </FormGroup>
              <Button className="btn">Register</Button>
            </Form>
            <p className="account-confirmation">
              Already have an account? click here
            </p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SignUp;
