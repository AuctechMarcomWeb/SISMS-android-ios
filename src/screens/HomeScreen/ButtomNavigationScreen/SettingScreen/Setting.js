import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Layout from '../../../../components/layout/layout';
import { wp, hp } from '../../../../utils/Functions/Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../../../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchUserDetails } from '../../../../API/authAPI/authAPI';

const Setting = ({ navigation }) => {
  const dispatch = useDispatch();
  const UserDetails = useSelector(state => state?.auth?.user?.user_data);

  const fetchLatestUserDetails = async () => {
    try {
      const savedUserId = await AsyncStorage.getItem('userId');
      console.log("====>",savedUserId)
      if (!savedUserId) return;

      const response = await FetchUserDetails({
        userId: savedUserId,
        offset: 0,
      });

      if (response?.user_data) {
        dispatch(setUser(response));
      }
    } catch (error) {
      console.log("❌ Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchLatestUserDetails();
  }, []);

  const handleMenuPress = async menuItem => {
    if (menuItem === 'Log Out') {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('userId');
        await AsyncStorage.removeItem('isAuthentication');
        dispatch(logout());
      } catch (error) {
        console.log('Logout error', error);
      }
    } else {
      navigation.navigate(menuItem);
    }
  };
  return (
    // <View style={styles.container}>
    <Layout>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      {/* Title Bar */}
      <View style={styles.titleBar}>
        <Text style={styles.titleText}>Setting</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                UserDetails?.photo
                  ? { uri: UserDetails?.photo }
                  : require('../../../../assets/images/male.png')
              } // You'll need to add this image
              style={styles.profileImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Image
                source={require('../../../../assets/images/edit.png')} // You'll need to add this image
                style={styles.editIcon}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{UserDetails?.name}</Text>
          <Text style={styles.profileId}>{UserDetails?.phone}</Text>
        </View>

        {/* Files Section */}
        <View style={styles.filesSection}>
          <View style={styles.titleSection}>
            <Text style={styles.sectionTitle}>
              Total Files -{' '}
              {Number(UserDetails?.selfUpload) +
                Number(UserDetails?.partyUpload)}
            </Text>
          </View>

          <View style={styles.filesRow}>
            <TouchableOpacity
              style={[styles.fileCard, styles.leftCard]}
              onPress={() => handleMenuPress('Upload By Self')}
            >
              <Text style={styles.fileCardTitle}>Upload By Self</Text>
              <Text style={styles.fileCardCount}>
                {UserDetails?.selfUpload} Files
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.fileCard, styles.rightCard]}
              onPress={() => handleMenuPress('Upload By Party')}
            >
              <Text style={styles.fileCardTitle}>Upload By Party</Text>
              <Text style={styles.fileCardCount}>
                {UserDetails?.partyUpload} Files
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('Wallet')}
          >
            <Text style={styles.menuText}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('ContactUs')}
          >
            <Text style={styles.menuText}>Contact us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('TermsConditions')}
          >
            <Text style={styles.menuText}>Terms & Conditions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('PrivacyPolicy')}
          >
            <Text style={styles.menuText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('AboutUs')}
          >
            <Text style={styles.menuText}>About Us</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => handleMenuPress('Log Out')}
          >
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
            <Feather name="log-out" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  logo: {
    width: wp(30),
    height: hp(5),
  },
  titleBar: {
    backgroundColor: '#efe5c2',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
  },
  titleSection: {
    backgroundColor: '#60340f',
    borderBottomColor: '#FFFFFF',
    borderTopColor: '#FFFFFF',
    borderWidth: 0.7,
  },
  titleText: {
    fontFamily: 'poppins_bold',
    fontSize: wp(5.5),
    color: '#727271',
  },
  content: {
    backgroundColor: '#FFFFFF',
    paddingBottom: '10%',
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: hp(7),
    backgroundColor: '#FFFFFF',
  },

  profileImageContainer: {
    position: 'relative',
    marginBottom: hp(2),
  },
  profileImage: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(17.5),
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: wp(2),
  },
  editIcon: {
    height: hp(5),
    width: hp(5),
  },
  profileName: {
    fontSize: wp(5),
    fontWeight: '600',
    color: '#121212',
    marginBottom: hp(0.5),
  },
  profileId: {
    fontSize: wp(3.8),
    color: '#9f9f9f',
  },
  filesSection: {
    paddingVertical: hp(2),
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontFamily: 'poppins_bold',
    color: '#fffdf4',
    textAlign: 'center',
    paddingVertical: hp(1.5),
  },
  filesRow: {
    flexDirection: 'row',
    paddingHorizontal: 0,
  },
  fileCard: {
    flex: 1,
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
    alignItems: 'center',
  },
  leftCard: {
    backgroundColor: '#ceba7d',
  },
  rightCard: {
    backgroundColor: '#efe5c2',
  },
  fileCardTitle: {
    fontSize: wp(3.8),
    fontFamily: 'poppins_bold',
    color: '#593708',
    marginBottom: hp(1),
    textAlign: 'center',
  },
  fileCardCount: {
    fontSize: wp(4),
    fontWeight: '400',
    color: '#593708',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: hp(2),
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2.5),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuText: {
    fontSize: wp(4),
    color: '#6d6d6d',
    fontFamily: 'poppins_extralight',
  },
  logoutItem: {
    marginTop: hp(2),
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#FF6B6B',
    fontWeight: '500',
  },
});