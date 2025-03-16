// app/trivia.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useRouter, useLocalSearchParams } from 'expo-router';

import { translations } from '../i18n/translations';
import { useLanguage } from '../src/context/_LanguageContext';


// Load the JSON data from the data folder
const data = require('../data/questions.json');
const router = useRouter()
const { width, height } = Dimensions.get('window');

// Custom Button Component with simpler animation
const GlassmorphicButton = ({ option, index, onPress, disabled, isCorrectAnswer, selectedAnswer, showFeedback }) => {
  // Determine button style based on state
  let buttonStyle = styles.buttonGradient;
  let textStyle = styles.buttonText;

  if (showFeedback && selectedAnswer === index) {
    if (isCorrectAnswer === index) {
      buttonStyle = { ...styles.buttonGradient, ...styles.correctButton };
    } else {
      buttonStyle = { ...styles.buttonGradient, ...styles.wrongButton };
    }
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(index)}
        disabled={disabled}
        style={styles.buttonTouchable}
      >
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.05)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={buttonStyle}
        >
          <Text style={textStyle}>{option}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

// Progress indicator
const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${current}/${total}`}</Text>
    </View>
  );
};

// Score display
const ScoreDisplay = ({ correct, incorrect }) => {
  return (
    <View style={styles.scoreContainer}>
      <View style={styles.scoreItem}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreValue}>{correct}</Text>
        </View>
        <Text style={styles.scoreLabel}>Correct</Text>
      </View>

      <View style={styles.scoreItem}>
        <View style={[styles.scoreCircle, styles.wrongCircle]}>
          <Text style={styles.scoreValue}>{incorrect}</Text>
        </View>
        <Text style={styles.scoreLabel}>Wrong</Text>
      </View>
    </View>
  );
};

export default function TriviaScreen() {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(true);


  const router = useRouter();
  // Filter for English trivia questions
  const triviaQuestions = data.triviaQuestions.filter(q => q.language === language);
  const currentQuestion = triviaQuestions[currentIndex];

  // Timer logic
  useEffect(() => {
    let interval;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      handleTimeout();
    }

    return () => clearInterval(interval);
  }, [timeLeft, timerActive]);

  const handleTimeout = () => {
    setIncorrectCount(prev => prev + 1);
    setFeedbackMessage('Time`s up!');
    showFeedbackAndProceed();
  };

  const resetTimer = () => {
    setTimeLeft(15);
    setTimerActive(true);
  };

  const handleAnswer = (selectedIndex) => {
    setTimerActive(false);
    setSelectedAnswer(selectedIndex);

    if (selectedIndex === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
      setFeedbackMessage('Correct!');
    } else {
      setIncorrectCount(prev => prev + 1);
      setFeedbackMessage('Wrong!');
    }

    setShowFeedback(true);
    showFeedbackAndProceed();
  };

  const showFeedbackAndProceed = () => {
    // After a short delay, clear feedback and move to the next question
    setTimeout(() => {
      setShowFeedback(false);

      if (currentIndex < triviaQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedAnswer(null);
        resetTimer();
      } else {
        router.push(`/final?score=${correctCount}`);

        // Alert.alert(
        //   '🏆 Quiz Finished!',
        //   `Your Score: ${correctCount}/${triviaQuestions.length}`,
        //   [
        //     {
        //       text: 'Play Again',
        //       onPress: () => {
        //         setCurrentIndex(0);
        //         setCorrectCount(0);
        //         setIncorrectCount(0);
        //         setSelectedAnswer(null);
        //         resetTimer();
        //       }
        //     }
        //   ]
        // );
      }
    }, 1500);
  };

  // Calculate timer percentage for visual display
  const timerPercentage = (timeLeft / 15) * 100;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={['#1a2151', '#182848', '#4b6cb7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.title}>{translations.trivia.headerTitle[language]}</Text>
          <ProgressBar current={currentIndex + 1} total={triviaQuestions.length} />
        </View>

        {/* Timer display */}
        <View style={styles.timerContainer}>
          <View style={styles.timerBackground}>
            <View
              style={[
                styles.timerFill,
                {
                  width: `${timerPercentage}%`,
                  backgroundColor: timerPercentage < 30 ? '#ff5252' : timerPercentage < 60 ? '#ffab40' : '#1de9b6'
                }
              ]}
            />
          </View>
          <Text style={styles.timerText}>{timeLeft}s</Text>
        </View>

        {/* Question section */}
        <View style={styles.questionContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.questionGradient}
          >
            <Text style={styles.question}>{currentQuestion.question}</Text>
          </LinearGradient>
        </View>

        {/* Options section */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => (
            <GlassmorphicButton
              key={index}
              option={option}
              index={index}
              onPress={handleAnswer}
              disabled={showFeedback}
              isCorrectAnswer={currentQuestion.correctIndex}
              selectedAnswer={selectedAnswer}
              showFeedback={showFeedback}
            />
          ))}
        </View>

        {/* Feedback banner (instead of overlay) */}
        {showFeedback && (
          <View style={styles.feedbackBanner}>
            <Text style={[
              styles.feedbackText,
              { color: feedbackMessage.includes('Correct') ? '#1de9b6' : '#ff5252' }
            ]}>
              {feedbackMessage}
            </Text>
          </View>
        )}

        {/* Score display */}
        <ScoreDisplay correct={correctCount} incorrect={incorrectCount} />
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
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBackground: {
    height: 8,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1de9b6',
    borderRadius: 4,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 5,
    fontSize: 14,
  },
  timerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerBackground: {
    height: 6,
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    backgroundColor: '#1de9b6',
    borderRadius: 3,
  },
  timerText: {
    color: 'white',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionGradient: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    lineHeight: 30,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonTouchable: {
    width: '100%',
  },
  buttonGradient: {
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  correctButton: {
    borderColor: '#1de9b6',
    backgroundColor: 'rgba(29, 233, 182, 0.2)',
  },
  wrongButton: {
    borderColor: '#ff5252',
    backgroundColor: 'rgba(255, 82, 82, 0.2)',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  feedbackBanner: {
    backgroundColor: 'rgba(10, 15, 50, 0.85)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  scoreItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(29, 233, 182, 0.2)',
    borderWidth: 2,
    borderColor: '#1de9b6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrongCircle: {
    backgroundColor: 'rgba(255, 82, 82, 0.2)',
    borderColor: '#ff5252',
  },
  scoreValue: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 10,
    fontSize: 14,
  },
});