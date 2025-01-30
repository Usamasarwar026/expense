import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icons

export default function AddTransactionButton() {
  const [modalVisible, setModalVisible] = useState(false);
  const icon1Position = useRef(new Animated.Value(0)).current;
  const icon2Position = useRef(new Animated.Value(0)).current;

  // Open Menu with Animation
  const openMenu = () => {
    setModalVisible(true);
    Animated.stagger(100, [
      Animated.spring(icon1Position, { toValue: -60, useNativeDriver: true }),
      Animated.spring(icon2Position, { toValue: -120, useNativeDriver: true }),
    ]).start();
  };

  // Close Menu with Animation
  const closeMenu = () => {
    Animated.stagger(100, [
      Animated.spring(icon2Position, { toValue: 0, useNativeDriver: true }),
      Animated.spring(icon1Position, { toValue: 0, useNativeDriver: true }),
    ]).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      {/* Modal Overlay (Dimming Background) */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={closeMenu}
      >
        <TouchableOpacity style={styles.overlay} onPress={closeMenu} />
        <View style={styles.floatingMenu}>
          {/* Transaction Icon */}
          <Animated.View style={[styles.iconWrapper, { transform: [{ translateY: icon1Position }] }]}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="cash-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          {/* Budget Icon */}
          <Animated.View style={[styles.iconWrapper, { transform: [{ translateY: icon2Position }] }]}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="wallet-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* Add Button in Bottom Tab */}
      <TouchableOpacity style={styles.addButton} onPress={openMenu}>
        <Icon name="add" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// **STYLES**
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF6F61',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For shadow effect
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', // Dim background effect
  },
});

