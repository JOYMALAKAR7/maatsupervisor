import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Icon} from 'react-native-elements';
import DeviceInfo from 'react-native-device-info';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import DeviceID from '../components/DeviceID';

const deviceId = DeviceInfo.getDeviceId();
import ModalVehicle from '../components/ModalVehicle';
import {handleVehicleStatus} from '../data/vehicle_status';
const DrawerScreen = props => {
  const [showMenu, setShowMenu] = useState(false);
  const moveToRight = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [myVehicleList, setMyVehicleList] = useState([]);
  const [filteredVehicleList, setFilteredVehicleList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [secondModalVisible, setsecondModalVisible] = useState(null);

  useEffect(() => {
    handleVehicleStatus();
  }, []);
  
  const toggleDrawer = () => {
    if (showMenu) {
      Animated.parallel([
        Animated.timing(moveToRight, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setShowMenu(!showMenu));
    } else {
      setShowMenu(!showMenu);
      Animated.parallel([
        Animated.timing(moveToRight, {
          toValue: 230,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.6,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };
  const performLogout = () => {
    AsyncStorage.clear();
    navigation.navigate('Splash');
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => performLogout()},
      ],
      {cancelable: false},
    );
  };
  const makeApiRequest = async query => {
    try {
      const response = await fetch(
        'http://wbjssk.emri.in:7777/wbit/api/wbemri.php',
        {
          method: 'POST', // Assuming your API uses POST method
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({query}),
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  };

  const handleMyVehicleList = async () => {
    try {
      const username = await AsyncStorage.getItem('username');

      // Modify the query with the obtained username
      const query = `SELECT va.vehicle_no, va.status, mw.eme_id, epm.pm_id, epm.rm_id
      FROM emri.m_vehicle va
      LEFT JOIN wbemri.eme_vehicles mw ON mw.veh_no = va.vehicle_no
      LEFT JOIN wbemri.vcare_eme_pm_rm_rfc epm ON epm.eme_id = mw.eme_id
      WHERE epm.pm_id = '${username}' AND va.is_active = '1' AND va.status IN (1, 2, 3, 4)
      GROUP BY va.vehicle_no ORDER BY STATUS DESC`;

      // Execute the API request using the modified query
      const response = await makeApiRequest(query);

      // Update the state with the My Vehicle List data
      setMyVehicleList(response);
      setFilteredVehicleList(response);
      // Show the modal
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching My Vehicle List:', error);
    }
  };
  const handleFilter = searchQuery => {
    const filteredList = myVehicleList.filter(vehicle => {
      // Customize the filtering logic based on your requirements
      return vehicle.vehicle_no
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    });
    setFilteredVehicleList(filteredList);
  };
 
  const handleSelectedVehiclePress = vehicle => {
    setSelectedVehicle(vehicle);
    setsecondModalVisible(true);
    // Open the second modal or perform any other action you desire
  };

  const SecondModal = ({selectedVehicle}) => {
    return (
      // Your modal content here, access the selected vehicle's properties
      <View
        style={{
          flex: 1,
          borderColor: 'blue',
          borderWidth: 2,
          borderRadius: 20,
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            borderRadius: 20,
          }}>
          <TouchableOpacity onPress={() => setsecondModalVisible(false)}>
            <Text
              style={{
                color: 'white',
                backgroundColor: 'red',
                fontWeight: 'bold',
                fontSize: 20,
                margin: 10,
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 30, color: 'blue', alignSelf: 'center'}}>
          {selectedVehicle}
        </Text>
        {/* ... */}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {/* Menu Design */}
      <View style={{flex: 1, backgroundColor: 'black', borderRadius: 20}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
            paddingLeft: 10,
          }}>
          <View
            style={{
              height: 60,
              width: 60,
              backgroundColor: 'white',
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5 name="user" size={40} color={'#6600ff'} />
          </View>

          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 18, paddingLeft: 20, color: 'white'}}>
              {props.username}
            </Text>
            <Text style={{fontSize: 18, paddingLeft: 20, color: 'white'}}>
              {props.empName || 'Loading...'}
            </Text>
            <Text style={{fontSize: 18, paddingLeft: 20, color: 'white'}}>
              {props.deviceID || 'Loading...'}
            </Text>
            <DeviceID />
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <TouchableOpacity
            style={{
              width: 170,
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="home-outline"
              color="blue"
              size={30}
              style={{padding: 10}}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                margin: 5,
                color: 'blue',
              }}>
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMyVehicleList} // Add the onPress handler for My Vehicle List
            style={{
              width: 170,
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name="ambulance"
              color="red"
              size={30}
              style={{padding: 10}}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                margin: 2,
                color: 'blue',
              }}>
              My Vehicle List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 170,
              height: 50,
              marginTop: 20,
              marginLeft: 20,
              backgroundColor: '#fff',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="exit-outline"
              color="blue"
              size={30}
              style={{padding: 10}}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                margin: 5,
                color: 'blue',
              }}>
              Exit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Home Design */}
      <Animated.View
        style={{
          borderRadius: 20,
          flex: 1,
          backgroundColor: 'blue',
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          transform: [{scale: scale}, {translateX: moveToRight}],
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity style={{marginLeft: 20}} onPress={toggleDrawer}>
            <Ionicons name="menu" color="yellow" size={50} />
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: 16, color: 'white',alignSelf:'center'}}>{props.position}</Text>
            <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: 16, color: 'white'}}>{props.empName || 'Loading...'}
            <Text style={{fontSize: 16, color: 'white'}}> ({props.username})</Text>
            </Text>
            </View>
          
          </View>
          
          <TouchableOpacity style={{marginLeft: 20}} onPress={handleLogout}>
            <AntDesign name="logout" color="yellow" size={50} />
          </TouchableOpacity>
        </View>
        {/* Home Page */}
        <View
          style={{
            backgroundColor: 'white',
            elevation: 2,
            borderRadius: 20,
            flex: 1,
          }}>
          <Button title="Your Visit History" />
          <Button title="Vahicle Status" onPress={handleVehicleStatus} />
        </View>
      </Animated.View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <TextInput
              style={{
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
              }}
              onChangeText={text => {
                setSearchQuery(text);
                handleFilter(text);
              }}
              value={searchQuery}
              placeholder="Search Vehicle"
            />
            <FlatList
              data={filteredVehicleList}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor: '#ccc',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}
                  onPress={() => handleSelectedVehiclePress(item.vehicle_no)}>
                  <Text style={{fontSize: 20, fontWeight: 'bold', padding: 20}}>
                    {index + 1}
                  </Text>
                  <Text style={{fontSize: 20, fontWeight: 'bold', padding: 20}}>
                    {item.vehicle_no}
                  </Text>
                  {item.status == 1 || item.status == 2 ? (
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'green',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      Onroad
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        color: 'red',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}>
                      Offroad
                    </Text>
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={item => item.vehicle_no}
            />
            <TouchableOpacity
              style={{alignSelf: 'flex-end', marginTop: 10}}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: 'blue'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {selectedVehicle && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={secondModalVisible}
          onRequestClose={secondModalVisible}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: '',
                padding: 20,
                borderRadius: 10,
                width: '99%',
                height: '100%',
              }}>
              <SecondModal selectedVehicle={selectedVehicle} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default DrawerScreen;
