import { Link, useNavigate } from "@tanstack/react-router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken } from "../../redux/slices/auth";
import { profile } from "../../services/auth";
import { useQuery } from "@tanstack/react-query";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const handleLogout = useCallback(() => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/login" });
  }, [dispatch, navigate]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.data));
    } else if (isError) {
      handleLogout();
    }
  }, [dispatch, isSuccess, isError, handleLogout, data]);

  const logout = (e) => {
    e.preventDefault();
    handleLogout();
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
            {user && user?.role_id === 1 && (
              <Nav.Link as={Link} to="/students/create">
                Create
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile">
                  <Image
                    src={user?.profile_picture}
                    fluid
                    style={{
                      width: "30px",
                      height: "30px",
                      display: "inline-block",
                      overflow: "hidden",
                      borderRadius: "50%",
                    }}
                  />{" "}
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
