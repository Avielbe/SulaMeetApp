import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

// Load the JSON data from the data folder
const data = require('../data/questions.json');

export default function TriviaScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  // Filter for English trivia questions
  const triviaQuestions = data.triviaQuestions.filter(q => q.language === 'en');
  const currentQuestion = triviaQuestions[currentIndex];

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === currentQuestion.correctIndex) {
      setCorrectCount(prev => prev + 1);
      setFeedbackMessage('✅ Correct!');
    } else {
      setIncorrectCount(prev => prev + 1);
      setFeedbackMessage('❌ Wrong!');
    }
    setShowFeedback(true);
    // After a short delay, clear feedback and move to the next question
    setTimeout(() => {
      setShowFeedback(false);
      if (currentIndex < triviaQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        Alert.alert('Quiz Finished', `Correct: ${correctCount}\nWrong: ${incorrectCount}`);
        // Reset quiz for demonstration purposes
        setCurrentIndex(0);
        setCorrectCount(0);
        setIncorrectCount(0);
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      {currentQuestion.options.map((option: string, index: number) => (
        <Button key={index} title={option} onPress={() => handleAnswer(index)} />
      ))}
      {showFeedback && <Text style={styles.feedback}>{feedbackMessage}</Text>}
      <Text style={styles.counter}>Correct: {correctCount} | Wrong: {incorrectCount}</Text>
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
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  feedback: {
    fontSize: 24,
    marginVertical: 10,
  },
  counter: {
    marginTop: 20,
    fontSize: 16,
  },
});
