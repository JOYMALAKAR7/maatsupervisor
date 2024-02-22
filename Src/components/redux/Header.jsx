import { View,StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const cartDta=useSelector((state)=>state.reducer)
  const [cartItem,setCartItem]=useState(0)
  useEffect(()=>{
setCartItem(cartDta.length)

  },[cartDta])

  return (
    <View>
      <Text
        style={{
          fontSize: 32,
          textAlign: 'right',
          backgroundColor: 'blue',
          padding: 5,
          color: 'yellow',
        }}><View style={{backgroundColor:'white',borderRadius:15,height:40,width:40,elevation:20}}>
          <Text style={{fontSize:30,color:'red',textAlign:'center',alignSelf:'center'}}>{cartItem}</Text>
        </View>
       
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Header