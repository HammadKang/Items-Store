import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createStackNavigator();

const ShoppingCartStack = () => {
  return (
        <Stack.Navigator screenOptions={{}}>
           <Stack.Screen 
           component={ShoppingCartScreen}
           name="shoppingCart"
           options={{headerShown: false}}
           />
           <Stack.Screen component={AddressScreen}
           name="Address"
           options={{
            title: 'Information',
            headerTitleAlign:'center',
            headerTitleStyle:{
              fontSize:25,
              color:'black'
            }
            }} />
        </Stack.Navigator>
    );
};

export default ShoppingCartStack;
