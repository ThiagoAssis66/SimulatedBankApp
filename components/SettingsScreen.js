import React from 'react';
import { View, Text, Image, StyleSheet, Linking, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Biblioteca de ícones

const SettingsScreen = () => {
  // Funções para abrir redes sociais
  const openLink = (url) => {
    Linking.openURL(url);
  };
  const openLink1 = (email) => {
    Linking.openURL(`mailto:${email}`);
  };
  const handlePress = (url) => {
    Linking.openURL(url);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Imagem da equipe ou da startup */}
        <Image
          source={require('../assets/img/AtlasV1.png')}
          style={styles.image}
        />
        
        <Text style={styles.description}>
          Somos uma startup inovadora focada em soluções tecnológicas que transformam a experiência digital em experiências de vida.   
        </Text>

        <View style={styles.socialIcons}>
          <Ionicons
            name="logo-instagram"      
            size={30}
            color="#C13584"
            onPress={() => openLink('https://www.instagram.com/atlassw.tech/')}
            style={styles.icon}
          />
          <Ionicons
            name="mail-unread-sharp"
            size={30}
            color="#DB4437"
            onPress={() => openLink1('atlas.softwarework@gmail.com')}
            style={styles.icon}
          />
          <Ionicons
            name="logo-linkedin"
            size={30}
            color="#0077B5"
            onPress={() => openLink('https://www.linkedin.com/company/atlas-software-work/?viewAsMember=true')}
            style={styles.icon}
          />
          <Ionicons
            name="rocket-outline"
            size={30}
            color="#FFD700"
            onPress={() => openLink('https://www.atlassw.tech')}
            style={styles.icon}
          />
        </View>

        <Text style={styles.line}>
        ____________________________________________
        </Text>

        
        <View style={styles.row}>

        <Text style={styles.bancastitle}>
        As questões e respostas disponíveis no Fokus Simulado Bancos 25 são coletadas e agrupadas de diversas fontes públicas e bancas
        examinadoras respeitadas nos anos de 2018, 2019, 2020, 2021, 2022, 2023 e 2024, disponíveis gratuitamente na internet, mas não se limitando a:
        </Text>
          <Text style={styles.linkText}>
              ACESS | ADMETE | ADVISE | AMEOSC | APICE | APRENDER.COM | ASSCON-PP | BIORIO | CESPE | CETAP | CETREDE | CETRO |
              CONPASS | CONSCAM | CONSULPAM | CPCON | CREATIVE GROUP | CRESCER | CURSIVA | EXATUS | FAEPESUL | FAFICA | FAUEL | FADESP |
              FAPEC | FACET | FEPESE | FUNCAB | FUNDATEC | FUNDAÇÃO CEFETMINAS | FUNCERN | FUNDEB | GESTÃO DE CONCURSOS | GERCON | IADES | IAN |
              IBADE | IDECAN | IDCAP | IDHTEC | IDIB | IESES | IMA | IMPARH | INAZ | INSTITUTO MAIS | INSTITUTO AVANÇAR | INSTITUTO SAGAZ | INSTITUTO TUPY |
              INSTITUTO VERBENA | MASTER | OBJETIVA | QUADRIX | REIS E REIS | SELECON | SISMETA | UECE | UERR | UFPR | UNA | UNIUV | UNILAVRSA | UNIOESTE |
              UPENET | URI  

          </Text>


        
        <Text style={styles.bancastitle}> Estas questões são utilizadas apenas para fins educacionais e informativos. Nós respeitamos os direitos autorais das bancas examinadoras
          e agradecemos pela contribuição de seus conteúdos para o aprendizado dos usuários. 
        </Text>

        </View>

        <View>
        <TouchableOpacity onPress={() => handlePress('https://atlasprivacypolicy.blogspot.com/2025/04/privacy-policy-fokus-simulado-bancos-25.html')}>
          <Text style={styles.buttonText}>Política de Privacidade</Text>
        </TouchableOpacity>

        </View>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    height: '170%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#111111',
    padding: 20,
  },
  image: {
    width: '90%',
    height: '14%',
    marginBottom: 10,
    marginTop: 20,
    resizeMode: 'cover',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#c6c6c6',
    marginBottom: 20,
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
  },
  icon: {
    marginTop: 0,
    marginHorizontal: 10,
  },
  bancas: {
    fontSize: 12,
    textAlign: 'center',
    color: '#c6c6c6',
    marginBottom: 20,
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
  bancastitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#c6c6c6',
    marginBottom: 15,
    marginTop: 50,
    paddingHorizontal: 20,
    fontStyle: 'italic',
  },
  line: {
    fontSize: 14,
    textAlign: 'center',
    color: '#c6c6c6',
    marginBottom: -15,
    marginTop: 20,
  
    fontStyle: 'bold',
  },
  linkText: {
    color: '#c6c6c6',
    marginHorizontal: 5,
    fontSize: 12,
    textAlign:'center',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#d3af37',
    padding: 18,
    borderRadius: 20,
    
  },
  
});

export default SettingsScreen;