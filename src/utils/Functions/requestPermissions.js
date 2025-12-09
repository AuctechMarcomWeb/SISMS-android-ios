import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';
import { PermissionsAndroid, Platform } from 'react-native';
import { Alert } from 'react-native';
import FileViewer from 'react-native-file-viewer';
export const requestStoragePermission = async () => {
  console.log('function to ask for allowance');
  if (Platform.OS === 'android' && Platform.Version < 33) {
    // Android <=12: legacy external storage
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to storage to download files.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  // Android 13+ or iOS: no runtime permission needed if using RNFetchBlob / DownloadManager
  return true;
};

// Download function



export const handleDownload = async (fileUrl, fileName) => {6
  console.log("Entered the handl donload function", fileUrl, fileName);

  const { config, fs } = RNFetchBlob;
  const path =
    Platform.OS === 'android'
      ? `${fs.dirs.DownloadDir}/${fileName}`
      : `${fs.dirs.DocumentDir}/${fileName}`;

  config({
    fileCache: true,
    appendExt: 'pdf',
    path,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path,
      description: 'Invoice PDF',
    },
  })
    .fetch('GET', fileUrl)
    .then(async res => {
      const filePath = res.path();
      Alert.alert("Download complete", "Opening file...");

      // 🔥 Open downloaded file
      try {
        await FileViewer.open(filePath, { showOpenWithDialog: true });
      } catch (openErr) {
        console.log("Error opening file:", openErr);
        Alert.alert("Downloaded", "File saved but couldn't be opened automatically.");
      }
    })
    .catch(err => {
      console.log("Download error:", err);
      Alert.alert("Error", "Failed to download file.");
    });
};





export const handleShare = async fileUrl => {
  if (!fileUrl) return;

  try {
    // On iOS we need to download file first to local path for sharing
    let localUrl = fileUrl;
    if (Platform.OS === 'ios' && !fileUrl.startsWith('file://')) {
      const { fs, config } = RNFetchBlob;
      const filePath = `${fs.dirs.DocumentDir}/temp_invoice.pdf`;
      const res = await config({ fileCache: true, path: filePath }).fetch(
        'GET',
        fileUrl,
      );
      localUrl = 'file://' + res.path();
    }

    await Share.open({
      url: localUrl,
      type: 'application/pdf',
      showAppsToView: true,
    });
  } catch (err) {
    if (err && err.error !== 'User did not share') {
      console.error('Share error:', err);
    }
  }
};
