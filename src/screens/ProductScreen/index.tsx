import { Text,ScrollView, ActivityIndicator, View } from 'react-native';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import { DataStore,Auth } from 'aws-amplify';
import { Product,CartProduct } from '../../models';
import { useRoute,useNavigation } from '@react-navigation/native';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import React, {useState,useEffect} from 'react';

const ProductScreen = () => {
  
    const [product,setProduct] = useState<Product | undefined>(undefined);
    const [selectedOption,setSelectedOption] = useState<string | undefined>(undefined,);
    const [quantity,setQuantity] = useState(1);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(()=>{
      if (!route.params?.id) {
        return;
      }
      DataStore.query(Product, route.params.id).then(setProduct);
    }, [route.params?.id]);
   
    useEffect(()=>{
      if (product?.options) {
        setSelectedOption(product.options[0]);
      }
    },[product]);

    const onAddtoCart= async () => {
      const userData = await Auth.currentAuthenticatedUser();
       
      if (!product || !userData) {
        return;
      }

      const newCartProduct = new CartProduct({
        userSub: userData.attributes.sub,
        quantity,
        option: selectedOption,
        productID: product.id,
      });
     
      await DataStore.save(newCartProduct);
     navigation.navigate('shoppingCart');
    };

    if (!product) {
      return <ActivityIndicator />;
    };

  return (
    <ScrollView style={styles.root}>
    <Text style={styles.title}>{product.title}</Text>


    <ImageCarousel images ={product.images} />
     <Text></Text>
    <View style={{backgroundColor:'#e6a607'}}>
    <Picker
      selectedValue={selectedOption}
      onValueChange={itemValue => setSelectedOption(itemValue)}>
        {product.options.map(option =>(<Picker.Item label={option} value={option} color="white"/>))}
    </Picker> 
    </View>








    <Text style={styles.price}>From ${product.price.toFixed(2)}
     { product.oldPrice && (<Text style={styles.oldprice}> ${product.oldPrice.toFixed(2)}</Text>)}
    </Text>


    <Text style={styles.description}>{product.description}</Text>
    <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
     <Text></Text>
    <Button text={'Add To Cart'} onPress={onAddtoCart} />
    <Button text={'Buy Now'} onPress={onAddtoCart} />

    </ScrollView>
  );
};

export default ProductScreen;