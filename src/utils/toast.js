import Toast from 'react-native-toast-message';

export const showToast = ({ type = 'success', title, message }) => {
  Toast.show({
    type,
    text1:
      title ||
      (type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info'),
    text2:
      message ||
      (type === 'success'
        ? 'Action completed successfully'
        : 'Something went wrong'),
    position: 'top',
    topOffset: 60,
    visibilityTime: 2500,
    autoHide: true,
  });
};
