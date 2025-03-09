import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MiniGameScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mini Game - Coming Soon!</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
    },
});
