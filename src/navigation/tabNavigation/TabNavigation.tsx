import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import AddModel from '../../components/addModel/AddModel';
import {TABS} from '../../constant/constant';
import {style} from './TabNavigationStyle';
import {TouchableOpacity} from 'react-native';
import { TabItem } from '../../types/types';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: modalVisible ? style.curvedTabBar : style.tabBar,
          tabBarActiveTintColor: '#7F3DFF',
          tabBarInactiveTintColor: '#C6C6C6',
        }}>
        {TABS.map(
          ({id, name, component, icon, headerShown, isAddButton}: TabItem) => (
            <Tab.Screen
              key={id}
              name={name}
              component={component}
              options={{
                tabBarIcon: ({color, size}) =>
                  isAddButton ? (
                    <TouchableOpacity
                      style={style.addButton}
                      onPress={() => setModalVisible(true)}>
                      <Icon
                        name={modalVisible ? 'close' : 'add'}
                        size={28}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  ) : (
                    <Icon name={icon} size={size} color={color} />
                  ),
                tabBarLabel: isAddButton ? () => null : undefined,
                headerShown,
              }}
              listeners={{
                tabPress: e => {
                  if (isAddButton) {
                    e.preventDefault();
                    setModalVisible(true);
                  }
                },
              }}
            />
          ),
        )}
      </Tab.Navigator>
      <AddModel modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
}
