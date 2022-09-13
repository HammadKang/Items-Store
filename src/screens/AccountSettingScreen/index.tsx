import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Button from '../../components/Button';
import { Auth } from 'aws-amplify';


const settingScreen = () => {

    const onLogout=()=>{
        Auth.signOut();
     };
     const changePassword=()=>{
       Auth.changePassword;
    };

  return (
    
    <View style={{padding:10,backgroundColor:'#f2f205',height:'100%'}}>
        <Image resizeMode='stretch' style={{width:'100%',height:'70%'}} source={require('../../data/Logo.jpeg')} />
        <Text style={{textAlign:'center',marginVertical:10,fontSize:36,color:'black',fontWeight:'bold'}}> ACCOUNT SETTINGS</Text>
        <Button text="Change Password" onPress={changePassword} />
        <Button text="Sign-Out" onPress={onLogout} />
    </View>
  );
};


const styles = StyleSheet.create({});

export default settingScreen;
