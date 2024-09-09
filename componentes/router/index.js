import { NavigationContainer } from '@react-navigation/native';

//import TabButton from './tabbar.route';
import DrawerTab from './drawer.route';

export default function Router() {
    return (
        <NavigationContainer>
          <DrawerTab />
        </NavigationContainer>
    );
  }