import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../redux/slices/auth";

export const Route = createLazyFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      dispatch(setToken(null));
      navigate({ to: "/login" });
    }
  }, [token, navigate, dispatch]);


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
