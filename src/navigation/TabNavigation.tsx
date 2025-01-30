import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Budget from '../screens/budget/Budget';
import TransctionScreen from '../screens/transctionscreen/TransctionScreen';
import Home from '../screens/home/Home';
import Profile from '../screens/profile/Profile';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
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
        component={TransctionScreen} // Replace with the desired component for adding
        options={{
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <TouchableOpacity style={styles.addButton}>
              <Icon name="add" size={28} color="#fff" />
            </TouchableOpacity>
          ),
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            console.log('Add button pressed');
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
