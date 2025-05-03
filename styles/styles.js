import { StyleSheet } from 'react-native';



const styles = StyleSheet.create({
  container: {
    flex: 1,    
    width:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111', 
       
  },
  innerContainer: {
    width: '95%',
    justifyContent: 'center',
    marginBottom: 70,
    marginTop: 20,
  },

  buttonContainer: {
    margin: 10,
    width: '100%',
    padding: 10,
    backgroundColor: '#c6c6c6',
    borderRadius: 5,
    borderColor: '#0091ac',
    borderBottomWidth: 8, 
  },

});

export default styles;