import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function SelectionScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Game Mode</Text>
            <Button title="Trivia Questions" onPress={() => router.push('/trivia')} />
            <Button title="Partner Questions" onPress={() => router.push('/partner')} />
            <Button title="Mini Game" onPress={() => router.push('/mini-game')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
