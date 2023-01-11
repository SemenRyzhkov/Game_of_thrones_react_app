import React from 'react';
import { Spinner } from 'reactstrap';
import styled from 'styled-components';

const SpinerBlock = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 40px 0 40px 0;
`;

const Spiner = () => {
  return (
    <SpinerBlock>
      <Spinner color='dark' style={{ width: '10rem', height: '10rem' }} />
    </SpinerBlock>
  );
};

export default Spiner;
