import styled from 'styled-components/native';
import { darken } from 'polished';

export const Container = styled.View`
  background: #191920;
`;

export const Product = styled.View`
  width: 220;
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  margin: 15px;
`;

export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductTitle = styled.Text`
  color: #333;
  font-size: 16px;
`;
export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 21px;
  margin-top: 5px;
`;
export const AddButton = styled.TouchableOpacity`
  background: #7159c1;
  border-radius: 4px;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
`;
export const ProductAmount = styled.View`
  flex-direction: row;
  width: 53px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  background: ${darken(0.1, '#7159c1')};
  padding: 12px;
  align-items: center;
`;
export const ProductAmountText = styled.Text`
  color: #fff;
  margin-left: 2px;
`;
export const AddButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-left: 32px;
`;
