import {StyleSheet} from "react-native";

const styles =StyleSheet.create({
   root:{
      padding:10,
      backgroundColor:'white',
   },
    title:{
      fontSize:20,
      fontWeight:'700',
      color:'black',
    },
    price:{
      paddingTop:10,  
      fontSize: 18,
        fontWeight:'bold',
        color:'black',
     },
     oldprice:{
        fontSize: 14,
        fontWeight: 'normal',
        color:'black',
        textDecorationLine:'line-through',
     },
     description:{
        fontSize:16,
        marginVertical:10,
        paddingBottom:7,
        lineHeight:25,
        color:'black',
     },
});

export default styles;