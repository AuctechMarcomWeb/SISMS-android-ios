import { createAxiosInstance } from '../config';

const DocumentAPI = createAxiosInstance('', {
  'Content-Type': 'multipart/form-data',
});

export const updateDocumentByUser = async payload => {
  try {
    const response = await DocumentAPI.post('/updateDocumentByUser', payload, {
      transformRequest: data => data,
    });

    return response;
  } catch (error) {
    throw error;
  }
};


export const searchPDF = async payload => {
  try {
    const response = await UploadAPI.post(
      'searchPdf',
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: data => data,
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};