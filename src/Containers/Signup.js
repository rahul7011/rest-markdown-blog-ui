import React, { useState } from "react";
import { Redirect } from "react-router";
import { Container, Form, Header, Button } from "semantic-ui-react";
import MessageLoader from "../Components/MessageLoader";
import { history } from "../helpers/history";
import { AuthenticationService } from "../Services/AuthenticationServices";

function Signup() {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("")
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlesubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    AuthenticationService.SignUp({username,email,password1,password2})
      .then((res) => {
        
        setLoading(false);
        history.push("/");
      })
      .catch(err => {
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
      <Header>SignUp</Header>
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
            value={password1}
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Confirm Password</label>
          <input
            placeholder="Enter Password"
            value={password2}
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Field>
        <Button fluid type="submit" color="blue" loading={loading}>
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Signup;
