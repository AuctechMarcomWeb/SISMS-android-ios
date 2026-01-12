import { StyleSheet, Platform } from 'react-native';
import { wp, hp } from '../../../utils/Functions/Responsive';

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: hp(4),
  },

  header: {
    paddingTop: hp(2),
    paddingHorizontal: wp(5),
    paddingBottom: hp(1),
  },

  logo: {
    width: wp(38),
    height: hp(4.5),
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
  },

  illustrationContainer: {
    alignItems: 'center',
    marginBottom: hp(2.5),
  },

  illustration: {
    width: wp(78),
    height: wp(58),
  },

  textContainer: {
    marginBottom: hp(2.5),
  },

  title: {
    fontSize: wp(6),
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    color: '#8B4513',
    lineHeight: wp(8),
    marginBottom: hp(0.8),
  },

  subtitle: {
    fontSize: wp(4.4),
    color: '#8B4513',
    lineHeight: wp(6),
    opacity: 0.85,
  },

  inputContainer: {
    marginTop: hp(1),
    marginBottom: hp(2),
  },

  inputLabel: {
    fontSize: wp(3.8),
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: hp(1),
    marginLeft: wp(1),
  },

  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5D4C1',
    borderRadius: wp(3),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: wp(3),
    height: hp(7),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  phoneInputContainerFocused: {
    borderColor: '#8B4513',
    borderWidth: 2,
    backgroundColor: '#FFFBF7',
    ...Platform.select({
      ios: {
        shadowColor: '#8B4513',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },

  phoneInputContainerError: {
    borderColor: '#E74C3C',
    backgroundColor: '#FFF5F5',
  },

  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: wp(2),
    paddingVertical: hp(1),
  },

  countryFlag: {
    fontSize: wp(6),
    marginRight: wp(2),
  },

  countryCode: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#2C3E50',
    marginRight: wp(1),
  },

  dropdownArrow: {
    fontSize: wp(2.5),
    color: '#95A5A6',
    marginLeft: wp(0.5),
  },

  separator: {
    width: 1.5,
    height: hp(4),
    backgroundColor: '#E5D4C1',
    marginHorizontal: wp(2.5),
  },

  phoneInput: {
    flex: 1,
    fontSize: wp(4.5),
    color: '#2C3E50',
    fontWeight: '500',
    paddingVertical: 0,
    paddingHorizontal: wp(2),
    height: '100%',
  },

  clearButton: {
    padding: wp(2),
    marginLeft: wp(1),
  },

  clearButtonText: {
    fontSize: wp(5),
    color: '#95A5A6',
    fontWeight: '300',
  },

  helperText: {
    fontSize: wp(3.2),
    marginTop: hp(0.8),
    marginLeft: wp(1),
    fontWeight: '500',
  },

  helperTextSuccess: {
    color: '#27AE60',
  },

  helperTextError: {
    color: '#E74C3C',
  },

  otpButton: {
    backgroundColor: '#8B4513',
    paddingVertical: hp(2.2),
    borderRadius: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(1.5),
    ...Platform.select({
      ios: {
        shadowColor: '#8B4513',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },

  otpButtonDisabled: {
    backgroundColor: '#BDC3C7',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.1,
      },
      android: {
        elevation: 2,
      },
    }),
  },

  otpButtonText: {
    color: '#FFFFFF',
    fontSize: wp(4.6),
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  privacyText: {
    fontSize: wp(3.4),
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: hp(2),
    lineHeight: wp(5),
    paddingHorizontal: wp(4),
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: wp(6),
    borderTopRightRadius: wp(6),
    maxHeight: '80%',
    paddingBottom: hp(2),
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },

  modalTitle: {
    fontSize: wp(5),
    fontWeight: '700',
    color: '#2C3E50',
  },

  closeButton: {
    fontSize: wp(6.5),
    color: '#95A5A6',
    fontWeight: '300',
  },

  // Search Bar Styles
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp(5),
    marginVertical: hp(1.5),
    paddingHorizontal: wp(4),
    backgroundColor: '#F8F9FA',
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    height: hp(6),
  },

  searchIcon: {
    fontSize: wp(4.5),
    marginRight: wp(2),
  },

  searchInput: {
    flex: 1,
    fontSize: wp(4),
    color: '#2C3E50',
    paddingVertical: 0,
  },

  searchClearButton: {
    padding: wp(2),
  },

  resultCount: {
    fontSize: wp(3.5),
    color: '#7F8C8D',
    marginHorizontal: wp(5),
    marginBottom: hp(1),
    fontWeight: '500',
  },

  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },

  selectedCountryItem: {
    backgroundColor: '#FFF7F0',
    borderLeftWidth: 4,
    borderLeftColor: '#8B4513',
  },

  countryItemFlag: {
    fontSize: wp(7),
    marginRight: wp(3),
  },

  countryItemTextContainer: {
    flex: 1,
  },

  countryItemName: {
    fontSize: wp(4.2),
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: hp(0.3),
  },

  countryItemCode: {
    fontSize: wp(3.8),
    color: '#7F8C8D',
    fontWeight: '500',
  },

  checkmark: {
    fontSize: wp(5.5),
    color: '#8B4513',
    fontWeight: 'bold',
  },

  emptyContainer: {
    padding: wp(10),
    alignItems: 'center',
  },

  emptyIcon: {
    fontSize: wp(16),
    marginBottom: hp(2),
  },

  emptyText: {
    fontSize: wp(4.5),
    color: '#2C3E50',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: hp(0.5),
  },

  emptySubtext: {
    fontSize: wp(3.5),
    color: '#95A5A6',
    textAlign: 'center',
  },
});

export default styles;