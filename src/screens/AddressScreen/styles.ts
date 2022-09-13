import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root:{
        padding:12,
        backgroundColor:'white',
        height:'100%',
    },
    choose:{
        marginTop:10,
        fontSize:20,
        fontWeight:'bold',
        color:'black',
    },
    label:{
        fontSize:19,
        fontWeight:'600',
        color:'black',
    },
    input:{
        color:'black',
        fontSize:15,
        backgroundColor:'white',
        fontWeight:'normal',
        elevation:10,
        padding:5,
        margin:5,
        borderRadius:3,
        height:40,
        borderBottomWidth:2,
        borderRightWidth:2,
        borderColor:'#e6a607',
    },
    text:{

    },
    row:{
        marginVertical:3,
    },
    error:{
        color:'red',
    },
});

export default styles;