import React, { Component } from 'react';
import ItemList from '../../itemList';
import ItemDetails, { Field } from '../../itemDetails';
import ErrorMessage from '../../errorMessage';
import GotService from '../../../service/service';
import RowBlock from '../../rowBlock';

// import styled from 'styled-components';

export default class BookPage extends Component {
  gotService = new GotService();

  state = {
    selectedBook: 1,
    error: false,
  };
  componentDidCatch() {
    this.setState({ error: true });
  }

  onBookSelected = (id) => {
    this.setState({ selectedBook: id });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onBookSelected}
        getData={this.gotService.getAllBooks}
        renderItem={({ name, publisher, released }) =>
          `${name} (${publisher}-${released})`
        }
      />
    );

    const bookDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getData={this.gotService.getBookById}
      >
        <Field field='publisher' label='Publisher' />
        <Field field='released' label='Released' />
      </ItemDetails>
    );
    return <RowBlock right={itemList} left={bookDetails} />;
  }
}
