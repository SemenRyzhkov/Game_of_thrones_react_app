import React, { Component } from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import GotService from '../../service/service';
import { withRouter } from 'react-router-dom';

// import styled from 'styled-components';

export default class BookPage extends Component {
  gotService = new GotService();

  state = {
    error: false,
  };
  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <ItemList
        onItemSelected={(itemId)=>{
          this.props.history.push(itemId)
        }}
        getData={this.gotService.getAllBooks}
        renderItem={({ name }) => name}
      />
    );
  }
}
