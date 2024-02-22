import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerScreen from '../drawer/DrawerScreen';
import DeviceInfo from 'react-native-device-info';
const Home = () => {
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState();
  useEffect(() => {
    retrieveUserData();
    
  }, []);

  const updateAppVersion = async (username) => {
    try {
      const version = await DeviceInfo.getVersion();
      const deviceId = await DeviceInfo.getDeviceId();
      const response = await fetch('http://wbjssk.emri.in:7777/wbit/api/wbemri.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `UPDATE acl_maat_userlogin SET app_version='${version}' WHERE emp_id='${username}'`,
        }),
      });
  
      if (response.status==200) {
        // Success: The update was successful
       
        console.log('App version updated successfully.');
      } else {
        // Failure: The update failed
        console.error('Error updating app version.');
        console.log(response)
      
      }
    } catch (error) {
      // Exception: An error occurred while updating
      console.error('Error updating app version:', error);
     
    }
  };
  
  
  const retrieveUserData = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const position =  await AsyncStorage.getItem('position');
      setUserId(username);
setPosition(position);
      if (username !== null) {
        fetchUserData(username);
        // updateAppVersion(username);   
      }
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  };

  const fetchUserData = (username) => {
    fetch('http://wbjssk.emri.in:7777/wbit/api/wbemri.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `SELECT emp_name, emp_password, is_active_apps, device_id FROM acl_maat_userlogin WHERE emp_id=${username}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setUserData(data[0]);
        }
        setLoading(false); // Set loading to false after fetching the data
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false if an error occurs
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (

      <DrawerScreen data={userData} deviceID={userData.device_id} position={position}  username={userId} empName={userData?.emp_name} />
 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
