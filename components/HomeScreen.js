import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import * as Font from 'expo-font';

import styles from '../styles/styles'

const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Italic': require('../assets/fonts/Roboto-Italic.ttf')
  });
};



const HomeScreen = ({ navigation }) => {
  const themes = {
    'Matemática Financeira & Lógica': 'Math',
    'Lingua Portuguesa': 'portuguese',
    'Atualidades & Legislação Bancária': 'AtuLegis',
    'Informática & Tecnologias': 'Info',
    'Conhecimentos Bancários': 'General',
    'Lingua Inglesa': 'English',
  }



  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    fetchFonts().then(() => {
      setFontsLoaded(true);
    });
  }, []);

  if (!fontsLoaded) {
    return null; // Ou um componente de carregamento
  }



  const handleThemePress = (theme) => { 
    const screenName = themes[theme]
    if (screenName) {
      navigation.navigate(screenName)
    } else {
      console.error('Tela correspondente não encontrada para o tema:', theme)
      alert('Tela correspondente não encontrada para o tema: ' + theme)
    }
  }

  return (  
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={{fontFamily: 'Roboto-Bold', fontSize: 28, textAlign: 'center', color: '#c6c6c6', marginTop: 30, marginLeft: 12,  }}  >Fokus App Simulado Bancos!</Text>
          <Text style={{fontFamily: 'Roboto-Italic', fontSize: 18, textAlign: 'center', color: '#c6c6c6', marginTop: 10, marginLeft: 12, marginBottom: 15, }}  >Escolha um tema e bom estudos.</Text>
          <Text style={{fontFamily: 'Roboto-Italic', fontSize: 12, textAlign: 'center', color: '#c6c6c6', marginTop: 10, marginLeft: 12, marginBottom: 15, }}  >"O aplicativo Fokus Simulado Bancos 25 não é afiliado, patrocinado ou endossado por nenhuma entidade governamental e não representa nenhum governo. O aplicativo é destinado exclusivamente para fins educacionais e recreativos, e não fornece ou facilita serviços públicos.​"</Text>
          {Object.keys(themes).map((theme) => (
            <TouchableOpacity 
              key={theme} 
              style={styles.buttonContainer} 
              onPress={() => handleThemePress(theme)}
              accessibilityLabel={`Escolha o tema ${theme}`}
              accessibilityRole="button"
            >
              <Text style={{fontFamily: 'Roboto-Regular', fontSize: 20, textAlign: 'center', padding: 5, color: '#1A1C20', fontWeight: 'bold'}}>{theme}</Text>
            </TouchableOpacity>
            
          ))}

          <Text style={{fontFamily: 'Roboto-Italic', fontSize: 12, textAlign: 'center', color: '#c6c6c6', marginTop: 10, marginLeft: 12, marginBottom: 15, }}  >"As questões aqui disponibilizadas são baseadas em provas públicas já realizadas e disponíveis gratuitamente na internet.​"</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen