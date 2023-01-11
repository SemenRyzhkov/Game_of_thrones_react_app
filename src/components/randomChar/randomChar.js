import React, { Component } from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import GotService from '../../service/service';
import Spiner from '../spiner';
import ErrorMessage from '../errorMessage';

const RandomCharContainer = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin: 40px 0 40px 0;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
  span {
    font-weight: bold;
  }
`;
export default class RandomChar extends Component {
  constructor() {
    super();
    this.updateChar();
  }

  gotService = new GotService();
  state = {
    char: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
    this.timerId = setInterval(this.updateChar, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onHandleError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  };

  updateChar = () => {
    const id = Math.floor(Math.random() * 140 + 25);
    // const id = 1500000;
    this.gotService
      .getCharById(id)
      .then(this.onCharLoaded)
      .catch(this.onHandleError);
    console.log('updated');
  };

  render() {
    const { char, loading, error } = this.state;
    const content = !(loading || error) ? <View char={char} /> : null;
    const spiner = loading ? <Spiner /> : null;
    const ifError = error ? <ErrorMessage /> : null;

    return (
      <RandomCharContainer className='rounded'>
        {content}
        {ifError}
        {spiner}
      </RandomCharContainer>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <>
      <h4>Random Character: {name}</h4>
      <ListGroup className='list-group-flush'>
        <ListGroupItem className='d-flex justify-content-between'>
          <span className='term'>Gender </span>
          <span>{gender}</span>
        </ListGroupItem>
        <ListGroupItem className='d-flex justify-content-between'>
          <span className='term'>Born </span>
          <span>{born}</span>
        </ListGroupItem>
        <ListGroupItem className='d-flex justify-content-between'>
          <span className='term'>Died </span>
          <span>{died}</span>
        </ListGroupItem>
        <ListGroupItem className='d-flex justify-content-between'>
          <span className='term'>Culture </span>
          <span>{culture}</span>
        </ListGroupItem>
      </ListGroup>
    </>
  );
};
