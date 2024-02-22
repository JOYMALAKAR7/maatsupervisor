import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Users from './Tabs/Users';
import Setting from './Tabs/Setting';


const Main = () => {
  const [name, setName] = useState('');


  useEffect(() => {
    retrieveName();
  }, []);


  const retrieveName = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      if (storedName !== null) {
        setName(storedName);
      }
    } catch (error) {
      // Handle error
    }
  };
const [selectedTab,setSelectedTab]=useState(0);
  return (
    <View style={styles.container}>

    </View>
  );
};


export default Main;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  buttomTab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'blue',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',borderRadius:20
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
  },
});
