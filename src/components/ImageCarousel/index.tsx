import { View, Image,FlatList,StyleSheet, useWindowDimensions } from 'react-native';
import React, {useState,useCallback} from 'react';

const ImageCarousel = ({images}: {images: string[]}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const windowWidth = useWindowDimensions().width;

    const OnFlatListUpdate =useCallback(({viewableItems}) =>{
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index || 0);
        }
    
    }, []);

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item})=>(
            <Image style={[styles.image, {width: windowWidth - 70}]} source={{ uri : item }} />
        )}
       horizontal
       showsHorizontalScrollIndicator={false}
       snapToInterval={windowWidth - 20}
       snapToAlignment={'center'}
       decelerationRate={'fast'}
       viewabilityConfig={{
         viewAreaCoveragePercentThreshold:50,
       }}
       onViewableItemsChanged={OnFlatListUpdate}
      />
      <View style={styles.dots}>
      {images.map((image, index) => (<View style={[styles.dot,{
        backgroundColor: index === activeIndex ? 'black' : 'white'
      }]}/>))}
      </View>
       

    </View>
  );
};

const styles = StyleSheet.create({
    root:{

    },
    image:{
        margin:20,
        height:130,
        resizeMode:'contain',
    },
    dots:{
        flexDirection:'row',
        justifyContent:'center',
    },
    dot:{
        width:12,
        height:12,
        borderRadius:25,
        borderWidth:1,
        borderColor:'#e3e2de',
        backgroundColor:'black',
        margin:5,
    },
});

export default ImageCarousel;
