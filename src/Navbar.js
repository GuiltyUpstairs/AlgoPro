import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar({ topics, selectTopic, completedCount, totalCount }) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
            <Navbar.Brand href="/">AlgoPro</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Topics" id="basic-nav-dropdown" variant="dark">
                        {topics && topics.map((topic, index) => (
                            <NavDropdown.Item key={index} onClick={() => selectTopic(index)}>
                                {topic.topicName}
                            </NavDropdown.Item>
                        ))}
                    </NavDropdown>
                    <Nav.Link as={Link} to="/optimizer">Optimizer</Nav.Link> {/* Link to Optimizer page */}
                    <Nav.Link as={Link} to="/tutorials">Tutorials</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Item>
                        <Nav.Link disabled>{`Completed: ${completedCount}/${totalCount}`}</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default AppNavbar;

