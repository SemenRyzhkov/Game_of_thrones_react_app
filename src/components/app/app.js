import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import { CharacterPage, BookPage, HousePage, BookItem } from '../pages/';
import GotService from '../../service/service';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const BtnBlock = styled.div`
  padding: 12px;
  /* background-color: #1e2edb; */
  border: none;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 40px;
  outline: none;
  box-shadow: 0px 0px 30px rgba(256, 256, 256, 0.1);
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export default class App extends Component {
  gotService = new GotService();

  state = {
    render: true,
    error: false,
  };

  onRandomCharRender = () => {
    this.setState((state) => {
      return {
        render: !state.render,
      };
    });
  };

  render() {
    const isRenderRandomChar = this.state.render ? <RandomChar /> : null;
    return (
      <Router>
        <div className='app'>
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {isRenderRandomChar}
                <BtnBlock>
                  <Button onClick={this.onRandomCharRender} color='primary'>
                    Toggle random char
                  </Button>
                </BtnBlock>
              </Col>
            </Row>
            <Route path='/' exact component={() => <h1>Hello</h1>} />
            <Route path='/characters' component={CharacterPage} />
            <Route path='/houses' component={HousePage} />
            <Route path='/books' exact component={BookPage} />
            <Route
              path='/books/:id'
              render={({ match }) => {
                const {id} = match.params;
                return <BookItem bookId={id}/>;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
