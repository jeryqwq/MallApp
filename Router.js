import {createStackNavigator } from 'react-navigation';
import HomeScreen from './components/views/Home '
import ProfileScreen from './components/ProfileScreen'
import UserLogin from "./components/views/UserLogin"
import Category from "./components/views/Category"
import ShoppingCart from './components/views/ShoppingCart'
import Person from "./components/views/Person"
import ProductDesc from './components/views/ProductDesc'
import Address from './components/views/Address'
import AddAddress from './components/views/AddAddress'
import PayCount from './components/views/PayCount'
import OrderList from "./components/views/OrderList"
import UserInfos from './components/views/UserInfos'
import UpdatePwd from './components/views/UpdatePwd'
import AliPay from './components/views/AliPay'
import PaySuccess from './components/views/PaySuccess'
import Comments from './components/views/Comment'
import AllComments from './components/views/Comments'
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
    },
    OrderList:{
        screen:OrderList
    },
    UserInfos:{
        screen:UserInfos
    },
    UpdatePwd:{
        screen:UpdatePwd
    },
    AliPay:{
       screen:AliPay
    },
    PaySuccess:{
        screen:PaySuccess
    },
    Comments:{
        screen:Comments
    },
    AllComments:{
        screen:AllComments
    }
},
  {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
})
export default App;