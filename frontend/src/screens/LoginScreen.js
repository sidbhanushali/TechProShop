import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

const LoginScreen = ({ location, history }) => {
  //form data to be passed through dispatch
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  //from userLogin reducer
  const { loading, error, userInfo } = userLogin;

  //check for URL query string, spilt string to array at = sign and get 1st index of array (right of the equal sign or redirect back home)
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    //userInfo would populate on _SUCCESS action firing off
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch loginActions send form data from component state
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Log In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='success'>
          Log In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?
          {/* check for redirect value other whys send to /register page */}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            <br />
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
