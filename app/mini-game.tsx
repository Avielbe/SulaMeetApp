// app/mini-game.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { translations } from '../i18n/translations';
import { useLanguage } from './context/_LanguageContext';


const data = require('../data/questions.json');

export default function MiniGameScreen() {
    const router = useRouter();
    const miniGames = data.miniGames.filter((q: any) => q.language === 'en');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [timerActive, setTimerActive] = useState(true);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const { language } = useLanguage();


    useEffect(() => {
        let interval: any;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0 && timerActive) {
            setTimerActive(false);
            handleTimeout();
        }
        return () => clearInterval(interval);
    }, [timeLeft, timerActive]);

    const handleTimeout = () => {
        setFeedbackMessage(translations.miniGame.feedback.timeout[language]);
        setShowFeedback(true);
        setTimeout(() => {
            goToNextQuestion();
        }, 1500);
    };

    const handleAnswer = (completed: boolean) => {
        setTimerActive(false);
        if (completed) {
            setScore(prev => prev + 50);
            setFeedbackMessage(translations.miniGame.feedback.success[language]);
        } else {
            setFeedbackMessage(translations.miniGame.feedback.failure[language]);
        }
        setShowFeedback(true);
        setTimeout(() => {
            goToNextQuestion();
        }, 1500);
    };

    const goToNextQuestion = () => {
        if (currentIndex < miniGames.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setTimeLeft(60);
            setTimerActive(true);
            setShowFeedback(false);
        } else {
            router.push(`/final?score=${score}`);
        }
    };

    const timerPercentage = (timeLeft / 60) * 100;
    const currentTask = miniGames[currentIndex];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <LinearGradient colors={['#1a2151', '#182848', '#4b6cb7']} style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{translations.miniGame.headerTitle[language]}</Text>
                    <Text style={styles.progressText}>{`${currentIndex + 1}/${miniGames.length}`}</Text>
                </View>
                <View style={styles.timerContainer}>
                    <View style={styles.timerBackground}>
                        <View style={[styles.timerFill, { width: `${timerPercentage}%`, backgroundColor: timerPercentage < 30 ? '#ff5252' : timerPercentage < 60 ? '#ffab40' : '#1de9b6' }]} />
                    </View>
                    <Text style={styles.timerText}>{timeLeft}s</Text>
                </View>
                <View style={styles.questionContainer}>
                    <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} style={styles.questionGradient}>
                        <Text style={styles.question}>{currentTask.task}</Text>
                    </LinearGradient>
                </View>
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => handleAnswer(true)} style={styles.buttonContainer}>
                        <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']} style={styles.buttonGradient}>
                            <Text style={styles.buttonText}>Completed</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleAnswer(false)} style={styles.buttonContainer}>
                        <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']} style={styles.buttonGradient}>
                            <Text style={styles.buttonText}>Not Completed</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {showFeedback && (
                    <View style={styles.feedbackBanner}>
                        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                    </View>
                )}
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#1a2151' },
    container: { flex: 1, padding: 16, justifyContent: 'space-between' },
    header: { marginTop: 20, alignItems: 'center', marginBottom: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: 'white', letterSpacing: 2 },
    progressText: { color: 'rgba(255,255,255,0.7)', marginTop: 5 },
    timerContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
    timerBackground: { height: 6, width: '90%', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3 },
    timerFill: { height: '100%', borderRadius: 3 },
    timerText: { color: 'white', marginTop: 5, fontSize: 16, fontWeight: 'bold' },
    questionContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
    questionGradient: { width: '100%', padding: 20, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
    question: { fontSize: 22, fontWeight: '600', color: 'white', textAlign: 'center', lineHeight: 30 },
    optionsContainer: { width: '100%', marginBottom: 20 },
    buttonContainer: { width: '100%', marginBottom: 15, borderRadius: 15, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 },
    buttonGradient: { padding: 18, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 18, fontWeight: '500', textAlign: 'center' },
    feedbackBanner: { backgroundColor: 'rgba(10,15,50,0.85)', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
    feedbackText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});
