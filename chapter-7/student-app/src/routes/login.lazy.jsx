import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/slices/auth";
import { login, googleAuthLogin } from "../services/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

export const Route = createLazyFileRoute("/login")({
    component: Login,
});

function Login() {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (token) {
            navigate({ to: "/" });
        }
    });
    const onSubmit = async (e) => {
        e.preventDefault();

        const body = new FormData();
        body.append("email", email);
        body.append("password", password);

        const result = await login(body);
        if (result.success) {
            dispatch(setToken(result.data.token));
            navigate({ to: "/" });
            return;
        }
        alert(result.message);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const result = await googleAuthLogin(tokenResponse);
            if (result.success) {
                dispatch(setToken(result.data.token));
                dispatch(setUser(result.data.user));
                console.log(result);
                navigate({ to: "/" });
                return;
            }
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return (
        <Row className="mt-5">
            <Col className="offset-md-3">
                <Card>
                    <Card.Header className="text-center">Login</Card.Header>
                    <Card.Body>
                        <Form onSubmit={onSubmit}>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="email"
                            >
                                <Form.Label column sm={3}>
                                    Email
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(event) => {
                                            setEmail(event.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                            <Form.Group
                                as={Row}
                                className="mb-3"
                                controlId="password"
                            >
                                <Form.Label column sm={3}>
                                    Password
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button type="submit" variant="primary">
                                    Login
                                </Button>
                            </div>
                            <div className="d-grid gap-2">
                                <Button onClick={googleLogin} variant="primary">
                                    Login with Google
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
