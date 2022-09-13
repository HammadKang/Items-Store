import {View, Image, Text, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import React from 'react';


interface ProductItemProps{
    item: {
        id: string;
        title: string;
        image: string;
        avgRating: number;
        ratings: number;
        price: number;
        oldPrice?: number;
    };
}


const ProductItem = ({item}: ProductItemProps) => {
  const navigation = useNavigation(); 

  const onPress = () =>{
     navigation.navigate('ProductDetails', {id: item.id});
  };

  return (
    <Pressable onPress={onPress} style={styles.root}>
        <Image style={styles.image} source={{ uri : item.image}} />
      <View style={styles.rightcontainer}>
        <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
        <View style={styles.ratings}>
            {[0,0,0,0,0].map((el,i) =>
            <FontAwesome 
            key={`${item.id}-${i}`}
            style={styles.star} 
            name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
             size={18} color={'#e47911'} />)
            }
            <Text style={{color:'black',fontSize:14}}>{item.ratings}</Text>
        </View>
        <Text style={styles.price}>From ${item.price.toFixed(2)}
        { item.oldPrice && (<Text style={styles.oldprice}> ${item.oldPrice.toFixed(2)}</Text>)}
        </Text>
      
      </View>
      </Pressable>
  );
};

export default ProductItem;