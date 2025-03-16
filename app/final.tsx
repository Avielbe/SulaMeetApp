// app/final.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { translations } from '../i18n/translations';
import { useLanguage } from '../src/context/_LanguageContext';


export default function FinalScreen() {
    const { language } = useLanguage();
    const { score } = useLocalSearchParams(); // score comes as a string from the query params
    const router = useRouter();
    const numericScore = Number(score) || 0;

    const handlePlayAgain = () => {
        router.replace('/(tabs)');
    }

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
