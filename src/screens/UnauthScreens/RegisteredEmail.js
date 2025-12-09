import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import HeaderWithoutTitle from '../../components/HeaderWithoutTitle/HeaderWithoutTitle';
import { wp, hp } from '../../utils/Functions/Responsive';

const RegisteredEmail = () => {
  const [email, setEmail] = useState('');

  const handleGetOTP = () => {
    console.log('Get OTP for:', email);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderWithoutTitle />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? hp(3) : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            paddingHorizontal: wp(5),
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Text style={styles.title}>Enter Your Registered Email</Text>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              cursorColor={'#8B4513'}
              autoComplete="email"
            />
          </View>

          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleGetOTP}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisteredEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: wp(6),
    fontWeight: '700',
    color: '#8B4513',
    marginBottom: hp(3),
    marginTop: hp(2),
    fontFamily: 'poppins_bold',
  },

  inputContainer: {
    marginBottom: hp(4),
  },

  button: {
    backgroundColor: '#8B4513',
    alignSelf: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(12),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(2),
    elevation: 4, // android shadow
    shadowColor: '#000', // ios shadow
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#8B4513',
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.8),
    fontSize: wp(4),
    color: '#333',
    backgroundColor: '#fff',
  },

  buttonText: {
    color: '#fff',
    fontSize: wp(4),
    fontWeight: '600',
  },
});
