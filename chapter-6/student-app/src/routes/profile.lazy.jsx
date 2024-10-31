import { createLazyFileRoute } from "@tanstack/react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";

export const Route = createLazyFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile(token);
      return;
    }
    window.location = "/login";
  }, []);

  const getProfile = async (token) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
      headers: {
        authorization: `Bearer ${token}`,
        method: "GET",
      },
    });
    const result = await res.json();
    if (result.success) {
      setUser(result.data);
      return;
    }
    window.location = "/login";
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Img variant="top" src={user?.profile_picture}></Card.Img>
          <Card.Body>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Text>{user?.email}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
