import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import { Popup } from 'popup-ui';

import api from '../../../services/api';

import { addToCartSuccess, updateAmountSuccess } from './actions';
import NavigationService from '../../../services/NavigationService';
import formatPrice from '../../../util/format';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Popup.show({
      type: 'Warning',
      title: 'Aviso',
      button: false,
      textBody: 'Quantidade solicitada fora de estoque!',
      buttontext: 'Ok',
      callback: () => Popup.hide(),
    });
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));

    NavigationService.navigate('Cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Popup.show({
      type: 'Warning',
      title: 'Aviso',
      button: false,
      textBody: 'Quantidade solicitada fora de estoque!',
      buttontext: 'Ok',
      callback: () => Popup.hide(),
    });
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
