import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getUniversities } from "../../services/university";
import { getClasses } from "../../services/class";
import { createStudent } from "../../services/student";
import Protected from "../../components/Auth/Protected";

export const Route = createLazyFileRoute("/students/create")({
  component: () => (
    <Protected roles={[1]}>
      <CreateStudent />
    </Protected>
  ),
});

function CreateStudent() {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(undefined);
  const [universities, setUniversities] = useState([]);
  const [universityId, setUniversityId] = useState(0);
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUniversitiesData = async () => {
      const result = await getUniversities();
      if (result?.success) {
        setUniversities(result?.data);
      }
    };
    const getClassesData = async () => {
      const result = await getClasses();
      if (result?.success) {
        setClasses(result?.data);
      }
    };

    getUniversitiesData();
    getClassesData();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append("name", name);
    body.append("nick_name", nickName);
    body.append("profile_picture", profilePicture);
    body.append("university_id", universityId);
    body.append("class_id", classId);

    const createStudentData = async () => {
      setIsLoading(true);
      const result = await createStudent(body);
      if (result.success) {
        alert(result.message);
        setIsLoading(false);
        return;
      }
      alert(result.message);
      setIsLoading(false);
    };

    createStudentData();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Create Student</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={3}>
                  Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="nick_name">
                <Form.Label column sm={3}>
                  Nick Name
                </Form.Label>
                <Col sm="9">
                  <Form.Control
                    type="text"
                    placeholder="Nick Name"
                    required
                    value={nickName}
                    onChange={(event) => {
                      setNickName(event.target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="university">
                <Form.Label column sm={3}>
                  University
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setUniversityId(e.target.value)}
                  >
                    <option disabled selected>
                      Select University
                    </option>
                    {universities.length > 0 &&
                      universities.map((university) => (
                        <option key={university?.id} value={university?.id}>
                          {university?.name}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="class">
                <Form.Label column sm={3}>
                  Class
                </Form.Label>
                <Col sm="9">
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setClassId(e.target.value)}
                  >
                    <option disabled selected>
                      Select Class
                    </option>
                    {classes.length > 0 &&
                      classes.map((c) => (
                        <option key={c?.id} value={c?.id}>
                          {c?.class}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="profilePicture">
                <Form.Label column sm={3}>
                  Profile Picture
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="file"
                    placeholder="Choose File"
                    required
                    onChange={(event) => {
                      setProfilePicture(event.target.files[0]);
                      setCurrentProfilePicture(
                        URL.createObjectURL(event.target.files[0])
                      );
                    }}
                    accept=".jpg,.png"
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="currentProfilePicture"
              >
                <Form.Label column sm={3}>
                  Current Profile Picture
                </Form.Label>
                <Image src={currentProfilePicture} fluid />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Create Student
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}></Col>
    </Row>
  );
}
