import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import countryList from 'country-list';
import { Auth, DataStore } from 'aws-amplify';
import {CartProduct, Order, OrderProduct} from '../../models';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import styles from './styles';
import React,{useState} from 'react';

const contries = countryList.getData();

const AddressScreen = () => {
    const[country,setCountry] = useState(contries[0].code);
    const[fullName,setFullName] = useState('');
    const[phoneNumber,setPhoneNumber] = useState('');
    const[address,setAddress] = useState('');
    const[addressError,setAddressError] = useState('');
    const[city,setCity] = useState('');
    const[zipCode,setZipCode] = useState('');
    const navigation = useNavigation();
    

    const saveOrder = async() =>{
        const userData = await Auth.currentAuthenticatedUser();
        const newOrder = await DataStore.save(
            new Order({
                 userSub: userData.attributes.sub,
                 fullName: fullName,
                 phoneNumber: phoneNumber,
                 country,
                 city,
                 address,
            }),
        );


    const cartItems = await DataStore.query(CartProduct, cp =>
        cp.userSub('eq', userData.attributes.sub),
        );
    
    await Promise.all(
        cartItems.map(cartItem => DataStore.save(new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
        }),
        ),
        ),
    );
    await Promise.all(
        cartItems.map(cartItem => DataStore.delete(cartItem)));

    navigation.navigate('home');
    }; 

    const onCheckOut =()=>{
        if (addressError) {
          Alert.alert('Fix all the fields carefully');
          return;  
        }
        if (!fullName) {
            Alert.alert('Please Enter your Name');
            return;
        }
        if (!phoneNumber) {
            Alert.alert('Please Enter your Phone-Number');
            return;
        }
        if (!address) {
            Alert.alert('Please Enter your Address');
            return;
        }
        if (!city) {
            Alert.alert('Please Enter your City');
            return;
        }
        if (!zipCode) {
            Alert.alert('Please Enter your Zip-Code');
            return;
        }
        Alert.alert(`Thank you ${fullName} for Shopping.`,`Your Order has been Placed & will delivered to your address ${address} in a week.`);
        saveOrder();
    };

    const validateAddress =()=>{
        if (address.length < 6) {
            setAddressError('Address is short');
        }
        if (address.length < 12) {
            setAddressError('Missing');
        }
    };

  return (
    <KeyboardAvoidingView>
    <ScrollView style={styles.root}>
        <View style={styles.row}>
          <Text style={styles.choose}>Choose your Country:</Text> 
        <Text></Text>
        <View style={{backgroundColor:'#e6a607'}}>
          <Picker selectedValue={country} onValueChange={setCountry}>
            {contries.map(country => (<Picker.Item value={country.code} label={country.name} color="white"/>))}
          </Picker>
        </View>
        </View>
        <Text></Text>
        <View style={styles.row}>
           <Text style={styles.label}> Full Name:</Text>
           <TextInput style={[styles.input,styles.text]} placeholder="Enter your Full Name" placeholderTextColor="#2a3635" value={fullName} onChangeText={setFullName}/>
        </View>

        <View style={styles.row}>
           <Text style={styles.label}> Phone Number:</Text>
           <TextInput style={styles.input} placeholder="Enter your Phone Number" placeholderTextColor="#2a3635" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType={'phone-pad'} />
        </View>

        <View style={styles.row}>
           <Text style={styles.label}> Address:</Text>
           <TextInput style={styles.input} placeholder="Enter your Address" placeholderTextColor="#2a3635" value={address}
           onEndEditing={validateAddress} 
           onChangeText={text =>{
            setAddress(text);
            setAddressError('');
            }} />
        </View>
        {!!addressError && <Text style={styles.error}>{addressError}</Text>}

        <View style={styles.row}>
           <Text style={styles.label}> City:</Text>
           <TextInput style={styles.input} placeholder="Enter your City" placeholderTextColor="#2a3635" value={city} onChangeText={setCity} />
        </View>

        <View style={styles.row}>
           <Text style={styles.label}> Zip-Code:</Text>
           <TextInput style={styles.input} placeholder="Enter your City Zip-Code" placeholderTextColor="#2a3635" value={zipCode} onChangeText={setZipCode} keyboardType={'number-pad'} />
        </View>
        <Text></Text>
        <Button text='CheckOut' onPress={onCheckOut}/>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;
