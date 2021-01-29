import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import CenterContainer from "./CenterContainer";

const Login: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const data = useAuthContext();
  const { login } = data;
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  const history = useHistory();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (login) {
      try {
        await login(emailRef.current.value, passwordRef.current.value);
        console.log("logged")
        setLoading(false);
        history.push("/");
      } catch (e) {
        setError("Fail to Login");
        setLoading(false);
        console.log(e);
      }
    }
  }

  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                autoComplete="newPassword"
                required
              ></Form.Control>
            </Form.Group>

            <Button type="submit" disabled={loading} className="w-100">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need a account ? <Link to="/signup">Sign Up</Link>
      </div>
    </CenterContainer>
  );
};

export default Login;
