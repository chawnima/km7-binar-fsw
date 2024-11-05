import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { deleteStudent, getStudentById } from "../../services/student";
import Button from "react-bootstrap/Button";

export const Route = createLazyFileRoute("/students/$id")({
  component: StudentDetail,
});

function StudentDetail() {
  const { id } = Route.useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
  }, [id,navigate]);

  const onDelete = async (e) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this student?")) {
      const deletedStudent = await deleteStudent(id);
      alert(`Deleted ${deletedStudent.name}`);
    }
  };

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(!user){
    return <h1>Student not found</h1>
  }
  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Img variant="top" src={user?.profile_picture}></Card.Img>
          <Card.Body>
            <Card.Title>{user?.name}</Card.Title>
            <Card.Text>{user?.nick_name}</Card.Text>
            <Card.Text>{user?.universities.name}</Card.Text>
            <Card.Text>{user?.classes.class}</Card.Text>
            <Button as={Link} href={`/students/edit/${id}`}>
              Edit
            </Button>
            <Button onClick={onDelete}>Delete</Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
