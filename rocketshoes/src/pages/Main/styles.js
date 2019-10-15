import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Product = styled.View`
  width: 220;
  height: 340;
  background: #fff;
  border-radius: 4px;
  padding: 10px;
`;

export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductTitle = styled.Text`
  color: #333;
  font-size: 16px;
  margin-top: 5px;
  flex: 1;
`;
export const ProductPrice = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 21px;
  margin-top: 5px;
  flex: 1;
`;
export const AddButton = styled.TouchableOpacity`
  width: 200px;
  height: 42px;
  background: #7159c1;
  border-radius: 4px;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
`;
export const ProductAmount = styled.View`
  height: 42px;
  flex: 0.5;
  flex-direction: row;
  width: 53px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${darken(0.1, '#7159c1')};
  padding: 10px;
`;
export const ProductAmountText = styled.Text`
  color: #fff;
  margin-left: 5px;
`;
export const AddButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-left: 32px;
`;
