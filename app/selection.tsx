import React from 'react';
import { SafeAreaView, StatusBar, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const GlassmorphicButton = ({ title, onPress }) => {
    return (
        <>
            <Stack.Screen options={{ headerTitle: 'Select Your Game Mode' }} />
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.buttonContainer}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                >
                    <Text style={styles.buttonText}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </>
    );
};

export default function SelectionScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <LinearGradient
                colors={['#1a2151', '#182848', '#4b6cb7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
            >
                <Text style={styles.title}>Choose a Game Mode</Text>
                <GlassmorphicButton title="Trivia Questions" onPress={() => router.push('/trivia')} />
                <GlassmorphicButton title="Partner Questions" onPress={() => router.push('/partner')} />
                <GlassmorphicButton title="Mini Game" onPress={() => router.push('/mini-game')} />
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
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 40,
    },
    buttonContainer: {
        width: '80%',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        marginVertical: 10,
    },
    buttonGradient: {
        padding: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
    },
    buttonText: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
    },
});
