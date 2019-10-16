// export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
//   style: 'currency',
//   currency: 'BRL',
// });
import Numeral from "numeral";
import "numeral/locales/pt-br";

// switch between locales
Numeral.locale('pt-br');
//Usage
function format(price) {
  return Numeral(price).format("$0.00")
}

export default format;