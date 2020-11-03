import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  //keyword searchterm
  const [keyword, setKeyword] = useState("");

  const FormsubmitHandler = (e) => {
    e.preventDefault();
    //check if keyword state is populated and trim white space
    if (keyword.trim()) {
      //redirect to products sorted by keyword or HomePage
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    //form needs inline tag in Navbar
    <Form onSubmit={FormsubmitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
