import React, { Component } from 'react';
import styled from 'styled-components';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Spiner from '../spiner';
import ErrorMessage from '../errorMessage';

const ItemDetailsBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }

  .select-error {
    color: #ccc;
    text-align: center;
    font-size: 26px;
  }
`;

const Field = ({ item, field, label }) => {
  return (
    <ListGroupItem className='d-flex justify-content-between'>
      <span className='term'>{label}</span>
      <span>{item[field]}</span>
    </ListGroupItem>
  );
};

export { Field };
export default class ItemDetails extends Component {
  state = {
    item: {},
    loading: true,
    error: false,
  };

  onHandleError = () => {
    this.setState({ loading: false, error: true });
  };

  onItemLoaded = (item) => {
    this.setState({ item, loading: false });
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    const { getData } = this.props;

    getData(itemId)
      .then(this.onItemLoaded)
      .catch(this.onHandleError);
    // this.foo.bar = 0;
  }

  render() {
    const { loading, error, item } = this.state;
    const content = !(loading || error) ? (
      <View item={item}>
        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, { item });
        })}
      </View>
    ) : null;
    const spiner = loading ? <Spiner /> : null;
    const ifError = error ? <ErrorMessage /> : null;

    return (
      <ItemDetailsBlock className='rounded'>
        {content}
        {ifError}
        {spiner}
      </ItemDetailsBlock>
    );
  }
}

const View = (props) => {
  const { item } = props;
  const { name } = item;
  return (
    <>
      <h4>{name}</h4>
      <ListGroup className='list-group-flush'>{props.children}</ListGroup>
    </>
  );
};
