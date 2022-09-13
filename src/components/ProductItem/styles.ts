import { StyleSheet } from "react-native";

const styles =StyleSheet.create({
    root:{
       flexDirection:'row',
       borderWidth:1,
       borderColor:'#d1d1d1',
       borderRadius:10,
       backgroundColor:'#fff',
       marginVertical: 5,
    },
    image:{
       flex: 2,
       height:130,
       borderRadius: 5,
       resizeMode:'contain',
    },
    rightcontainer:{
       padding: 5,
       flex:3,
   
    },
    title:{
       fontSize: 20,
       color:'#000000',
    },
    price:{
       fontSize: 18,
       fontWeight:'bold',
       color:'black',
    },
    oldprice:{
      color:'black',
       fontSize: 14,
       fontWeight: 'normal',
       textDecorationLine:'line-through',
    },
    ratings:{
       flexDirection:'row',
       alignItems:'center',
       marginVertical: 5,
    },
    star:{
       margin:2,
    },
   
   });

export default styles;
