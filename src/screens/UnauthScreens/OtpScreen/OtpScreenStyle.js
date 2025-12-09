import { StyleSheet, Platform, StatusBar } from 'react-native';
import { wp, hp } from '../../../utils/Functions/Responsive';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 6 : hp(0.5),
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: hp(4),
  },

  mainContent: {
    paddingHorizontal: wp(6),
    alignItems: 'center',
  },

  illustrationContainer: {
    marginTop: hp(4),
    marginBottom: hp(3),
    width: '100%',
    alignItems: 'center',
  },

  illustration: {
    width: wp(85),
    height: hp(32),
  },

  textContainer: {
    width: '100%',
    marginBottom: hp(3),
  },

  title: {
    fontSize: wp(5.4),
    fontWeight: '700',
    color: '#8B4513',
    lineHeight: wp(7.4),
  },

  subtitle: {
    fontSize: wp(4.4),
    fontWeight: '600',
    color: '#8B4513',
    marginTop: hp(0.8),
  },

  dotsContainer: {
    flexDirection: 'row',
    gap: wp(2),
    marginTop: hp(2),
    marginBottom: hp(4),
  },

  otpText: {
    fontSize: wp(4),
    fontWeight: '400',
    color: 'green',
    marginBottom: hp(2),
  },

  loginButton: {
    width: '83%',
    backgroundColor: '#8B4513',
    paddingVertical: hp(1.8),
    borderRadius: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
    marginBottom: hp(4),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.22,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  loginButtonText: {
    fontSize: wp(4.3),
    color: '#fff',
    fontWeight: '700',
  },
});

export default styles;
