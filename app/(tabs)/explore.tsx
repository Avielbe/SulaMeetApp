// // app/(tabs)/explore.tsx
// import React from 'react';
// import { SafeAreaView, ScrollView, StatusBar, Text, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Switch, View } from 'react-native';
// import { useLanguage } from '../../src/context/_LanguageContext';
// import { translations } from '../../i18n/translations';


// export default function TabTwoScreen() {
//   const { language, setLanguage } = useLanguage();

//   const isEnglish = language === 'en';
//   const toggleLanguage = () => {
//     setLanguage(isEnglish ? 'he' : 'en');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
//       <LinearGradient
//         colors={['#1a2151', '#182848', '#4b6cb7']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={styles.container}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.toggleContainer}>
//             <Text style={styles.toggleLabel}>עברית</Text>
//             <Switch
//               value={isEnglish}
//               onValueChange={toggleLanguage}
//               thumbColor={isEnglish ? '#1de9b6' : '#ff5252'}
//               trackColor={{ false: '#767577', true: '#81b0ff' }}
//             />
//             <Text style={styles.toggleLabel}>English</Text>
//           </View>

//           <Text style={styles.title}>{translations.explore.title[language]}</Text>
//           <LinearGradient
//             colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
//             style={styles.contentBox}
//           >
//             {/* <Text style={styles.contentText}>
//               Welcome to My Trivia App! This application is designed to provide an engaging and challenging trivia experience. Enjoy a variety of game modes including Trivia Questions, Partner Questions, and Mini Games.

//               {'\n\n'}Our app is built with passion and commitment to deliver a smooth and visually appealing user experience. Whether you are a trivia enthusiast or just looking for a fun way to test your knowledge, we have something for you.

//               {'\n\n'}Stay tuned for more updates, and thank you for using our app!
//             </Text> */}
//             <Text style={styles.contentText}>{translations.explore.content[language]}</Text>

//           </LinearGradient>
//         </ScrollView>
//       </LinearGradient>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#1a2151',
//   },
//   container: {
//     flex: 1,
//   },
//   scrollContainer: {
//     padding: 16,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 20,
//     textAlign: 'center',
//     letterSpacing: 2,
//   },
//   contentBox: {
//     width: '100%',
//     padding: 20,
//     borderRadius: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//   },
//   contentText: {
//     fontSize: 16,
//     color: 'white',
//     lineHeight: 24,
//     textAlign: 'justify',
//   },
//   toggleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 16,
//   },
//   toggleLabel: {
//     color: 'white',
//     fontSize: 16,
//     marginHorizontal: 8,
//   },

// });
// app/(tabs)/explore.tsx
import React, { useState } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Linking,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Switch, View } from 'react-native';
import { useLanguage } from '../../src/context/_LanguageContext';
import { translations } from '../../i18n/translations';
import * as Haptics from 'expo-haptics';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import * as WebBrowser from 'expo-web-browser';

const { width } = Dimensions.get('window');
const isTablet = width >= 768;

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function TabTwoScreen() {
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' or 'about'
  
  const isEnglish = language === 'en';
  
  const toggleLanguage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLanguage(isEnglish ? 'he' : 'en');
  };

  // פונקציה לפתיחת קישורים חיצוניים
  const handleOpenLink = async (url) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await WebBrowser.openBrowserAsync(url);
  };

  // עדכון יצירת קשר למייל החדש
  const handleContact = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL('mailto:aviel@gmail.com');
  };

  // פונקציה עבור תכונות שעדיין לא זמינות (למשל Coming Soon)
  const handleComingSoon = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // ניתן להוסיף הודעת alert או toast במידת הצורך
  };

  const buttonScale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const renderSettings = () => (
    <Animated.View 
      entering={FadeInUp.duration(500)}
      style={styles.tabContent}
    >
      <View style={styles.settingSection}>
        <Text style={styles.settingSectionTitle}>
          {translations.settings?.display?.[language] || (isEnglish ? 'Display' : 'תצוגה')}
        </Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <MaterialCommunityIcons name="translate" size={22} color="#1de9b6" />
            <Text style={styles.settingLabel}>
              {translations.settings?.language?.[language] || (isEnglish ? 'Language' : 'שפה')}
            </Text>
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>עברית</Text>
            <Switch
              value={isEnglish}
              onValueChange={toggleLanguage}
              thumbColor={isEnglish ? '#1de9b6' : '#ff5252'}
              trackColor={{ false: 'rgba(255, 255, 255, 0.15)', true: 'rgba(29, 233, 182, 0.3)' }}
              ios_backgroundColor="rgba(255, 255, 255, 0.15)"
            />
            <Text style={styles.toggleLabel}>English</Text>
          </View>
        </View>

        {/* שורות עבור אפשרויות שאינן זמינות */}
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="notifications" size={22} color="gray" />
            <Text style={[styles.settingLabel, styles.comingSoonText]}>
              {translations.settings?.notifications?.[language] || (isEnglish ? 'Notifications' : 'התראות')}
            </Text>
          </View>
          <Text style={styles.comingSoonLabel}>Coming Soon</Text>
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="volume-high" size={22} color="gray" />
            <Text style={[styles.settingLabel, styles.comingSoonText]}>
              {translations.settings?.soundEffects?.[language] || (isEnglish ? 'Sound Effects' : 'אפקטים קוליים')}
            </Text>
          </View>
          <Text style={styles.comingSoonLabel}>Coming Soon</Text>
        </View>
        
        <View style={styles.settingRow}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="musical-notes" size={22} color="gray" />
            <Text style={[styles.settingLabel, styles.comingSoonText]}>
              {translations.settings?.music?.[language] || (isEnglish ? 'Music' : 'מוזיקה')}
            </Text>
          </View>
          <Text style={styles.comingSoonLabel}>Coming Soon</Text>
        </View>
      </View>

      <View style={styles.settingSection}>
        <Text style={styles.settingSectionTitle}>
          {translations.settings?.account?.[language] || (isEnglish ? 'Account' : 'חשבון')}
        </Text>
        
        <TouchableOpacity style={styles.settingRow} onPress={handleComingSoon}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="person" size={22} color="gray" />
            <Text style={[styles.settingLabel, styles.comingSoonText]}>
              {translations.settings?.editProfile?.[language] || (isEnglish ? 'Edit Profile' : 'ערוך פרופיל')}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="gray" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow} onPress={handleComingSoon}>
          <View style={styles.settingLabelContainer}>
            <MaterialCommunityIcons name="trophy-outline" size={22} color="gray" />
            <Text style={[styles.settingLabel, styles.comingSoonText]}>
              {translations.settings?.achievements?.[language] || (isEnglish ? 'Achievements' : 'הישגים')}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="gray" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingRow} onPress={handleComingSoon}>
          <View style={styles.settingLabelContainer}>
            <Ionicons name="cloud-download-outline" size={22} color="gray" />
            <Text style={[styles.settingLabel, styles.comingSoonText]}>
              {translations.settings?.dataManagement?.[language] || (isEnglish ? 'Data Management' : 'ניהול נתונים')}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="gray" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        {/* כפתור דף הבית – כעת פעיל */}
        <AnimatedTouchable
          style={[styles.homeButton, animatedStyle]}
          onPress={() => handleOpenLink('https://www.sulameet.com')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={['#1de9b6', '#1dceb6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Ionicons name="home" size={20} color="#0a1128" />
            <Text style={styles.buttonText}>
              {isEnglish ? 'Full Online Game' : 'משחק המלא ברשת'}
            </Text>
          </LinearGradient>
        </AnimatedTouchable>

        {/* כפתור יצירת קשר – מעדכן למייל החדש */}
        <AnimatedTouchable
          style={[styles.contactButton, animatedStyle]}
          onPress={handleContact}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <BlurView intensity={20} style={styles.buttonGradient}>
            <Ionicons name="mail" size={20} color="#1de9b6" />
            <Text style={styles.contactButtonText}>
              {translations.settings?.contactUs?.[language] || (isEnglish ? 'Contact Us' : 'צור קשר')}
            </Text>
          </BlurView>
        </AnimatedTouchable>
      </View>
    </Animated.View>
  );

  const renderAbout = () => (
    <Animated.View 
      entering={FadeInDown.duration(500)}
      style={styles.tabContent}
    >
      <View style={styles.aboutHeader}>
        <View style={styles.trophyIconContainer}>
          <FontAwesome5 name="trophy" size={60} color="#1de9b6" />
        </View>
        <Text style={styles.appVersion}>v1.0.2</Text>
      </View>

      <View style={styles.aboutContentBox}>
        <Text style={styles.aboutTitle}>
          {translations.about?.title?.[language] || (isEnglish ? 'My Trivia App' : 'אפליקציית הטריוויה שלי')}
        </Text>
        <Text style={styles.aboutDescription}>
          {translations.explore?.content[language]}
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <View style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <FontAwesome5 name="question" size={20} color="#1de9b6" />
          </View>
          <Text style={styles.featureTitle}>
            {translations.about?.features?.trivia?.title?.[language] || (isEnglish ? 'Trivia Questions' : 'שאלות טריוויה')}
          </Text>
          <Text style={styles.featureDescription}>
            {translations.about?.features?.trivia?.description?.[language] || 
              (isEnglish 
                ? 'Challenge yourself with thousands of questions across different categories'
                : 'אתגר את עצמך עם אלפי שאלות בקטגוריות שונות')}
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <FontAwesome5 name="users" size={20} color="#1de9b6" />
          </View>
          <Text style={styles.featureTitle}>
            {translations.about?.features?.partner?.title?.[language] || (isEnglish ? 'Partner Mode' : 'מצב שותפים')}
          </Text>
          <Text style={styles.featureDescription}>
            {translations.about?.features?.partner?.description?.[language] || 
              (isEnglish 
                ? 'Play together with friends and family in cooperative mode'
                : 'שחקו יחד עם חברים ומשפחה במצב שיתופי')}
          </Text>
        </View>

        <View style={styles.featureItem}>
          <View style={styles.featureIconContainer}>
            <FontAwesome5 name="gamepad" size={20} color="#1de9b6" />
          </View>
          <Text style={styles.featureTitle}>
            {translations.about?.features?.miniGames?.title?.[language] || (isEnglish ? 'Mini Games' : 'משחקים מיני')}
          </Text>
          <Text style={styles.featureDescription}>
            {translations.about?.features?.miniGames?.description?.[language] || 
              (isEnglish 
                ? 'Enjoy fun mini-games to test your knowledge in different ways'
                : 'תיהנו ממשחקים מיני כיפיים לבדיקת הידע שלכם בדרכים שונות')}
          </Text>
        </View>
      </View>

      <View style={styles.creditsContainer}>
        <Text style={styles.creditsTitle}>
          {translations.about?.credits?.title?.[language] || (isEnglish ? 'Credits' : 'קרדיטים')}
        </Text>
        <Text style={styles.creditsText}>
          {translations.about?.credits?.text?.[language] || 
            (isEnglish 
              ? 'Developed with ❤️ by the My Trivia App Team'
              : 'פותח עם ❤️ על ידי צוות אפליקציית הטריוויה שלי')}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <AnimatedTouchable
          style={[styles.homeButton, animatedStyle]}
          onPress={() => handleOpenLink('https://www.sulameet.com')}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={['#1de9b6', '#1dceb6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Ionicons name="home" size={20} color="#0a1128" />
            <Text style={styles.buttonText}>
              {isEnglish ? 'Full Online Game' : 'משחק המלא ברשת'}
            </Text>
          </LinearGradient>
        </AnimatedTouchable>

        <AnimatedTouchable
          style={[styles.contactButton, animatedStyle]}
          onPress={handleContact}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <BlurView intensity={20} style={styles.buttonGradient}>
            <Ionicons name="mail" size={20} color="#1de9b6" />
            <Text style={styles.contactButtonText}>
              {translations.about?.contactUs?.[language] || (isEnglish ? 'Contact Us' : 'צור קשר')}
            </Text>
          </BlurView>
        </AnimatedTouchable>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={['#0a1128', '#1a2151', '#4b6cb7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {activeTab === 'settings' 
              ? (translations.tabs?.settings?.[language] || (isEnglish ? 'Settings' : 'הגדרות'))
              : (translations.tabs?.about?.[language] || (isEnglish ? 'About' : 'אודות'))}
          </Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'settings' && styles.activeTabButton
            ]}
            onPress={() => {
              setActiveTab('settings');
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Ionicons 
              name="settings" 
              size={22} 
              color={activeTab === 'settings' ? '#1de9b6' : 'rgba(255, 255, 255, 0.6)'} 
            />
            <Text style={[
              styles.tabButtonText,
              activeTab === 'settings' && styles.activeTabButtonText
            ]}>
              {translations.tabs?.settings?.[language] || (isEnglish ? 'Settings' : 'הגדרות')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.tabButton, 
              activeTab === 'about' && styles.activeTabButton
            ]}
            onPress={() => {
              setActiveTab('about');
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Ionicons 
              name="information-circle" 
              size={22} 
              color={activeTab === 'about' ? '#1de9b6' : 'rgba(255, 255, 255, 0.6)'} 
            />
            <Text style={[
              styles.tabButtonText,
              activeTab === 'about' && styles.activeTabButtonText
            ]}>
              {translations.tabs?.about?.[language] || (isEnglish ? 'About' : 'אודות')}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {activeTab === 'settings' ? renderSettings() : renderAbout()}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a1128',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  activeTabButton: {
    backgroundColor: 'rgba(29, 233, 182, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(29, 233, 182, 0.3)',
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginLeft: 8,
  },
  activeTabButtonText: {
    color: '#1de9b6',
  },
  scrollContainer: {
    padding: 16,
  },
  tabContent: {
    width: '100%',
  },
  // Settings styles
  settingSection: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1de9b6',
    marginBottom: 16,
    letterSpacing: 1,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginHorizontal: 8,
  },
  comingSoonLabel: {
    color: 'gray',
    fontSize: 14,
    fontStyle: 'italic',
  },
  comingSoonText: {
    color: 'gray',
  },
  // About styles
  aboutHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  trophyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(29, 233, 182, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(29, 233, 182, 0.3)',
    marginBottom: 10,
  },
  appVersion: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  aboutContentBox: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1de9b6',
    marginBottom: 12,
    textAlign: 'center',
  },
  aboutDescription: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: isTablet ? 'row' : 'column',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  featureItem: {
    width: isTablet ? '32%' : '100%',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: isTablet ? 0 : 12,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(29, 233, 182, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(29, 233, 182, 0.3)',
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
  },
  creditsContainer: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 20,
    alignItems: 'center',
  },
  creditsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1de9b6',
    marginBottom: 8,
  },
  creditsText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  // Buttons
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  homeButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  contactButton: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(29, 233, 182, 0.5)',
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0a1128',
    marginLeft: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1de9b6',
    marginLeft: 8,
  },
});
