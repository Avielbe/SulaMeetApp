// // app/(tabs)/final.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { translations } from '../../i18n/translations';
import { useLanguage } from '../context/LanguageContext';

export default function FinalScreen() {
    const { language } = useLanguage();
    const { score } = useLocalSearchParams(); // score comes as a string from the query params
    const router = useRouter();
    const numericScore = Number(score) || 0;

    const handlePlayAgain = () => {
        router.replace('/index'); // or push the selection screen as desired
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: translations.final.shareMessage[language](numericScore),
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{translations.final.headerTitle[language]}</Text>
            <Text style={styles.scoreText}>
                {translations.final.scoreText[language]} {numericScore}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleShare}>
                <Text style={styles.buttonText}>{translations.final.button.share[language]}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
                <Text style={styles.buttonText}>{translations.final.button.playAgain[language]}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16, backgroundColor: '#1a2151' },
    header: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20 },
    scoreText: { fontSize: 22, color: 'white', marginBottom: 40 },
    button: { backgroundColor: '#4b6cb7', padding: 12, borderRadius: 8, marginVertical: 10, width: '80%', alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 16, fontWeight: '500' },
});

// import React from 'react';
// import { SafeAreaView, StatusBar, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useSearchParams, useRouter } from 'expo-router';

// export default function FinalScreen() {
//   const { score } = useSearchParams();
//   const router = useRouter();

//   const handleShare = async () => {
//     try {
//       await Share.share({
//         message: `I scored ${score} points in the Ultimate Question Challenge! Can you beat me?`,
//       });
//     } catch (error: any) {
//       alert(error.message);
//     }
//   };

//   const handlePlayAgain = () => {
//     router.replace('/');
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
//       <LinearGradient colors={['#1a2151', '#182848', '#4b6cb7']} style={styles.container}>
//         <Text style={styles.title}>Congratulations!</Text>
//         <Text style={styles.scoreText}>Your Total Score: {score}</Text>
//         <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
//           <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']} style={styles.buttonGradient}>
//             <Text style={styles.buttonText}>Share Your Score</Text>
//           </LinearGradient>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handlePlayAgain} style={styles.playAgainButton}>
//           <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']} style={styles.buttonGradient}>
//             <Text style={styles.buttonText}>Play Again</Text>
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
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 20,
//   },
//   scoreText: {
//     fontSize: 24,
//     color: 'white',
//     marginBottom: 40,
//   },
//   shareButton: {
//     width: '80%',
//     marginBottom: 20,
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   playAgainButton: {
//     width: '80%',
//     borderRadius: 15,
//     overflow: 'hidden',
//   },
//   buttonGradient: {
//     padding: 18,
//     borderRadius: 15,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.2)',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
// });
