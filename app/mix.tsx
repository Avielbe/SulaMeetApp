// app/mix.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { translations } from '../i18n/translations';
import { useLanguage } from '../src/context/_LanguageContext';




const data = require('../data/questions.json');

export default function MixScreen() {
  const router = useRouter();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const { language } = useLanguage();


  useEffect(() => {
    const trivia = data.triviaQuestions.filter((q) => q.language === language).map((q) => ({ ...q, type: 'trivia' }));

    // const trivia = data.triviaQuestions.filter((q: any) => q.language === 'en').map((q: any) => ({ ...q, type: 'trivia' }));
    const partner = data.partnerQuestions.filter((q: any) => q.language === 'en').map((q: any) => ({ ...q, type: 'partner' }));
    const mini = data.miniGames.filter((q: any) => q.language === 'en').map((q: any) => ({ ...q, type: 'mini' }));
    const all = [...trivia, ...partner, ...mini];
    shuffle(all);
    setQuestions(all);
    if (all.length > 0) {
      setTimeLeft(getTimerForType(all[0].type));
    }
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      handleTimeout();
    }
  }, [timeLeft, timerActive]);

  const getTimerForType = (type: string) => {
    if (type === 'trivia') return 15;
    if (type === 'partner') return 10;
    if (type === 'mini') return 60;
    return 15;
  };

  const shuffle = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleTimeout = () => {
    setFeedbackMessage("Time's up!");
    setShowFeedback(true);
    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
  };

  const currentQuestion = () => questions[currentIndex];

  const handleAnswer = (answer: any) => {
    setTimerActive(false);
    const q = currentQuestion();
    if (q.type === 'trivia') {
      if (answer === q.correctIndex) {
        setScore(prev => prev + 10);
        setFeedbackMessage("Correct!");
      } else {
        setFeedbackMessage("Wrong!");
      }
    } else if (q.type === 'partner') {
      if (answer === true) {
        setScore(prev => prev + 30);
        setFeedbackMessage("Great job!");
      } else {
        setFeedbackMessage("Maybe next time.");
      }
    } else if (q.type === 'mini') {
      if (answer === true) {
        setScore(prev => prev + 50);
        setFeedbackMessage("Well done!");
      } else {
        setFeedbackMessage("Maybe next time.");
      }
    }
    setShowFeedback(true);
    setTimeout(() => {
      goToNextQuestion();
    }, 1500);
  };

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTimeLeft(getTimerForType(questions[nextIndex].type));
      setTimerActive(true);
      setShowFeedback(false);
    } else {
      router.push(`/final?score=${score}`);
    }
  };

  const timerPercentage = () => {
    const totalTime = getTimerForType(currentQuestion().type);
    return (timeLeft / totalTime) * 100;
  };

  if (questions.length === 0) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }}>
        <LinearGradient colors={['#1a2151', '#182848', '#4b6cb7']} style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Mix Challenge</Text>
            <Text style={styles.progressText}>{`${currentIndex + 1}/${questions.length}`}</Text>
          </View>
          <View style={styles.timerContainer}>
            <View style={styles.timerBackground}>
              <View style={[styles.timerFill, { width: `${timerPercentage()}%`, backgroundColor: timerPercentage() < 30 ? '#ff5252' : timerPercentage() < 60 ? '#ffab40' : '#1de9b6' }]} />
            </View>
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </View>
          <View style={styles.questionContainer}>
            <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} style={styles.questionGradient}>
              <Text style={styles.question}>
                {currentQuestion().type === 'mini' ? currentQuestion().task : currentQuestion().question}
              </Text>
            </LinearGradient>
          </View>
          <View style={styles.optionsContainer}>
            {currentQuestion().type === 'trivia' &&
              currentQuestion().options.map((option: string, index: number) => (
                <TouchableOpacity key={index} onPress={() => handleAnswer(index)} style={styles.buttonContainer}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']} style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>{option}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))
            }
            {(currentQuestion().type === 'partner' || currentQuestion().type === 'mini') && (
              <>
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
              </>
            )}
          </View>
          {showFeedback && (
            <View style={styles.feedbackBanner}>
              <Text style={styles.feedbackText}>{feedbackMessage}</Text>
            </View>
          )}
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#1a2151' },
  container: { flex: 1, padding: 16, justifyContent: 'flex-start' },
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
