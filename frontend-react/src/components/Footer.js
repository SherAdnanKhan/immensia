import React from 'react'
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer  className="fixed-bottom bg-light"
        style={{ backdropFilter: "blur(5px)", bottom: 0, width: '100%', marginTop: '30px', height: '30px', lineHeight: '0px', textAlign: 'center'}} >
        <Container>
          <Row>
            <Col className='text-center py-3'>
              CopyRight &copy; 2023
            </Col>
          </Row>
        </Container>
      </footer>      
    )
}

export default Footer