import { createLazyFileRoute } from "@tanstack/react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { getStudentById } from "../../services/student";

export const Route = createLazyFileRoute("/students/$id")({
  component: StudentDetail,
});

function StudentDetail() {
  const { id } = Route.useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getProfile = async (id) => {
      setIsLoading(true);
      const result = await getStudentById(id);
      if (result.success) {
        setUser(result.data);
      }
      setIsLoading(false);
    };
    if (id) {
      getProfile(id);
    }
  }, [id]);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Img variant="top" src={user?.profile_picture}></Card.Img>
          <Card.Body>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Text>{user?.nickName}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
