import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Todo App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {userInfo && userInfo?.user?.role === "admin" && (
                <>
                  <LinkContainer to="/">
                    <Nav.Link>Todo List</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/add-folder">
                    <Nav.Link>Add Folder</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/TodoForm">
                    <Nav.Link>Todo Form</Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && (
                <LinkContainer to="/chat">
                  <Nav.Link>Chat</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Nav className="ml-auto">
              <LinkContainer to="/login">
                {userInfo ? (
                  <NavDropdown
                    title={`Welcome, ${userInfo?.user?.name}`}
                    id="username"
                  >
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link>
                    {" "}
                    <i className="fas fa-user"> </i> Sign In
                  </Nav.Link>
                )}
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
