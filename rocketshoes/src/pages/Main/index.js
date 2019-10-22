import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Root } from 'popup-ui';

import Icon from 'react-native-vector-icons/MaterialIcons';

import formatPrice from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  ProductAmount,
  ProductAmountText,
  AddButtonText,
} from './styles';

export default function Main() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount;

      return sumAmount;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }

    getProducts();
  }, []);

  const renderProduct = useCallback(
    ({ item }) => {
      function handleAddToCart(id) {
        dispatch(CartActions.addToCartRequest(id));
      }

      return (
        <Product key={item.id}>
          <ProductImage
            source={{
              uri: item.image,
            }}
          />
          <ProductTitle>{item.title}</ProductTitle>
          <ProductPrice>{item.priceFormatted}</ProductPrice>
          <AddButton onPress={() => handleAddToCart(item.id)}>
            <ProductAmount>
              <Icon name="add-shopping-cart" color="#FFF" size={20} />
              <ProductAmountText>{amount[item.id] || 0}</ProductAmountText>
            </ProductAmount>
            <AddButtonText>ADICIONAR</AddButtonText>
          </AddButton>
        </Product>
      );
    },
    [amount, dispatch]
  );

  return (
    <Root>
      <Container>
        <FlatList
          horizontal
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
        />
      </Container>
    </Root>
  );
}

Main.navigationOptions = {
  title: 'Main',
};
