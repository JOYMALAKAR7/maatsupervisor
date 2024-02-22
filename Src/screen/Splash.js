import {View, Text, StyleSheet,Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000);
  },[]);
  const checkLogin=async()=>{
    const username=await AsyncStorage.getItem('username');
if(username !==null)
{
  navigation.navigate('Home');
}
else{
  navigation.navigate('Login');


}


  }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>GHS MAAT</Text>
      {/* <Image source={require('../images/ghslogo.jpg')} style={{width:'auto',height:70}} /> */}
    </View>
  );
};


export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6600ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    color: 'white',
  },
});
