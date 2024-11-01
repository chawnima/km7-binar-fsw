import { Link, useNavigate } from "@tanstack/react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async (token) => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
          method: "GET",
        },
      });
      const result = await res.json();
      if (result.success) {
        dispatch(setUser(result.data));
        return;
      }
      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate({ to: "/login" });
    };
    if (token) {
      getProfile(token);
    }
  }, [dispatch, navigate, token]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/login" });
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  {user?.name}
                </Nav.Link>
                <Nav.Link onClick={logout}>Log Out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
