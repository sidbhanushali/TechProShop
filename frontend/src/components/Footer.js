import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <a
              target='_blank'
              rel='noopener noreferrer'
              href='https://www.github.com/sidbhanushali'
            >
              Copyright &copy; Siddharth Bhanushali
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
