import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { UserContext } from "../../../context/UserContext";
import "./index.css";
import { API } from "../../../apiConfig/api";
import { BlockLoading } from "react-loadingg";
import MyLiteratures from "../../../components/my-literatures";
import Profile from "../../../components/profile";

const ProfilePage = () => {
  const [state, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [myLiteratures, setMyLiteratures] = useState([]);

  const profileData = state.user;
  console.log("Profile Data :", profileData);

  const user_profile = "http://localhost:5000/avatar/";
  const cover_url = "http://localhost:5000/cover/";

  useEffect(() => {
    const myLiteratureLists = async () => {
      try {
        setLoading(true);
        const res = await API.get("/my-literatures");
        setMyLiteratures(res.data.data.myliteratures);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    myLiteratureLists();
  }, []);

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <h3 className="profile-title white">Profile</h3>
          </Col>
        </Row>
        <Profile
          avatar={`${user_profile}${profileData.avatar}`}
          email={profileData.email}
          gender={profileData.gender}
          phone={profileData.phone}
          address={profileData.address}
        />
        <Row>
          <Col>
            <h3 className="profile-title white gap-top">My Literature</h3>
          </Col>
        </Row>
        <div>
          <Row className="my-literatures">
            {loading || !myLiteratures ? (
              <BlockLoading />
            ) : (
              myLiteratures.map((item, index) => (
                <Col md={3}>
                  <MyLiteratures
                    key={index}
                    id={item.id}
                    cover={`${cover_url}${item.cover}`}
                    title={item.title}
                    publication={item.publication}
                    user={item.user?.fullName}
                    status={item.status}
                  />
                </Col>
              ))
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ProfilePage;
