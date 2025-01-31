import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Budget from '../screens/budget/Budget';
import TransctionScreen from '../screens/transctionscreen/TransctionScreen';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import AddModel from '../components/addModel/AddModel';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: modalVisible ? styles.curvedTabBar : styles.tabBar,
          tabBarActiveTintColor: '#7F3DFF',
          tabBarInactiveTintColor: '#C6C6C6',
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="TransctionScreen"
          component={TransctionScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="list" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddModel} // Replace with the desired component for adding
          options={{
            tabBarLabel: () => null,
            tabBarIcon: () => (
              <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Icon name={modalVisible ? 'close' : 'add'} size={28} color="#fff" />
              </TouchableOpacity>
            ),
          }}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              setModalVisible(true);
            },
          }}
        />
        <Tab.Screen
          name="Budget"
          component={Budget}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon
                name="pie-chart"
                size={size}
                color={color}
                style={styles.rotatedIcon}
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="person" size={size} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
      <AddModel modalVisible={modalVisible} setModalVisible={setModalVisible}/>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  curvedTabBar: {
    position: 'absolute',
    height: 60, // Increased height for the curve
    backgroundColor: '#fff',
    borderTopLeftRadius: 30, // Curved effect
    borderTopRightRadius: 30, // Curved effect
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  addButton: {
    width: 55,
    height: 55,
    backgroundColor: '#7F3DFF',
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  addButtonImage: {
    width: 57, // Adjust size as needed
    height: 57, // Adjust size as needed
    resizeMode: 'contain',
  },
  rotatedIcon: {
    transform: [{rotate: '105deg'}], // Rotate the icon by 90 degrees
  },
});
