import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { allStudent } from "../services/student";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/esm/Col";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const token = useSelector((state) => state.auth.token);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const result = await allStudent(null);
      if (result.success) {
        setStudent(result.data);
        return;
      }
      alert(result.message);
    };
    if (token) {
      getStudents();
    }
  }, [token]);
  return (
    <div className="p-2">
      {!token && <Col><p>Please login first</p></Col>}
      {student.length > 0 &&
        student.map((student) => (
          <div key={student.id}>
            <p>{student.name}</p>
          </div>))}
    </div>
  );
}
