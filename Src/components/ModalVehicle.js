import { View, Text ,TouchableOpacity,Button,Modal,StyleSheet} from 'react-native'
import React,{useState} from 'react'

const ModalVehicle = () => {
  const [modalVisible1, setModalVisible1] = useState(true);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);

  const openModal1 = () => {
    setModalVisible1(true);
  };

  const closeModal1 = () => {
    setModalVisible1(false);
  };

  const openModal2 = () => {
    setModalVisible2(true);
  };

  const closeModal2 = () => {
    setModalVisible2(false);
  };

  const openModal3 = () => {
    setModalVisible3(true);
  };

  const closeModal3 = () => {
    setModalVisible3(false);
  };

  return (
    <View style={{ flex: 1 }}>
  
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={closeModal1}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal 1</Text>
            {/* ... your Modal 1 content */}
            <Text>Modal 1 content</Text>
            <TouchableOpacity style={styles.modalButton} onPress={openModal2}>
              <Text style={styles.modalButtonText}>Open Modal 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal1}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal 2 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={closeModal2}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal 2</Text>
            {/* ... your Modal 2 content */}
            <Text>Modal 2 content</Text>
            <TouchableOpacity style={styles.modalButton} onPress={openModal3}>
              <Text style={styles.modalButtonText}>Open Modal 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal2}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal 3 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={closeModal3}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal 3</Text>
            {/* ... your Modal 3 content */}
            <Text>Modal 3 content</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal3}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalVehicle
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});