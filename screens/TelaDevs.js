import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function TelaDesenvolvedores() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desenvolvedores👨‍💻</Text>
      <View style={styles.developerContainer}>
        <Image 
          source={require('../assets/pedro.jpg')} 
          style={styles.image}
        />
        <Text style={styles.text}>Nome Pedro Manzo Yokoo - RM556115</Text>
      </View>

      <View style={styles.developerContainer}>
      <Image 
          source={require('../assets/fernando.jpg')}
          style={styles.image}
        />
        <Text style={styles.text}>Nome Fernando Fernandes Prado - RM557982</Text>
      </View>

      <View style={styles.developerContainer}>
      <Image 
          source={require('../assets/guilherme.jpg')}
          style={styles.image}
        />
        <Text style={styles.text}>Nome Guilherme Camasmie Laiber de Jesus - RM554894</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 30,
    textTransform: 'uppercase',
  },
  developerContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
  },
  image: {
    width: 80, 
    height: 80,
    borderRadius: 40, 
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    color: 'green',
    marginBottom: 12,
    fontFamily: 'Roboto',
  },
});
