import React from 'react';
import img from './img.jpg';
import styled from 'styled-components';

const ErrorBlock = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  img {
    width: 100%;
  }
`;

const ErrorMessage = () => {
  return (
    <ErrorBlock>
      <div>
        <img src={img} alt='error' />
      </div>
      <div>
        <span>Something goes wrong</span>
      </div>
    </ErrorBlock>
  );
};

export default ErrorMessage;
