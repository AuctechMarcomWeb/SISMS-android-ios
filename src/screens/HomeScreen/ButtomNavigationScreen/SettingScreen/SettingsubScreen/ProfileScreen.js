import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { FetchUserDetails, UpdateUserDetails } from '../../../../../API/authAPI/authAPI';
import { setUser, setUserId } from '../../../../../redux/slices/authSlice';
import ScreenWrapper from '../../../../../components/safeAreaViewWrapper/ScreenWrapper';
import { hp, wp } from '../../../../../utils/Functions/Responsive';
const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const UserDetails = useSelector(state => state?.auth?.user?.user_data);
  console.log('===userDetails', UserDetails);
  const [phone] = useState(UserDetails?.phone);
  const [photo, setPhoto] = useState(UserDetails?.photo || null);
  const [name, setName] = useState(UserDetails?.name);
  const [email, setEmail] = useState(UserDetails?.email);
  const [gender, setGender] = useState(UserDetails?.gender);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const handleImagePicker = () => {
    Alert.alert('Upload Photo', 'Choose an option', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.assets) setPhoto(response.assets[0]);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.assets) setPhoto(response.assets[0]);
    });
  };

  const updateProfile = async () => {
    if (!name?.trim()) {
      Alert.alert('Warning', 'Please enter your name');
      return;
    }

    if (!email?.trim()) {
      Alert.alert('Warning', 'Please enter your email');
      return;
    }

    if (!gender) {
      Alert.alert('Warning', 'Please select gender');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('user_id', String(UserDetails?.id));
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('gender', gender);

      if (photo && photo.uri) {
        formData.append('photo', {
          uri:
            Platform.OS === 'android'
              ? photo.uri
              : photo.uri.replace('file://', ''),
          type: photo.type || 'image/jpeg',
          name: photo.fileName || 'profile.jpg',
        });
      }

      const response = await UpdateUserDetails(formData);

      if (response?.status === 200 && response.data?.status === 200) {
        dispatch(setUser({ user_data: response.data.data }));
        Alert.alert('Success', 'Profile updated successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', response.data?.message || 'Something went wrong');
      }
    } catch (error) {
      console.log('❌ Error updating profile =>', error);
      Alert.alert('Failed', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGender = value => {
    setGender(value);
    setDropdownVisible(false); // close dropdown
  };

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../../../../../assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.profileImageContainer}>
          <Image
            source={
              photo
                ? { uri: photo.uri || photo }
                : require('../../../../../assets/images/logo.png')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={handleImagePicker}>
            <Icon name="edit" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Phone number */}
        {/* <TouchableOpacity
          style={styles.inputContainer}
          onPress={() =>
            navigation.navigate('VerifyMobileNumber', {
              phone: UserDetails?.phone,
            })
          }
        >
          <Text style={styles.inputText}>{phone}</Text>
          <Icon name="edit" size={20} color="#CDA15B" />
        </TouchableOpacity> */}

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>{phone}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('VerifyMobileNumber', { phone })}
          >
            {/* <Icon name="edit" size={20} color="#CDA15B"/> */}
          </TouchableOpacity>
        </View>

        {/* Name */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
        </View>

        {/* Gender - Custom Dropdown */}
        <View style={{ width: '100%', marginVertical: 10 }}>
          <TouchableOpacity
            style={styles.inputContainer}
            onPress={() => setDropdownVisible(!dropdownVisible)}
          >
            <Text style={styles.inputText}>
              {genders.find(g => g.value === gender)?.label || 'Select Gender'}
            </Text>
            <Icon
              name={dropdownVisible ? 'arrow-drop-up' : 'arrow-drop-down'}
              size={24}
              color="#000"
            />
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              {genders.map(item => (
                <TouchableOpacity
                  key={item.value}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectGender(item.value)}
                >
                  <Text style={styles.dropdownText}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.updateButton,
            { opacity: name && email && gender ? 1 : 0.6 },
          ]}
          disabled={!name || !email || !gender}
          onPress={updateProfile}
        >
          <Text style={styles.updateText}>Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    // flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  editImg: {
    height: hp(5),
    width: hp(5),
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: wp(2),
    // borderRadius: 20,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 5,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  updateButton: {
    backgroundColor: '#6B3E26',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  updateText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
