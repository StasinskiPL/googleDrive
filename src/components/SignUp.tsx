import { Form, Card, Button, Alert } from "react-bootstrap";
import { useState,useRef } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link,useHistory } from 'react-router-dom';
import CenterContainer from "./CenterContainer";


const SignUp: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const data = useAuthContext();
  const history = useHistory()
  const { signup } = data;
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const passwordConfirmRef = useRef<HTMLInputElement>(null!);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true)
    setError("")

    if (passwordConfirmRef.current.value !== passwordRef.current.value) {
        setError("Passwords not match!")
        setLoading(false)
        return;
    }


    if (signup) {
        try{
            await signup(emailRef.current.value, passwordRef.current.value);
            setLoading(false)
            history.push("/")
        }catch(e){
            setError("Fail to sign in")
            setLoading(false)
            console.log(e)
        }
    }
  
  }

  return (
    <CenterContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">
              {error}
          </Alert>}
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

            <Form.Group id="passwordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </CenterContainer>
  );
};

export default SignUp;
