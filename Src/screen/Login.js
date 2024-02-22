import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RadioButton = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <View style={[styles.radioButtonCircle, selected && styles.radioButtonSelected]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userLevel, setUserLevel] = useState(null);

  useEffect(() => {
    // Check if the user ID is already stored
    retrieveUserName();
  }, []);

  const retrieveUserName = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (username !== null) {
        // User ID is found, navigate to the Home screen
        navigation.navigate('Home', { username });
      }
    } catch (error) {
      console.error('Error retrieving user ID:', error);
    }
  };

  const storeusername = async (username) => {
    try {
      await AsyncStorage.setItem('username', username);
      if(userLevel==8){
        await AsyncStorage.setItem('position', {});
       }
       else if (userLevel==9){
        await AsyncStorage.setItem('position', 'PM');
       }
       else if (userLevel==10){
        await AsyncStorage.setItem('position', 'RM');
       }
    } catch (error) {
      console.error('Error storing user ID:', error);
    }
  };

  const handleLogin = () => {
    // Perform the login request
    fetch('http://wbjssk.emri.in:7777/wbit/api/wbemri.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query:
          "SELECT COUNT(emp_id) FROM acl_maat_userlogin WHERE emp_id='" +
          username +
          "' AND emp_password='" +
          password +
          "' AND vcare_user_level='" +
          userLevel +
          "'",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check the login result
        const count = parseInt(data[0]['COUNT(emp_id)']);

        if (count > 0) {
         
          // Login success
      


          storeusername(username);
          // Navigate to the Home screen with the user ID
          navigation.navigate('Home', { username });
        } else {
          // Login failed
          Alert.alert('Login Failed', 'Invalid username, password, or user level');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ borderRadius: 20, borderColor: 'blue', borderWidth: 2, padding: 20, marginBottom: 20 }}>
        <Text style={styles.radioGroupLabel}>Select User Level:</Text>
        <View style={styles.radioGroup}>
          <RadioButton
            label="EME"
            value={8}
            selected={userLevel === 8}
            onPress={() => setUserLevel(8) }
          />
          <RadioButton
            label="PM"
            value={9}
            selected={userLevel === 9}
            onPress={() => setUserLevel(9)}
          />
          <RadioButton
            label="RM"
            value={10}
            selected={userLevel === 10}
            onPress={() => setUserLevel(10)}
          />
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioGroupLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#000',
  },
  radioButtonLabel: {
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default Login;
