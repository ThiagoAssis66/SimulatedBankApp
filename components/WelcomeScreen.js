import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';



import Slide1 from '../assets/img/slide1.jpg';
import Slide2 from '../assets/img/slide2.jpg'


const WelcomeScreen = ({ onComplete }) => {
  const [page, setPage] = useState(0);

  const handleNextPage = () => {
    if (page < 1) {
      setPage(page + 1);
    } else {
      console.log('Completing welcome screen');
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      {page === 0 ? (
        <View style={styles.page}>
          <TouchableOpacity onPress={handleNextPage} style={styles.button}>
            <Text style={styles.buttonText}>Próximo</Text>
          </TouchableOpacity>
          <Image source={Slide1} style={styles.image} resizeMode="cover" />
        </View>
      ) : (
        <View style={styles.page}>
          <TouchableOpacity onPress={handleNextPage} style={styles.button}>
            <Text style={styles.buttonText}>Começar</Text>            
          </TouchableOpacity>
          <Image source={Slide2} style={styles.image} resizeMode="cover" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  page: {
    alignItems: 'center',
  },
  image: {
    marginTop: 25,
    resizeMode: 'cover',
    width: '90%',
    height: '95%',
    aspectRatio: 9 / 18,
  },
 
  button: {
    position: 'absolute',
    top: '85%',
    zIndex: 1,
    padding: 10,
    width: '70%',
    borderRadius: 5,
  },
  buttonText: {
    color: '#111111',
    backgroundColor: '#d3af37',
    fontSize: 30,
    padding: 5,
    fontWeight: 'bold', 
    fontStyle: 'italic',     
    textAlign: 'center',
    borderRadius: 10,
    
  },
});

export default WelcomeScreen;