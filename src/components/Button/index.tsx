import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';

interface ButtonProps{
    text: string,
    onPress: () => void;
    containerStyles?: object;
}

const Button = ({ text, onPress, containerStyles} : ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles=StyleSheet.create({
   root:{
    backgroundColor:'#66d9d1',
    marginVertical:10,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:7,
    borderColor:'#edd224',

   },
   text:{
    fontSize:18,
    fontWeight:'bold',
    color:'black'
   },
});

export default Button;
