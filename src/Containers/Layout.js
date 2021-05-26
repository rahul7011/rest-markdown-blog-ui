import React from "react";
import Navbar from "../Components/Navbar";
import { Container } from "semantic-ui-react";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Container text style={{ marginTop: "7em" }}>
        {children}
      </Container>
    </div>
  );
};
export default Layout;
