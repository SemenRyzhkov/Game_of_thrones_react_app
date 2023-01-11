import React, { Component } from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spiner from '../spiner';
import ErrorMessage from '../errorMessage';

const ItemListBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  cursor: pointer;
`;
class ItemList extends Component {
  state = {
    list: [],
    loading: true,
    error: false,
  };

  onHandleError = () => {
    this.setState({ loading: false, error: true });
  };

  onListLoaded = (list) => {
    this.setState({ list, loading: false });
  };

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then(this.onListLoaded)
      .catch(this.onHandleError);
    // this.setState({ charList });
    // console.log(this.state.charList);
  }

  renderList(list) {
    return list.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <ListGroupItem
          className='list-group-item'
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </ListGroupItem>
      );
    });
  }

  render() {
    const { loading, error, list } = this.state;
    const items = this.renderList(list);
    const content = !(loading || error) ? (
      <ListGroup className='item-list'>{items}</ListGroup>
    ) : null;
    const spiner = loading ? <Spiner /> : null;
    const ifError = error ? <ErrorMessage /> : null;

    return (
      <ItemListBlock className='rounded'>
        {content}
        {ifError}
        {spiner}
      </ItemListBlock>
    );
  }
}

const f = () => {
  return class extends Component {
    componentDidMount() {
      console.log(this.props);
    }

    render() {
      return <ItemList {...this.props} />;
    }
  };
};

export default f();
