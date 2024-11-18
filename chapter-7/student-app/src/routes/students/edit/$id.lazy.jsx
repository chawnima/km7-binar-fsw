import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getStudentById, updateStudent } from "../../../services/student";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { getClasses } from "../../../services/class";
import { getUniversities } from "../../../services/university";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/students/edit/$id")({
  component: EditStudent,
});

function EditStudent() {
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(undefined);
  const [universityId, setUniversityId] = useState(0);
  const [classId, setClassId] = useState(0);
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { mutate: editStudent } = useMutation({
    mutationFn: (request) => updateStudent(request),
    onSuccess: () => {
      toast.success("Data edit successful");
    },
  });

  const { data, isSuccess, isPending, isError } = useQuery({
    queryKey: ["studentsProfile", id],
    queryFn: () => getStudentById(id),
  });

  const { data: universities } = useQuery({
    queryKey: ["universities"],
    queryFn: () => getUniversities(),
  });

  const { data: classes } = useQuery({
    queryKey: ["classes"],
    queryFn: () => getClasses(),
  });

  useEffect(() => {
    if (isSuccess) {
      setName(data.data.name);
      setNickName(data.data.nick_name);
      setProfilePicture(data.data.profile_picture);
      setCurrentProfilePicture(data.data.profile_picture);
      setUniversityId(data.data.university_id);
      setClassId(data.data.class_id);
    }
    if (isError) {
      navigate({ to: "/" });
      return;
    }
  }, [data, isSuccess, navigate, isError]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("name", name);
    body.append("nick_name", nickName);
    body.append("profile_picture", profilePicture);
    body.append("university_id", universityId);
    body.append("class_id", classId);

    editStudent(body);
  };

  if (isPending) {
    return <h1>Loading...</h1>;
  }
  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Edit Student</Card.Header>
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
                    <option disabled>Select University</option>
                    {universities?.length > 0 &&
                      universities?.map((university) => (
                        <option
                          key={university?.id}
                          value={university?.id}
                          selected={
                            university?.id == universityId ? true : false
                          }
                        >
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
                    {classes?.length > 0 &&
                      classes?.map((c) => (
                        <option
                          key={c?.id}
                          value={c?.id}
                          selected={c?.id == classId ? true : false}
                        >
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
              <Form.Group as={Row} className="mb-3" controlId="profilePicture">
                <Form.Label column sm={3}>
                  Current Profile Picture
                </Form.Label>
                <Image src={currentProfilePicture} />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Edit Student
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
