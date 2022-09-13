import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import ShoppingCartStack from './ShoppingCartStack';
import MenuScreen from '../screens/MenuScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeStack from './HomeStack';
import settingScreen from '../screens/AccountSettingScreen';


const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    
        <Tab.Navigator screenOptions={{headerShown: false}}
         tabBarOptions={{
            showLabel: false,
            inActiveTintColor:'white',
            activeTintColor: '#66d9d1',
        }}>
            <Tab.Screen component={HomeStack} name="home"
            options={{
                tabBarIcon:({color}) => (<Entypo name="home" color={color} size={25} />),
            }}
             />
            <Tab.Screen component={ShoppingCartStack} name="shoppingCart"
            options={{tabBarIcon:({color}) => (<Entypo name="shopping-cart" color={color} size={25} />),}}
            />
            <Tab.Screen component={MenuScreen} name="more"
            options={{tabBarIcon:({color}) => (<Entypo name="info" color={color} size={25} />),}}
            />
            <Tab.Screen component={settingScreen} name="setting"
            options={{tabBarIcon:({color}) => (<AntDesign name="setting" color={color} size={25} />),}}
            />
            
        </Tab.Navigator>
    
  );
};

export default BottomTabNav;
