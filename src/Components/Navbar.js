import React from "react";
import { NavLink } from "react-router-dom";
import { Container, Menu } from "semantic-ui-react";

const Navbar = () => (
  <div>
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          React Markdown
        </Menu.Item>
        <NavLink to="/"><Menu.Item as="li">Posts</Menu.Item></NavLink>
      </Container>
    </Menu>
  </div>
);

export default Navbar;