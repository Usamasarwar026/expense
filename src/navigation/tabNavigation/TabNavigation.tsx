import Icon from 'react-native-vector-icons/Ionicons';
import AddModel from '../../components/addModel/AddModel';
import {TABS} from '../../constant/constant';
import {styles} from './TabNavigationStyle';
import {TouchableOpacity} from 'react-native';
import {TabItem} from '../../types/types';
import useTabNavigation from './useTabNavigation';
import {COLORS} from '../../constant/color';

export default function TabNavigation() {
  const {Tab, modalVisible, setModalVisible} = useTabNavigation();

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          tabBarStyle: modalVisible ? styles.curvedTabBar : styles.tabBar,
          tabBarActiveTintColor: COLORS.DARK_PURPLE,
          tabBarInactiveTintColor: COLORS.SILVER_LIGHT_GRAY,
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
                      style={styles.addButton}
                      onPress={() => setModalVisible(true)}>
                      <Icon
                        name={modalVisible ? 'close' : 'add'}
                        size={28}
                        color={COLORS.WHITE}
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
