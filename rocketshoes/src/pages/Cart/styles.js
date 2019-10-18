import styled from 'styled-components/native';

export const Container = styled.View`
  background: #191920;
  padding: 20px;
`;

export const Products = styled.View`
  background: #fff;
  width: 320px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 15px;
`;

export const Product = styled.View``;
export const ProductInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ProductImage = styled.Image`
  width: 80px;
  height: 80px;
`;
export const ProductDetails = styled.View`
  margin-left: 10px;
  flex: 1;
  padding: 10px;
`;
export const ProductTitle = styled.Text`
  color: #333;
`;
export const ProductPrice = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
export const ProductDelete = styled.TouchableOpacity`
  padding: 6px;
`;
export const ProductControls = styled.View`
  flex-direction: row;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  padding: 8px;
`;
export const ProductControlButton = styled.TouchableOpacity``;

export const ProductAmount = styled.TextInput.attrs({
  readonly: true,
})`
  border: 1px solid #ddd;
  padding: 5px;
  background: #fff;
  border-radius: 4px;
  margin: 0px 5px;
  min-width: 52px;
`;

export const ProductSubtotal = styled.Text`
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: right;
`;
export const TotalContainer = styled.View`
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 15px;
`;
export const TotalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #999;
  text-align: center;
`;
export const TotalAmount = styled.Text`
  font-weight: bold;
  font-size: 30px;
  text-align: center;
`;
export const Order = styled.TouchableOpacity`
  background: #7159c1;
  padding: 15px;
  border-radius: 4px;
  margin-top: 30px;
`;
export const OrderText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-align: center;
`;
export const EmptyContainer = styled.View`
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  align-items: center;
`;
export const EmptyText = styled.Text`
  font-weight: bold;
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
`;
