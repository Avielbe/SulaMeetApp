// app/(tabs)/index.tsx
import React from 'react';
import { SafeAreaView, StatusBar, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useLanguage } from '../../src/context/_LanguageContext';

import { translations } from '../../i18n/translations';


export default function HomeScreen() {
  const { language } = useLanguage();

  const router = useRouter();

  const handleSelectionMode = () => {
    router.push('/selection');
  };

  const handleMixMode = () => {
    router.push('/mix');
  };

  return (
    <>
      {/* <Stack.Screen options={{ headerTitle: 'SulaMeet Home' }} /> */}
      <Stack.Screen options={{ headerTitle: translations.home.headerTitle[language] }} />


      <SafeAreaView style={styles.safeArea}>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        <LinearGradient
          colors={['#1a2151', '#182848', '#4b6cb7']}
          style={styles.container}
        >
          {/* <Text style={styles.title}>Welcome to the Ultimate Question Challenge!</Text> */}
          <Text style={styles.title}>{translations.home.welcome[language]}</Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleSelectionMode} style={styles.buttonContainer}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                {/* <Text style={styles.buttonText}>Choose Your Adventure</Text> */}
                <Text style={styles.buttonText}>{translations.home.button.selection[language]}</Text>

              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleMixMode} style={styles.buttonContainer}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
                style={styles.buttonGradient}
              >
                {/* <Text style={styles.buttonText}>Mix It Up Challenge</Text> */}
                <Text style={styles.buttonText}>{translations.home.button.mix[language]}</Text>

              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a2151',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 40,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonGradient: {
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});

// // app/(tabs)/index.tsx
// import React from 'react';
// import { SafeAreaView, StatusBar, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function HomeScreen() {
//   const router = useRouter();

//   const handleStart = () => {
//     router.push('/selection');
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
//         <Text style={styles.title}>Welcome to My Trivia App!</Text>
//         <TouchableOpacity activeOpacity={0.8} onPress={handleStart} style={styles.buttonContainer}>
//           <LinearGradient
//             colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.buttonGradient}
//           >
//             <Text style={styles.buttonText}>Start Trivia</Text>
//           </LinearGradient>
//         </TouchableOpacity>
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
//     padding: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//     letterSpacing: 2,
//     marginBottom: 40,
//   },
//   buttonContainer: {
//     width: '80%',
//     borderRadius: 15,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   buttonGradient: {
//     padding: 18,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.2)',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });
