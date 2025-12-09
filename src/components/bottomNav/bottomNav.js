import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './bottomnavStyles';

const tabs = [
  { name: 'Home', icon: 'home-outline', route: 'Home' },
  { name: 'SMS', icon: 'chatbox-ellipses-outline', route: 'SMS' },
  {
    name: 'Notifications',
    icon: 'notifications-outline',
    route: 'Notifications',
  },
  { name: 'Settings', icon: 'settings-outline', route: 'Settings' },
];

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();
  
  const initialIndex = tabs.findIndex(tab => tab.route === route.name);
  const [activeTab, setActiveTab] = useState(initialIndex !== -1 ? initialIndex : 0);

  useEffect(() => {
    const currentIndex = tabs.findIndex(tab => tab.route === route.name);
    if (currentIndex !== -1) {
      setActiveTab(currentIndex);
    }
  }, [route.name]);

  const onTabPress = index => {
    setActiveTab(index);
    navigation.navigate(tabs[index].route);
  };

  // Calculate proper padding for iOS devices
  const bottomPadding = Platform.OS === 'ios' 
    ? Math.max(insets.bottom, 8) 
    : 8;

  return (
    <View
      style={[
        styles.bottomNavContainer,
        {
          paddingBottom: bottomPadding,
        },
      ]}
    >
      <View style={styles.bottomNav}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <TouchableOpacity
              key={tab.route}
              style={styles.tabItem}
              onPress={() => onTabPress(index)}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                <Icon
                  name={tab.icon}
                  size={24}
                  color={isActive ? '#60340f' : '#666'}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive ? '#60340f' : '#666',
                    },
                  ]}
                >
                  {tab.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNav;