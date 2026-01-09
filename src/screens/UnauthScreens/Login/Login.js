import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
  FlatList,
} from 'react-native';
import React, { useState, useRef } from 'react';
import styles from './LoginStyle';
import { LoginAPI } from '../../../API/unauthAPI/unauthAPI';
import ScreenWrapper from '../../../components/safeAreaViewWrapper/ScreenWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/slices/authSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { setUserId, setUser } from '../../../redux/slices/authSlice';

// Country codes data
const COUNTRY_CODES = [
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦', minLength: 9, maxLength: 9 },
  { code: '+971', country: 'UAE', flag: '🇦🇪', minLength: 9, maxLength: 9 },
  { code: '+91', country: 'India', flag: '🇮🇳', minLength: 10, maxLength: 10 },
  { code: '+1', country: 'USA', flag: '🇺🇸', minLength: 10, maxLength: 10 },
  { code: '+44', country: 'UK', flag: '🇬🇧', minLength: 10, maxLength: 10 },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰', minLength: 10, maxLength: 10 },
  { code: '+20', country: 'Egypt', flag: '🇪🇬', minLength: 10, maxLength: 10 },
  { code: '+962', country: 'Jordan', flag: '🇯🇴', minLength: 9, maxLength: 9 },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼', minLength: 8, maxLength: 8 },
  { code: '+968', country: 'Oman', flag: '🇴🇲', minLength: 8, maxLength: 8 },
];

const Login = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(COUNTRY_CODES[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const phoneInputRef = useRef(null);
  const dispatch = useDispatch();

  // Format phone number with spaces for better readability
  const formatPhoneNumber = (text) => {
    const numbers = text.replace(/[^0-9]/g, '');
    
    // Format based on country
    if (selectedCountryCode.code === '+91' || selectedCountryCode.code === '+1') {
      // Format: XXX XXX XXXX
      if (numbers.length <= 3) return numbers;
      if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`;
    } else if (selectedCountryCode.code === '+966' || selectedCountryCode.code === '+971') {
      // Format: XX XXX XXXX
      if (numbers.length <= 2) return numbers;
      if (numbers.length <= 5) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`;
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 5)} ${numbers.slice(5, 9)}`;
    }
    
    // Default formatting for other countries
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6)}`;
  };

  const handlePhoneChange = (text) => {
    const numbers = text.replace(/[^0-9]/g, '');
    const maxLength = selectedCountryCode.maxLength || 15;
    
    if (numbers.length <= maxLength) {
      setMobileNumber(formatPhoneNumber(numbers));
    }
  };

  const getCleanPhoneNumber = () => {
    return mobileNumber.replace(/\s/g, '');
  };

  const isValidPhoneNumber = () => {
    const cleanNumber = getCleanPhoneNumber();
    const minLength = selectedCountryCode.minLength || 8;
    const maxLength = selectedCountryCode.maxLength || 15;
    return cleanNumber.length >= minLength && cleanNumber.length <= maxLength;
  };

  const handleGetOTP = async () => {
    const cleanNumber = getCleanPhoneNumber();
    console.log('📞 Entered Phone =>', selectedCountryCode.code + cleanNumber);

    if (!cleanNumber.trim()) {
      Alert.alert('Error', 'Please enter your mobile number');
      return;
    }

    if (!isValidPhoneNumber()) {
      const minLength = selectedCountryCode.minLength || 8;
      Alert.alert('Error', `Please enter a valid ${selectedCountryCode.country} mobile number (${minLength} digits)`);
      return;
    }

    setIsLoading(true);

    try {
      const fullPhone = selectedCountryCode.code + cleanNumber;
      const response = await LoginAPI({ phone: fullPhone });

      console.log('📦 API Raw Response =>', response?.data);

      const userId = response?.data?.id;
      const otp = response?.data?.otp;

      console.log('🆔 Extracted userId =>', userId);
      console.log('🔐 OTP Received =>', otp);

      await AsyncStorage.setItem('userId', String(userId));

      console.log('📍 Saved to AsyncStorage =>', String(userId));

      dispatch(setUserId(userId));
      dispatch(setUser({ phone: fullPhone, id: userId }));

      console.log('🟢 Redux Updated =>', {
        userId,
        user: { phone: fullPhone, id: userId },
      });

      setIsLoading(false);

      if (otp) {
        navigation.navigate('OtpScreen', {
          otpsend: otp,
          phone: fullPhone,
        });
      }

      Alert.alert('Success', `OTP sent to ${fullPhone}`);
    } catch (error) {
      console.log('❌ Error occurred while login =>', error);
      setIsLoading(false);
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
    }
  };

  const selectCountryCode = (item) => {
    setSelectedCountryCode(item);
    setModalVisible(false);
    setMobileNumber(''); // Clear input when changing country
    // Auto-focus the input after selecting country
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 300);
  };

  const getPlaceholder = () => {
    if (selectedCountryCode.code === '+91' || selectedCountryCode.code === '+1') {
      return 'XXX XXX XXXX';
    } else if (selectedCountryCode.code === '+966' || selectedCountryCode.code === '+971') {
      return 'XX XXX XXXX';
    }
    return 'Enter mobile number';
  };

  return (
    <ScreenWrapper>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.header}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.mainContent}>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('../../../assets/images/login_img.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>Get organised. Make life easier.</Text>
              <Text style={styles.subtitle}>Never lose your Documents.</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              
              <View style={[
                styles.phoneInputContainer,
                isFocused && styles.phoneInputContainerFocused,
                !isValidPhoneNumber() && getCleanPhoneNumber().length > 0 && styles.phoneInputContainerError
              ]}>
                {/* Country Code Dropdown */}
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  onPress={() => setModalVisible(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryFlag}>{selectedCountryCode.flag}</Text>
                  <Text style={styles.countryCode}>{selectedCountryCode.code}</Text>
                  <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>

                <View style={styles.separator} />

                <TextInput
                  ref={phoneInputRef}
                  style={styles.phoneInput}
                  placeholder={getPlaceholder()}
                  placeholderTextColor="#AAA"
                  cursorColor={'#8B4513'}
                  value={mobileNumber}
                  onChangeText={handlePhoneChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  keyboardType="number-pad"
                  inputMode="numeric"
                  returnKeyType="done"
                  onSubmitEditing={handleGetOTP}
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                />

                {/* Clear button */}
                {mobileNumber.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={() => setMobileNumber('')}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.clearButtonText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Helper text */}
              {getCleanPhoneNumber().length > 0 && (
                <Text style={[
                  styles.helperText,
                  isValidPhoneNumber() ? styles.helperTextSuccess : styles.helperTextError
                ]}>
                  {isValidPhoneNumber() 
                    ? `✓ Valid ${selectedCountryCode.country} number` 
                    : `Enter ${selectedCountryCode.minLength || 8} digits for ${selectedCountryCode.country}`
                  }
                </Text>
              )}
            </View>

            <TouchableOpacity
              style={[
                styles.otpButton,
                (isLoading || !isValidPhoneNumber()) && styles.otpButtonDisabled
              ]}
              onPress={handleGetOTP}
              disabled={isLoading || !isValidPhoneNumber()}
              activeOpacity={0.8}
            >
              <Text style={styles.otpButtonText}>
                {isLoading ? 'Sending OTP...' : 'Get OTP'}
              </Text>
            </TouchableOpacity>

            {/* Additional help text */}
            <Text style={styles.privacyText}>
              We'll send you a one-time password to verify your number
            </Text>
          </View>
        </ScrollView>

        {/* Country Code Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity 
                  onPress={() => setModalVisible(false)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={COUNTRY_CODES}
                keyExtractor={(item) => item.code}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.countryItem,
                      selectedCountryCode.code === item.code && styles.selectedCountryItem
                    ]}
                    onPress={() => selectCountryCode(item)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.countryItemFlag}>{item.flag}</Text>
                    <View style={styles.countryItemTextContainer}>
                      <Text style={styles.countryItemName}>{item.country}</Text>
                      <Text style={styles.countryItemCode}>{item.code}</Text>
                    </View>
                    {selectedCountryCode.code === item.code && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default Login;