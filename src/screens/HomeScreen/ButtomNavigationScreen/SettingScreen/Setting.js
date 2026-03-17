import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Layout from '../../../../components/layout/layout';
import { wp, hp } from '../../../../utils/Functions/Responsive';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from '../../../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FetchUserDetails, DeleteSMSUser } from '../../../../API/authAPI/authAPI';

const Setting = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchLatestUserDetails = async () => {
    try {
      setIsLoading(true);
      const savedUserId = await AsyncStorage.getItem('userId');
      console.log("Fetching user details for ID:", savedUserId);
      
      if (!savedUserId) {
        setIsLoading(false);
        return;
      }

      const response = await FetchUserDetails({
        userId: savedUserId,
        offset: 0,
      });
console.log("===>",response)
      if (response?.data?.user_data) {
        dispatch(setUser(response));
      }
    } catch (error) {
      console.log("Error fetching user details:", error);
      // Don't show error alert on initial load, just log it
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch user details when screen comes into focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchLatestUserDetails();
    });

    return unsubscribe;
  }, [navigation]);

  const UserDetails = useSelector(state => state?.auth?.user?.data?.user_data);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setIsDeleting(true);
              const savedUserId = await AsyncStorage.getItem('userId');
              
              if (!savedUserId) {
                Alert.alert("Error", "User ID not found. Please try logging in again.");
                setIsDeleting(false);
                return;
              }

              // Call the delete API
              const response = await DeleteSMSUser(savedUserId);
              
              if (response) {
                // Clear all stored data
                await AsyncStorage.multiRemove(['token', 'userId', 'isAuthentication']);
                
                // Logout user
                dispatch(logout());
                
                // Show success message
                Alert.alert(
                  "Account Deleted",
                  "Your account has been successfully deleted.",
                  [
                    { 
                      text: "OK",
                      onPress: () => {
                        // Navigate to login or home screen
                        navigation.reset({
                          index: 0,
                          routes: [{ name: 'Login' }], // Adjust route name as needed
                        });
                      }
                    }
                  ]
                );
              } else {
                throw new Error("Delete request failed");
              }
            } catch (error) {
              console.log('Delete account error:', error);
              Alert.alert(
                "Error",
                "Failed to delete account. Please try again later.",
                [{ text: "OK" }]
              );
            } finally {
              setIsDeleting(false);
            }
          }
        }
      ]
    );
  };

  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              // Clear all auth data
              await AsyncStorage.multiRemove(['token', 'userId', 'isAuthentication']);
              
              // Dispatch logout action
              dispatch(logout());
              
              // Optional: Navigate to login screen
              // navigation.reset({
              //   index: 0,
              //   routes: [{ name: 'Login' }],
              // });
            } catch (error) {
              console.log('Logout error:', error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            } finally {
              setIsLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleMenuPress = async menuItem => {
    if (menuItem === 'Log Out') {
      handleLogout();
    } else if (menuItem === 'Delete Account') {
      handleDeleteAccount();
    } else {
      navigation.navigate(menuItem);
    }
  };

  // Loading state
  if (isLoading && !UserDetails) {
    return (
      <Layout>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#60340f" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
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
        <Text style={styles.titleText}>Settings</Text>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        bounces={true}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={
                UserDetails?.photo
                  ? { uri: UserDetails.photo }
                  : require('../../../../assets/images/male.png')
              }
              style={styles.profileImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.editIconContainer}
              onPress={() => navigation.navigate('ProfileScreen')}
              activeOpacity={0.7}
              accessible={true}
              accessibilityLabel="Edit profile"
              accessibilityHint="Navigate to profile edit screen"
            >
              <Image
                source={require('../../../../assets/images/edit.png')}
                style={styles.editIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName} numberOfLines={1}>
            {UserDetails?.name || 'User Name'}
          </Text>
          <Text style={styles.profileId} numberOfLines={1}>
            {UserDetails?.phone || 'Phone Number'}
          </Text>
        </View>

        {/* Files Section */}
        <View style={styles.filesSection}>
          <View style={styles.titleSection}>
            <Text style={styles.sectionTitle}>
              Total Files - {' '}
              {(Number(UserDetails?.selfUpload) || 0) +
                (Number(UserDetails?.partyUpload) || 0)}
            </Text>
          </View>

          <View style={styles.filesRow}>
            <TouchableOpacity
              style={[styles.fileCard, styles.leftCard]}
              onPress={() => handleMenuPress('Upload By Self')}
              activeOpacity={0.7}
              accessible={true}
              accessibilityLabel={`Upload by self, ${UserDetails?.selfUpload || 0} files`}
            >
              <Text style={styles.fileCardTitle}>Upload By Self</Text>
              <Text style={styles.fileCardCount}>
                {UserDetails?.selfUpload || 0} Files
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.fileCard, styles.rightCard]}
              onPress={() => handleMenuPress('Upload By Party')}
              activeOpacity={0.7}
              accessible={true}
              accessibilityLabel={`Upload by party, ${UserDetails?.partyUpload || 0} files`}
            >
              <Text style={styles.fileCardTitle}>Upload By Party</Text>
              <Text style={styles.fileCardCount}>
                {UserDetails?.partyUpload || 0} Files
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('ContactUs')}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel="Contact us"
          >
            <Text style={styles.menuText}>Contact Us</Text>
            <Feather name="chevron-right" size={20} color="#9f9f9f" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('TermsConditions')}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel="Terms and Conditions"
          >
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Feather name="chevron-right" size={20} color="#9f9f9f" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('PrivacyPolicy')}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel="Privacy Policy"
          >
            <Text style={styles.menuText}>Privacy Policy</Text>
            <Feather name="chevron-right" size={20} color="#9f9f9f" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleMenuPress('AboutUs')}
            activeOpacity={0.7}
            accessible={true}
            accessibilityLabel="About Us"
          >
            <Text style={styles.menuText}>About Us</Text>
            <Feather name="chevron-right" size={20} color="#9f9f9f" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => handleMenuPress('Log Out')}
            activeOpacity={0.7}
            disabled={isLoading}
            accessible={true}
            accessibilityLabel="Log out"
          >
            <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
            <Feather name="log-out" size={20} color="#FF6B6B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.deleteAccountItem]}
            onPress={() => handleMenuPress('Delete Account')}
            activeOpacity={0.7}
            disabled={isDeleting}
            accessible={true}
            accessibilityLabel="Delete account"
          >
            <View style={styles.deleteAccountContent}>
              <Text style={[styles.menuText, styles.deleteAccountText]}>
                Delete Account
              </Text>
              {isDeleting ? (
                <ActivityIndicator size="small" color="#D32F2F" />
              ) : (
                <Feather name="trash-2" size={20} color="#D32F2F" />
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Safe area bottom spacing */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Layout>
  );
};

export default Setting;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: wp(4),
    color: '#60340f',
    fontFamily: 'poppins_regular',
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
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? hp(12) : hp(10),
  },
  profileSection: {
    alignItems: 'center',
    paddingTop: hp(4),
    paddingBottom: hp(2),
    backgroundColor: '#FFFFFF',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: hp(1),
  },
  profileImage: {
    width: wp(35),
    height: wp(35),
    borderRadius: wp(17.5),
    borderWidth: 3,
    borderColor: '#efe5c2',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: wp(10),
    padding: wp(1.5),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  editIcon: {
    height: hp(4),
    width: hp(4),
  },
  profileName: {
    fontSize: wp(5),
    fontWeight: '600',
    color: '#121212',
    marginBottom: hp(0.5),
    fontFamily: Platform.OS === 'ios' ? 'System' : 'poppins_semibold',
  },
  profileId: {
    fontSize: wp(3.8),
    color: '#9f9f9f',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'poppins_regular',
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
  },
  fileCard: {
    flex: 1,
    paddingVertical: hp(3),
    paddingHorizontal: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: Platform.OS === 'ios' ? 'System' : 'poppins_regular',
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
    minHeight: hp(6),
  },
  menuText: {
    fontSize: wp(4),
    color: '#6d6d6d',
    fontFamily: 'poppins_regular',
  },
  logoutItem: {
    marginTop: hp(2),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
  },
  logoutText: {
    color: '#FF6B6B',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'poppins_medium',
  },
  deleteAccountItem: {
    borderBottomWidth: 0,
    marginBottom: hp(2),
  },
  deleteAccountContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  deleteAccountText: {
    color: '#D32F2F',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'poppins_medium',
  },
  bottomSpacer: {
    height: Platform.OS === 'ios' ? hp(5) : hp(3),
  },
});