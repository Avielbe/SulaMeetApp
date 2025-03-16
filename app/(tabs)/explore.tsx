// app/(tabs)/explore.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Switch, View } from 'react-native';
import { useLanguage } from '../../src/context/_LanguageContext';


export default function TabTwoScreen() {
  const { language, setLanguage } = useLanguage();
  const isEnglish = language === 'en';
  const toggleLanguage = () => {
    setLanguage(isEnglish ? 'he' : 'en');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={['#1a2151', '#182848', '#4b6cb7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>עברית</Text>
            <Switch
              value={isEnglish}
              onValueChange={toggleLanguage}
              thumbColor={isEnglish ? '#1de9b6' : '#ff5252'}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
            />
            <Text style={styles.toggleLabel}>English</Text>
          </View>

          <Text style={styles.title}>{translations.explore.title[language]}</Text>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.contentBox}
          >
            {/* <Text style={styles.contentText}>
              Welcome to My Trivia App! This application is designed to provide an engaging and challenging trivia experience. Enjoy a variety of game modes including Trivia Questions, Partner Questions, and Mini Games.

              {'\n\n'}Our app is built with passion and commitment to deliver a smooth and visually appealing user experience. Whether you are a trivia enthusiast or just looking for a fun way to test your knowledge, we have something for you.

              {'\n\n'}Stay tuned for more updates, and thank you for using our app!
            </Text> */}
            <Text style={styles.contentText}>{translations.explore.content[language]}</Text>

          </LinearGradient>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2151',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 2,
  },
  contentBox: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contentText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    textAlign: 'justify',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  toggleLabel: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 8,
  },

});
