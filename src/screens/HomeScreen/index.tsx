import { View, StyleSheet, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem';
import React,{useState,useEffect} from 'react';
import { Product } from '../../models';
import { DataStore } from 'aws-amplify';
//import products from '../../data/products';

const HomeScreen = ({searchValue}: {searchValue: string}) => {
  const [products,setProducts] = useState<Product[]>([]);

  useEffect(()=>{
     DataStore.query(Product).then(setProducts);
  }, []);
  return (
    <View style={styles.page}>
      <FlatList
       data={products}
       renderItem={({item}) => <ProductItem item={item} />}
       showsVerticalScrollIndicator={false}
       />
    </View>
  );
};

const styles =StyleSheet.create({
    page:{
       padding: 7,
    },
});
export default HomeScreen;