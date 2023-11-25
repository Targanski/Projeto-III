import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Sobre({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao KeyGuardian</Text>
      <Text style={styles.description}>
        Sua ferramenta segura e conveniente para gerar, armazenar e gerenciar senhas, logins e informações de sites e aplicativos.
      </Text>
      <Text style={styles.description}>
        Com o KeyGuardian, você pode:
      </Text>
      <Text style={styles.listItem}>- Gerar senhas seguras para suas contas.</Text>
      <Text style={styles.listItem}>- Armazenar informações de login, como e-mail e senha.</Text>
      <Text style={styles.listItem}>- Registrar detalhes de seus sites e aplicativos.</Text>
      <Text style={styles.listItem}>- Manter suas informações protegidas com segurança.</Text>
      <Text style={styles.description}>
        Estamos aqui para ajudá-lo a manter suas informações online de forma segura e acessível a qualquer momento.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
  },
  listItem: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 5,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#FF0000', // Vermelho
    width: '50%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
