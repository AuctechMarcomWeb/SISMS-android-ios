import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styles from './bottomnavStyles';

const { width } = Dimensions.get('window');

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

  const initialIndex = tabs.findIndex(tab => tab.route === route.name) || 0;
  const [activeTab, setActiveTab] = useState(initialIndex);

  useEffect(() => {
    const currentIndex = tabs.findIndex(tab => tab.route === route.name);
    if (currentIndex !== -1) setActiveTab(currentIndex);
  }, [route.name]);

  const onTabPress = index => {
    setActiveTab(index);
    navigation.navigate(tabs[index].route);
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }}>
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom / 2 }]}>
        {tabs.map((tab, index) => {
          const isActive = activeTab === index;
          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => onTabPress(index)}
            >
              <Icon
                name={tab.icon}
                size={26}
                color={isActive ? '#60340f' : '#0f0f0f'}
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color: isActive ? '#60340f' : '#0f0f0f',
                }}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default BottomNav;
