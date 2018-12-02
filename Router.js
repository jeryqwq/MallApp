import {createStackNavigator } from 'react-navigation';
import HomeScreen from './components/views/Home '
import ProfileScreen from './components/ProfileScreen'
import UserLogin from "./components/views/UserLogin"
import FindPwd from "./components/views/FindPwd"
import Category from "./components/views/Category"
import ShoppingCart from './components/views/ShoppingCart'
import Person from "./components/views/Person"
import ProductDesc from './components/views/ProductDesc'
import Address from './components/views/Address'
import AddAddress from './components/views/AddAddress'
import PayCount from './components/views/PayCount'
const App = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Profile: {
        screen: ProfileScreen
    },
    UserLogin:{
        screen:UserLogin
    },
    FindPwd:{
        screen:FindPwd
    },
    Category:{
        screen:Category
    },
    ShoppingCart:{
        screen:ShoppingCart
    },
    Person:{
        screen:Person
    },
    ProductDesc:{
        screen:ProductDesc
    },
    address:{
        screen:Address
    },
    AddAddress:{
        screen:AddAddress
    },
    PayCount:{
        screen:PayCount
    }

},
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },

})
export default App;