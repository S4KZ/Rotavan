import 'react-native-gesture-handler';
import RouterUser from './componentes/router-User/index';
import RouterMotor from './componentes/router-Motor/index';
import RouterLog from './componentes/route-log/index';
const Db = require('./componentes/data/db')


export default function App() {
  return (
             <RouterLog />
          //  <RouterMotor />
        //  <RouterUser />
      );
}

