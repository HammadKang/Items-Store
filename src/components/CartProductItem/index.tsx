import {View, Image, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import QuantitySelector from '../QuantitySelector';
import { DataStore } from 'aws-amplify';
import { CartProduct } from '../../models';
import styles from './styles';
import React from 'react';


interface CartProductItemProps{
  cartItem: CartProduct;
}

const CartProductItem = ({cartItem}: CartProductItemProps) => {
  const{ product , ...cartProduct } = cartItem;
  
  const updateQuantity = async (newQuantity: number) =>{
    const original =await DataStore.query(CartProduct,cartProduct.id);

    await DataStore.save(
      CartProduct.copyOf(original, updated =>{
        updated.quantity = newQuantity;
      }),
    );
  };
  
  
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri : product.image}} />
      <View style={styles.rightcontainer}>
        <Text style={styles.title} numberOfLines={3}>{product.title}</Text>
        <View style={styles.ratings}>
            {[0,0,0,0,0].map((el,i) =>
            <FontAwesome 
            key={`${product.id}-${i}`}
            style={styles.star} 
            name={i < Math.floor(product.avgRating) ? 'star' : 'star-o'}
             size={18} color={'#e47911'} />)
            }
            <Text style={{color:'black',fontSize:14}}>{product.ratings}</Text>
        </View>
        <Text style={styles.price}>From ${product.price}
        { product.oldPrice && (<Text style={styles.oldprice}> ${product.oldPrice}</Text>)}
        </Text>
      </View>
      </View>
      <View style={styles.quantityContainer}>
      <QuantitySelector quantity={cartProduct.quantity} setQuantity={updateQuantity}/>
      </View>
      
    </View>
    
  );
};

export default CartProductItem;