import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { allStudent } from "../services/student";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentCard from "../components/Student/studentCard";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const token = useSelector((state) => state.auth.token);
  const [student, setStudent] = useState([]);

  const { data, isSuccess, isPending } = useQuery({
    queryKey: ["students"],
    queryFn: () => allStudent(),
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      setStudent(data.data);
    }
  }, [data, isSuccess]);

  if (!token) {
    return (
      <Col>
        <p>Please login first</p>
      </Col>
    );
  }

  if (isPending) {
    return <h1>Loading...</h1>;
  }

  return (
    <Row className="p-2">
      {student?.length === 0 ? (
        <h1>No student found</h1>
      ) : (
        student?.length > 0 &&
        student?.map((student) => (
          <StudentCard student={student} key={student.id} />
        ))
      )}
    </Row>
  );
}
