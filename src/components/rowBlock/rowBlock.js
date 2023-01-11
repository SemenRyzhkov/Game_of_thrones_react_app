import React from 'react';
import { Col, Row } from 'reactstrap';


const RowBlock = ({right, left}) => {
  return (
    <Row>
      <Col md='6'>{right}</Col>
      <Col md='6'>{left}</Col>
    </Row>
  );
};

export default RowBlock;
