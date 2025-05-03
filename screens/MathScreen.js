import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ScrollView,
  TextInput,
  Share,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import questions from '../data/questionsMath.json';

const { width, height } = Dimensions.get('window');

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const MathScreen = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [answeredDetails, setAnsweredDetails] = useState([]);

  useEffect(() => {
    if (answeredQuestions >= 10) {
      setModalVisible(true);
    }
  }, [answeredQuestions]);

  const startQuiz = () => {
    if (!questions || questions.length === 0) {
      Alert.alert('Erro', 'Não há perguntas disponíveis.');
      return;
    }
    setAnsweredQuestions(0);
    setCorrectAnswers(0);
    setFeedbackMessage('');
    setAnsweredDetails([]);
    setCurrentQuestion(getRandomQuestion());
  };

  const getRandomQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    randomQuestion.answers = shuffleArray(randomQuestion.answers);
    return randomQuestion;
  };

  const handleAnswerPress = (isCorrect, answerText, correctAnswerText) => {
    setFeedbackMessage(isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta!');
    setCorrectAnswers(prev => prev + (isCorrect ? 1 : 0));
    setAnsweredQuestions(prev => prev + 1);

    setAnsweredDetails(prev => [
      ...prev,
      {
        question: currentQuestion.question,
        answer: answerText,
        isCorrect,
        correctAnswer: correctAnswerText
      }
    ]);

    setTimeout(() => {
      setFeedbackMessage('');
      if (answeredQuestions + 1 < 10) {
        setCurrentQuestion(getRandomQuestion());
      }
    }, 1000);
  };

  const closeModal = () => {
    setModalVisible(false);
    startQuiz();
  };

  const shareContent = async () => {
    const textToShare = answeredDetails.map(detail =>
      `Pergunta: ${detail.question}\nSua Resposta: ${detail.answer} ${detail.isCorrect ? '(Correta)' : '(Incorreta)'}\n${!detail.isCorrect ? `Resposta Correta: ${detail.correctAnswer}` : ''}`
    ).join('\n\n');
    try {
      await Share.share({
        message: textToShare,
        title: 'Relatório do Quiz',
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o conteúdo.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      {!currentQuestion ? (
        <>
          <Text style={styles.subtitle}>Simulado de Matemática Financeira & Lógica!</Text>
          <Image
            source={require('../assets/img/Math1.png')}
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={startQuiz}
            accessible
            accessibilityLabel="Iniciar Quiz">
            <Text style={styles.buttonText}>Iniciar Simulado</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.questionContainer}>
            <Text style={styles.question}>{currentQuestion.question}</Text>
            {currentQuestion.answers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.answerContainer}
                onPress={() => handleAnswerPress(answer.isCorrect, answer.text, currentQuestion.answers.find(a => a.isCorrect).text)}
                accessible
                accessibilityLabel={`Resposta ${index + 1}: ${answer.text}`}>
                <Text style={styles.answer}>{index + 1}. {answer.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
      <Text style={styles.feedback}>{feedbackMessage}</Text>
      <TouchableOpacity
        style={styles.buttonContainerBack}
        onPress={() => navigation.goBack()}
        accessible
        accessibilityLabel="Voltar">
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Simulado Concluído!</Text>
            <Text style={styles.modalMessage}>
              Você acertou {correctAnswers} de 10 perguntas.
            </Text>
            <ScrollView style={styles.modalScrollView}>
              {answeredDetails.map((detail, index) => (
                <View key={index} style={styles.modalItem}>
                  <Text style={styles.modalQuestion}>{detail.question}</Text>
                  <Text style={[styles.modalAnswer, detail.isCorrect ? styles.correct : styles.incorrect]}>
                    Sua Resposta: {detail.answer} {detail.isCorrect ? '(Correta)' : '(Incorreta)'}
                  </Text>
                  {!detail.isCorrect && (
                    <Text style={styles.correctAnswer}>
                      Resposta Correta: {detail.correctAnswer}
                    </Text>
                  )}
                </View>
              ))}
            </ScrollView>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity onPress={shareContent} style={styles.shareButton}>
                <Ionicons name="share-social-sharp" size={24} color="#d3af37" />
                <Text style={styles.shareButtonText}>Compartilhar/Copiar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonClosed} onPress={closeModal}>
                <Text style={styles.textClosed}>FECHAR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#c6c6c6',
  },
  buttonContainer: {
    backgroundColor: '#c6c6c6',
    width: '80%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 5,
    borderColor: '#0091ac',
  },
  buttonContainerBack: {
    backgroundColor: '#d3af37',
    padding: 15,
    width: '50%',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#111111',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    paddingVertical: 10,
  },
  questionContainer: {
    marginVertical: 10,
  },
  question: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#0091ac',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#283747',
    color: '#c6c6c6',
    fontStyle: 'italic',
    borderBottomWidth: 20,
  },
  answerContainer: {
    backgroundColor: '#c6c6c6',
    padding: 15,
    borderRadius: 6,
    marginVertical: 6,
    borderBottomWidth: 5,
    borderColor: '#0091ac',
  },
  answer: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  feedback: {
    color: '#ecf0f1',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: width * 0.85,
    height: height * 0.8,
    backgroundColor: '#ecf0f1',
    borderRadius: 20,
    padding: 10,
  },
  modalScrollView: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#0091ac',
    paddingVertical: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d3af37',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#d3af37',
  },
  modalItem: {
    marginBottom: 10,
  },
  modalQuestion: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#111111',
  },
  modalAnswer: {
    fontSize: 16,
  },
  correct: {
    color: '#27ae60',
  },
  incorrect: {
    color: '#e74c3c',
  },
  correctAnswer: {
    fontSize: 14,
    color: '#34495e',
    fontStyle: 'italic',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 2,
    borderRadius: 5,
    marginRight: 10,
  },
  shareButtonText: {
    marginLeft: 5,
    color: '#d3af37',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonClosed: {
    backgroundColor: '#d3af37',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  textClosed: {
    color: '#ecf0f1',
    fontSize: 12,
    fontWeight: 'bold',
  
  },
});

export default MathScreen;