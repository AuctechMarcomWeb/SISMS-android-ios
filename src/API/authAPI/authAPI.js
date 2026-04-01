import { createAxiosInstance } from '../config';

const AuthAPI = createAxiosInstance();
export const UploadAPI = createAxiosInstance('/', {
  'Content-Type': 'multipart/form-data',
});
export const SMSAPI = createAxiosInstance('/', {
  'Content-Type': 'application/x-www-form-urlencoded',
});

// Fetch User Details
export const FetchUserDetails = async params => {
  console.log('📩 FetchUserDetails Params:', params);

  try {
    const response = await AuthAPI.get('/dashboard', {
      params: { user_id: params?.userId, offset: params?.offset },
    });

    console.log('✅ FetchUserDetails Response:', response?.data);
    return response.data;
  } catch (error) {
    console.error('❌ FetchUserDetails Error:', error?.response || error);
    throw error;
  }
};

// Update User Details
export const UpdateUserDetails = async formdata => {
  console.log('📩 UpdateUserDetails formdata:', formdata);

  try {
    const response = await UploadAPI.post('updateUserDetails', formdata);

    console.log('✅ UpdateUserDetails Response:', response);
    return response;
  } catch (error) {
    console.error('❌ UpdateUserDetails Error:', error?.response || error);
    throw error;
  }
};

// Update Phone
export const UpdatePhone = async payload => {
  console.log('📩 UpdatePhone payload:', payload);

  try {
    const response = await AuthAPI.get('/userLogin2', {
      params: {},
    });

    console.log('✅ UpdatePhone Response:', response);
    return response;
  } catch (error) {
    console.error('❌ UpdatePhone Error:', error?.response || error);
    throw error;
  }
};

// Search PDF
export const searchPDF = async formdata => {
  console.log('📩 searchPDF formdata:', formdata);

  try {
    const response = await UploadAPI.post('searchPdf', formdata);

    console.log('✅ searchPDF Response:', response);
    return response;
  } catch (error) {
    console.error('❌ searchPDF Error:', error?.response || error);
    throw error;
  }
};

// Search PDF by Date
export const searchPDFByDate = async params => {
  console.log('📩 searchPDFByDate params:', params);

  try {
    const response = await AuthAPI.get('/pdfFilter', {
      params: {
        ...params,
      },
    });

    console.log('✅ searchPDFByDate Response:', response);
    return response;
  } catch (error) {
    console.error('❌ searchPDFByDate Error:', error?.response || error);
    throw error;
  }
};

// Upload PDF
export const UploadPDF = async params => {
  console.log('📩 UploadPDF params:', params);

  try {
    const response = await AuthAPI.post('/uploadPdf', {
      params: { ...params },
    });

    console.log('✅ UploadPDF Response:', response);
    return response;
  } catch (error) {
    console.error('❌ UploadPDF Error:', error?.response || error);
    throw error;
  }
};

// Fetch Notification
export const FetchNotification = async id => {
  console.log('📩 FetchNotification UserId:', id);

  try {
    const response = await AuthAPI.get('/getNotifications', {
      params: { user_id: id },
    });

    console.log('✅ FetchNotification Response:', response);
    return response;
  } catch (error) {
    console.error('❌ FetchNotification Error:', error?.response || error);
    throw error;
  }
};

// Search SMS
export const SearchSMS = async params => {
  console.log('📩 SearchSMS Params:', params);

  try {
    const response = await AuthAPI('/searchSms', {
      params: { ...params },
    });

    console.log('✅ SearchSMS Response:', response);
    return response;
  } catch (error) {
    console.error('❌ SearchSMS Error:', error?.response || error);
    throw error;
  }
};

export const DeleteSMSUser = async user_id => {
  console.log('🗑️ DeleteSMSUser user_id:', user_id);

  try {
    const response = await AuthAPI.post(
      '/deleteUser',
      `user_id=${user_id}`, // 🔥 IMPORTANT
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    console.log('✅ DeleteSMSUser Response:', response);
    return response;
  } catch (error) {
    console.error('❌ DeleteSMSUser Error:', error?.response || error);
    throw error;
  }
};

export const ResendOTP = async phone => {
  console.log('📩 ResendOTP phone:', phone);

  try {
    const response = await SMSAPI.get('/resendOtp', {
      params: { phone },
    });

    console.log('✅ ResendOTP Response:', response);
    return response;
  } catch (error) {
    console.error('❌ ResendOTP Error:', error?.response || error);
    throw error;
  }
};
