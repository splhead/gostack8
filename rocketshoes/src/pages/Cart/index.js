import React from 'react';
import { useSelector } from 'react-redux';

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

  return (
    <Container>
      {cartSize.length ? (
        <>
          <Products>
            <Product>
              <ProductInfo>
                <ProductImage />
                <ProductDetails>
                  <ProductTitle>Tenis da hora</ProductTitle>
                  <ProductPrice>R$ 322,00</ProductPrice>
                </ProductDetails>
                <ProductDelete />
              </ProductInfo>
              <ProductControls>
                <ProductControlButton>icon</ProductControlButton>
                <ProductAmount>2</ProductAmount>
                <ProductControlButton>icon</ProductControlButton>
                <ProductSubtotal>R$ 644,00</ProductSubtotal>
              </ProductControls>
            </Product>
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
          <EmptyText>Seu carrinho está vazio.</EmptyText>
        </EmptyContainer>
      )}
    </Container>
  );
}
