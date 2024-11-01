import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setToken,setUser} from "../redux/slices/auth"
import { register } from "../services/auth";

export const Route = createLazyFileRoute("/register")({
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [profilePicture, setFile] = useState(undefined);

  useEffect(()=>{
    if(token){
      navigate({to:"/"})
    }
  },[navigate,token])

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password != rePassword) {
      alert("Password does not match");
      return;
    }
    const body = {
      name,
      email,
      password,
      profilePicture
    }
    const result = await register(body)
    if (result.success) {
      dispatch(setToken(result.data.token));
      dispatch(setUser(result.data.user));
      navigate({ to: "/" });
      return;
    }
    alert(result.message);
  };

  return (
    <Row className="mt-5">
      <Col className="offset-md-3">
        <Card>
          <Card.Header className="text-center">Register</Card.Header>
          <Card.Body>
            <Form onSubmit={onSubmit}>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextName"
              >
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextRePassword"
              >
                <Form.Label column sm="2">
                  Confirm Password
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="formFile">
                <Form.Label column sm="2">
                  Profile Picture
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept=".png,.jpg"
                  />
                </Col>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="primary">
                  Register
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
