import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router";
import { Container, Form, Header, Button } from "semantic-ui-react";
import { api } from "../api";
import MessageLoader from "../Components/MessageLoader";
import { history } from "../helpers/history";
import { AuthenticationService } from "../Services/AuthenticationServices";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlesubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post(api.auth.login, {
        username,
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.key);    //saving it to the local storage
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError(err.message || err);
        setLoading(false);
      });
  };

  //checking if already loggedIn then move to homepage
  if(AuthenticationService.isAuthenticated)
  {
    return <Redirect to="/" />
  }

  return (
    <Container>
      <Header>Login</Header>
      {error && <MessageLoader danger message={error} />}
      <Form onSubmit={handlesubmit}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Enter Username"
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Enter Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Enter Password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Form.Field></Form.Field>
        <Button fluid type="submit" color="blue" loading={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
