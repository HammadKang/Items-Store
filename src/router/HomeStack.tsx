import { createStackNavigator } from '@react-navigation/stack';
import React,{useState} from 'react';
import { SafeAreaView, View, TextInput, Text, Linking } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

interface HeaderComponentProps{
  searchValue: string,
  setSearchValue: () => void;
}

const HeaderComponent = ({searchValue, setSearchValue}: HeaderComponentProps) =>{
  return(
    <SafeAreaView style={{ backgroundColor:'#66d9d1' }}>
      <View style={{margin: 10,backgroundColor:'white',padding: 3, flexDirection:'row', alignItems:'center' }}>
        <Feather name="search" size={25} color="black" onPress={()=>Linking.openURL('https://www.google.com/')} />
      <TextInput style={{height: 40,fontWeight:'normal',color:'black',width:'75%',marginLeft: 12}} 
      placeholder='Type here to Search...'
      placeholderTextColor="black"
      value={searchValue}
      onChangeText={setSearchValue}
      />
      <View style={{flexDirection:'row'}}>
      <MaterialIcons name="keyboard-voice" size={25} color="black" onPress={()=>Linking.openURL('https://www.onlinemictest.com/')} />
      <Text> </Text>
      <Feather name="camera" size={25} color="black" onPress={()=>Linking.openURL('https://webcamtests.com/')} />
      </View>
      </View>
    </SafeAreaView>
  ); 
};

const HomeStack = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
      <Stack.Navigator
        screenOptions={{
          header: () => <HeaderComponent searchValue={searchValue} setSearchValue={setSearchValue} /> ,
        }}
        >
           <Stack.Screen
           name="HomeScreen"
           options={{title: 'Home'}}>
            {()=> <HomeScreen searchValue ={searchValue} />}
           </Stack.Screen>
           
           <Stack.Screen 
           component={ProductScreen} 
           name="ProductDetails"
           />
        </Stack.Navigator> 
    );
};

export default HomeStack;
