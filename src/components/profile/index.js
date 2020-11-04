import React, { useState } from "react";
import {
  FaRegEnvelope,
  FaTransgender,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Col, Row } from "reactstrap";
import UpdateProfile from "../../components/modals/update-profile";

const Profile = ({ email, gender, phone, address, avatar }) => {
  const [picture, setPicture] = useState(false);
  const updateToggle = () => setPicture(!picture);

  return (
    <div className="desc-profile">
      <Row>
        <Col md={6} sm={12}>
          <div className="desc-item">
            <FaRegEnvelope size={30} className="icon" />
            <div>
              <p className="item white">{email}</p>
              <p className="gray">Email</p>
            </div>
          </div>
          <div className="desc-item">
            <FaTransgender size={30} className="icon" />
            <div>
              <p className="item white">{gender}</p>
              <p className="gray">Gender</p>
            </div>
          </div>
          <div className="desc-item">
            <FaPhoneAlt size={30} className="icon" />
            <div>
              <p className="item white">+62{phone}</p>
              <p className="gray">Mobile Phone</p>
            </div>
          </div>
          <div className="desc-item">
            <FaMapMarkerAlt size={30} className="icon" />
            <div>
              <p className="item white">{address}</p>
              <p className="gray">Address</p>
            </div>
          </div>
        </Col>
        <Col md={6} sm={12}>
          <div className="col-right">
            <div>
              <img src={avatar} alt="photo" className="photo-profile" />
            </div>
            <div>
              <button className="btn" onClick={updateToggle}>
                Change Photo
              </button>
            </div>
          </div>
        </Col>
      </Row>

      {picture ? (
        <UpdateProfile isOpen={picture} toggle={updateToggle} />
      ) : null}
    </div>
  );
};

export default Profile;
