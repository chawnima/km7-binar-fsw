import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { allStudent } from "../services/student";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentCard from "../components/Student/studentCard";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const token = useSelector((state) => state.auth.token);
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStudents = async () => {
      setIsLoading(true);
      const result = await allStudent(null);
      if (result.success) {
        setStudent(result.data);
      }
      setIsLoading(false);
    };
    if (token) {
      getStudents();
    }
  }, [token]);

  if (!token) {
    return (
      <Col>
        <p>Please login first</p>
      </Col>
    );
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Row className="p-2">
      {student.length === 0 ? (
        <h1>No student found</h1>
      ) : (
        student.length > 0 &&
        student.map((student) => (
          <StudentCard student={student} key={student.id} />
        ))
      )}
    </Row>
  );
}
