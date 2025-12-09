import { StyleSheet, Platform } from 'react-native';
import { wp, hp } from '../../../utils/Functions/Responsive';

const styles = StyleSheet.create({

  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: hp(3),
  },

  header: {
    paddingTop: hp(1), 
    paddingHorizontal: wp(4),
    paddingBottom: hp(1),
  },

  logo: {
    width: wp(35),
    height: hp(4),
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
  },

  illustrationContainer: {
    alignItems: 'center',
    marginBottom: hp(2),
    marginTop: hp(1),
  },

  illustration: {
    width: wp(75),
    height: wp(55),
  },

  textContainer: {
    paddingHorizontal: wp(1),
    marginBottom: hp(2),
  },

  title: {
    fontSize: wp(5.5),
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#8B4513',
    textAlign: 'left',
    lineHeight: wp(8),
    marginBottom: hp(0.5),
  },

  subtitle: {
    fontSize: wp(4.5),
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#8B4513',
    textAlign: 'left',
    lineHeight: wp(8),
  },

  inputContainer: {
    marginTop: hp(1),
    marginBottom: hp(2),
  },

  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#8B4513',
    borderRadius: wp(1.9),
    backgroundColor: '#FAFAFA',
    paddingHorizontal: wp(2),
    height: hp(7),
    marginBottom: hp(1.5),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  countryCode: {
    fontSize: wp(4.2),
    color: '#8B4513',
    fontWeight: Platform.OS === 'ios' ? '900' : 'bold',
    marginRight: wp(4),
    marginLeft: wp(3),
  },

  phoneInput: {
    flex: 1,
    fontSize: wp(4.2),
    color: '#333333',
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
    paddingLeft: wp(2),
    paddingVertical: Platform.OS === 'android' ? hp(1.5) : 0,
  },

  lostNumberButton: {
    alignSelf: 'flex-end',
    paddingRight: wp(2),
    paddingVertical: hp(1),
  },

  lostNumberText: {
    color: '#6B46C1',
    fontSize: wp(4),
    fontWeight: Platform.OS === 'ios' ? '500' : 'normal',
    textDecorationLine: 'underline',
  },

  otpButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: wp(10),
    paddingVertical: hp(1.8),
    alignSelf: 'center',
    borderRadius: wp(4),
    marginBottom: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#8B4513',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },

  otpButtonDisabled: {
    backgroundColor: '#A0A0A0',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 1,
      },
    }),
  },

  otpButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4.2),
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});

export default styles;