import React, { Component } from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../service/service';
import RowBlock from '../rowBlock';

// import styled from 'styled-components';

export default class HousePage extends Component {
  gotService = new GotService();

  state = {
    selectedHouse: 1,
    error: false,
  };
  componentDidCatch() {
    this.setState({ error: true });
  }

  onHouseSelected = (id) => {
    this.setState({ selectedHouse: id });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onHouseSelected}
        getData={this.gotService.getAllHouses}
        renderItem={({ name, region}) =>
          `${name} (${region})`
        }
      />
    );

    const houseDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouseById}
      >
        <Field field='region' label='region' />
        <Field field='overlord' label='Overlord' />
      </ItemDetails>
    );
    return <RowBlock right={itemList} left={houseDetails} />;
  }
}
