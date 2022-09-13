import { View, StyleSheet, FlatList, Text,ScrollView, ActivityIndicator} from 'react-native';
import CartProductItem from '../../components/CartProductItem';
import { DataStore,Auth } from 'aws-amplify';
import { Product,CartProduct } from '../../models';
import { useNavigation } from '@react-navigation/native';
import React,{useState,useEffect} from 'react';
import Button from '../../components/Button';

const ShoppingCartScreen = () => {
  
  const[cartProducts,setCartProducts] = useState<CartProduct[]>([]);
  const navigation = useNavigation();
  const fetchCartProducts = async () => {
    const userData =await Auth.currentAuthenticatedUser();
    DataStore.query(CartProduct, cp=> cp.userSub('eq',userData.attributes.sub),).then(setCartProducts);
  };
  useEffect(()=>{
    fetchCartProducts();
  },[]);
  
  useEffect(()=>{
    if (cartProducts.filter(cp=> !cp.product).length === 0) {
      return;
    };
    const fetchProducts= async() =>{
      const products = await Promise.all(
        cartProducts.map(cartProduct =>
        DataStore.query(Product, cartProduct.productID),
          ),
      );
    
    
    setCartProducts(currentCartProducts =>
        currentCartProducts.map(cartProduct => ({
          ...cartProduct,
          product: products.find(p => p.id === cartProduct.productID),
    })),
      );
    };

    fetchProducts();
  }, [cartProducts]);

  useEffect(()=>{
    const subscription = DataStore.observe(CartProduct).subscribe(msg => fetchCartProducts(),);
    return subscription.unsubscribe;
  },[]);

  useEffect(()=>{
   const subscriptions = cartProducts.map(cp =>
    DataStore.observe(CartProduct, cp.id).subscribe(msg =>{
      if (msg.opType === 'UPDATE') {
        setCartProducts(curCartProducts =>
         curCartProducts.map(cp => {
          if(cp.id !== msg.element.id){
            return cp;
          };
          return {
            ...cp,
            ...msg.element,
          };
         }),
        );
      }
   }),
   );
   
   return () =>{
    subscriptions.forEach(sub => sub.unsubscribe());
   };
  }, [cartProducts]);

  const totalPrice = cartProducts.reduce(
    (summedPrice, product) => summedPrice + (product?.product?.price || 0) * product.quantity,0,);
  
  const onCheckout = () => {
    navigation.navigate('Address', {totalPrice});
  };

   if (cartProducts.filter(cp => !cp.product).length !== 0) {
    return <ActivityIndicator />;
   };
  
  return (
    <ScrollView style={{width:'100%'}}>
    <View style={styles.page}>
      <FlatList
       data={cartProducts}
       renderItem={({item}) => <CartProductItem cartItem={item}/>}
       showsVerticalScrollIndicator={false}
       ListHeaderComponent={()=>(
        <View>
            <Text style={{fontSize:18,fontWeight:'800',color:'black'}}>Subtotal ({cartProducts.length}items):{' '} 
            <Text style={{color:'#e47911',fontWeight:'800'}}> ${totalPrice.toFixed(2)}</Text></Text>
            <Button text="Proceed to Checkout" 
            onPress={onCheckout}
            containerStyles={{fontWeight:'bold'}}
            />
        </View>
       )}
       />
    </View>
    </ScrollView>
  );
};

const styles =StyleSheet.create({
    page:{
       padding: 7,
    },
});
export default ShoppingCartScreen;