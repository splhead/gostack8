import React, { useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import formatPrice from '../../util/format';
import api from '../../services/api';

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

  const renderProduct = useCallback(({ item }) => {
    return (
      <Product key={item.id}>
        <ProductImage
          source={{
            uri: item.image,
          }}
        />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <ProductAmountText>1</ProductAmountText>
          </ProductAmount>
          <AddButtonText>ADICIONAR</AddButtonText>
        </AddButton>
      </Product>
    );
  }, []);

  return (
    <Container>
      <FlatList
        horizontal
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Main',
};
