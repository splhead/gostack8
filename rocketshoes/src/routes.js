import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Cart from './pages/Cart';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Cart,
    },
    {
      headerLayoutPreset: 'center',
      headerBackTitleVisible: false,
      defaultNavigationOptions: {
        // header: <Header {...navigation} />
        headerStyle: {
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
      },
      cardStyle: {
        backgroundColor: '#191920',
      },
    }
  )
);

export default Routes;
