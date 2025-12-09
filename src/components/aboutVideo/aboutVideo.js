import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';

export default function AboutVideo() {
  // Replace with your video ID or URL
  const videoId = 'GS1ZVLW2X0c';
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // Function to open in YouTube App / Browser
  const openInYoutube = async () => {
    try {
      // For iOS → youtube://, for Android → intent://
      const youtubeAppUrl =
        Platform.OS === 'ios'
          ? `youtube://${videoId}`
          : `vnd.youtube://${videoId}`;

      // First try YouTube app
      const supported = await Linking.canOpenURL(youtubeAppUrl);
      if (supported) {
        await Linking.openURL(youtubeAppUrl);
      } else {
        // Fallback → open in browser
        await Linking.openURL(youtubeUrl);
      }
    } catch (err) {
      console.warn('Failed to open YouTube:', err);
      Linking.openURL(youtubeUrl);
    }
  };

  return (
    <View style={styles.videoSection}>
      {/* Embedded YouTube video */}
      <WebView
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
      />

      {/* Floating Button to open in YouTube */}
      <TouchableOpacity style={styles.playButton} onPress={openInYoutube}>
        <Icon name="youtube-play" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  videoSection: {
    height: 300,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
  playButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
  },
});
