import {View, Text, Image, Button, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {addToCart, removeFromCart} from './action';
import {useDispatch, useSelector} from 'react-redux';

const Product = props => {
  const [isAdded, setAdded] = useState(false);
  const item = props.item;
  const id = props.id;
  const dispatch = useDispatch(item);
  const cartItems = useSelector((state) => state.reducer);
  useEffect(() => {
   let result=cartItems.filter((element)=>{
    return item.name===element.name
   })
    if(result.length){
      setAdded(true)
    }else{
      setAdded(false)
    }
  },[cartItems]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (item )=> {
    dispatch(removeFromCart(item.name));
  };
  return (
    <View key={id}
      style={{
        alignItems: 'center',
        borderBottomColor: 'blue',
        borderBottomWidth: 2,
        padding: 10,
        marginBottom: 50,
      }}>
      <Text>{item.id}</Text>
      <Text>{item.name}</Text>
      <Text>{item.color}</Text>
      <Text>{item.price}</Text>
      <Image style={{width: 100, height: 100}} source={{uri: item.image}} />
      {isAdded ? (
        <Button title="Remove Cart" onPress={() => handleRemoveFromCart(item)} />
      ) : (
        <Button title="Add to Cart" onPress={() => handleAddToCart(item)} />
      )}
    </View>
  );
};

export default Product;
