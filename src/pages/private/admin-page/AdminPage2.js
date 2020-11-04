import React, { useEffect, useState, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import BlockLoading from "react-loadingg/lib/BlockLoading";
import { Col, Container, Row, Table } from "reactstrap";
import { API } from "../../../apiConfig/api";
import { UserContext } from "../../../context/UserContext";
import "./AdminPage.css";

const AdminPage = () => {
  const [state, dispatch] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [literatures, setLiteratures] = useState([]);
  const file_url = "http://localhost:5000/file/";

  useEffect(() => {
    const listsLiteratures = async () => {
      try {
        setLoading(true);
        const res = await API.get("/list-literatures");
        setLiteratures(res.data.data.literatures);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };

    listsLiteratures();
  }, []);

  console.log(literatures);

  const handleCancelBtn = async (id) => {
    console.log("Ini ID : ", id);
    try {
      await API.patch(`/edit-literature/${id}`, {
        status: "canceled",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleApproveBtn = async (id) => {
    console.log("Ini ID : ", id);
    try {
      await API.patch(`/edit-literature/${id}`, {
        status: "approved",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="white content-title">
            <h4>Literature Verification</h4>
          </div>
          <Table>
            <thead className="white">
              <th>User</th>
              <th>ISBN</th>
              <th>Literature</th>
              <th>Status</th>
              <th>Action</th>
            </thead>
            <tbody>
              {loading || !literatures ? (
                <BlockLoading />
              ) : (
                literatures.map((data) => (
                  <tr>
                    <td className="white">{data.user?.fullName}</td>
                    <td className="white">{data.ISBN}</td>
                    <td>
                      <a
                        href={`${file_url}${data.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="file"
                      >
                        {data.file}
                      </a>
                    </td>
                    {data.status === "waiting" ? (
                      <td style={{ color: "#F7941E" }}>{data.status}</td>
                    ) : data.status === "approved" ? (
                      <td style={{ color: "#0ACF83" }}>{data.status}</td>
                    ) : (
                      <td style={{ color: "#FF0742" }}>{data.status}</td>
                    )}
                    {data.status === "waiting" ? (
                      <td>
                        <button
                          className="btn-confirm btn-cancel"
                          onClick={() => handleCancelBtn(data.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn-confirm btn-approve"
                          onClick={() => handleApproveBtn(data.id)}
                        >
                          Approve
                        </button>
                      </td>
                    ) : data.status === "approved" ? (
                      <td>
                        <FaCheckCircle size={30} color="#3BB54A" />
                      </td>
                    ) : (
                      <td>
                        <IoIosCloseCircle size={30} color="#FF0742" />
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
