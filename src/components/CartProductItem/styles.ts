import { StyleSheet } from "react-native";

const styles =StyleSheet.create({
    root:{
       borderWidth:1,
       borderColor:'#d1d1d1',
       borderRadius:10,
       backgroundColor:'#fff',
       marginVertical: 5,
       padding:5,
    },
    row:{
      flexDirection:'row',
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
       color:'black',
    },
    price:{
      color:'black',
       fontSize: 18,
       fontWeight:'bold',
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
    quantityContainer:{
      margin:5,
    },
   
   });

export default styles;
