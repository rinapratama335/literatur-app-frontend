import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  FormText,
  Input,
  Modal,
  ModalBody,
} from "reactstrap";
import { API } from "../../../apiConfig/api";

const UpdateProfile = ({ isOpen, toggle }) => {
  const [avatar, setAvatar] = useState(null);
  let history = useHistory();

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);

    API.patch("/edit-avatar", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    history.push("/profile");

    console.log(formData);
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
            <h3 className="modal-title" style={{ textAlign: "center" }}>
              Update photo profile
            </h3>
            <Form className="form" onSubmit={(e) => handleUpdate(e)}>
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
              <Button className="btn">Update photo</Button>
            </Form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
