import React from "react";
import { useQuery, useMutation } from "react-query";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import BlockLoading from "react-loadingg/lib/BlockLoading";
import { Col, Container, Row, Table } from "reactstrap";
import { API } from "../../../apiConfig/api";
import { UserContext } from "../../../context/UserContext";
import "./AdminPage.css";

const AdminPage = () => {
  const file_url = "http://localhost:5000/file/";

  const {
    isLoading,
    error,
    data: literaturesData,
    refetch,
  } = useQuery("getAllLiteratures", () => API.get("/list-literatures"));

  const [handleCancelBtn] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ status: "canceled" });
      await API.patch(`/edit-literature/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err);
    }
  });

  const [handleApproveBtn] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ status: "approved" });
      await API.patch(`/edit-literature/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err);
    }
  });

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
              {isLoading ? (
                <BlockLoading />
              ) : error ? (
                <h3>Error</h3>
              ) : (
                literaturesData.data.data.literatures.map((data, index) => (
                  <tr key={index}>
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
