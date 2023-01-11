import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../service/service';
import RowBlock from '../rowBlock';

// import styled from 'styled-components';

export default class CharacterPage extends Component {
  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false,
  };
  componentDidCatch() {
    this.setState({ error: true });
  }

  onItemSelected = (id) => {
    this.setState({ selectedChar: id });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllChar}
        renderItem={({ name, gender }) => `${name} (${gender})`}
      />
    );

    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedChar}
        getData={this.gotService.getCharById}
      >
        <Field field='gender' label='Gender' />
        <Field field='born' label='Born' />
      </ItemDetails>
    );
    return <RowBlock right={itemList} left={charDetails} />;
  }
}
