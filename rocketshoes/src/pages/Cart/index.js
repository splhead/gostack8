import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import * as CartActions from '../../store/modules/cart/actions';

import formatPrice from '../../util/format';

import {
  Container,
  Products,
  Product,
  ProductInfo,
  ProductImage,
  ProductDetails,
  ProductTitle,
  ProductPrice,
  ProductDelete,
  ProductControls,
  ProductControlButton,
  ProductAmount,
  ProductSubtotal,
  TotalContainer,
  TotalText,
  TotalAmount,
  Order,
  OrderText,
  EmptyContainer,
  EmptyText,
} from './styles';

export default function Cart() {
  const cartSize = useSelector(state => state.cart.length);

  const products = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.price * product.amount),
      priceFormatted: formatPrice(product.price),
    }))
  );

  const dispatch = useDispatch();

  function handleRemoveFromCart(id) {
    dispatch(CartActions.removeFromCartRequest(id));
  }

  // console.tron.log(cartSize);

  return (
    <Container>
      {cartSize ? (
        <>
          <Products>
            {products.map(product => (
              <Product>
                <ProductInfo>
                  <ProductImage
                    source={{
                      uri: product.image,
                    }}
                  />
                  <ProductDetails>
                    <ProductTitle>{product.title}</ProductTitle>
                    <ProductPrice>{product.priceFormatted}</ProductPrice>
                  </ProductDetails>
                  <ProductDelete onPress={() => handleRemoveFromCart(item.id)}>
                    <Icon name="delete-forever" color="#7159c1" size={24} />
                  </ProductDelete>
                </ProductInfo>
                <ProductControls>
                  <ProductControlButton>
                    <Icon
                      name="remove-circle-outline"
                      color="#7159c1"
                      size={24}
                    />
                  </ProductControlButton>
                  <ProductAmount>{product.amount || 0}</ProductAmount>
                  <ProductControlButton>
                    <Icon name="add-circle-outline" color="#7159c1" size={24} />
                  </ProductControlButton>
                  <ProductSubtotal>{product.subtotal}</ProductSubtotal>
                </ProductControls>
              </Product>
            ))}
          </Products>
          <TotalContainer>
            <TotalText>TOTAL</TotalText>
            <TotalAmount>R$ 644,00</TotalAmount>
            <Order>
              <OrderText>FINALIZAR PEDIDO</OrderText>
            </Order>
          </TotalContainer>
        </>
      ) : (
        <EmptyContainer>
          <Icon name="remove-shopping-cart" color="#ccc" size={35} />
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}
