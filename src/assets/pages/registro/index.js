// Importação de bibliotecas e módulos necessários
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Configurações do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8sVrXV1TzjHE3f2H1LFNFiVJKtMnVidk",
  authDomain: "keyguardian-93b5b.firebaseapp.com",
  projectId: "keyguardian-93b5b",
  storageBucket: "keyguardian-93b5b.appspot.com",
  messagingSenderId: "981423735163",
  appId: "1:981423735163:web:08fdc94f16df063335fdde"
};

// Inicialização do aplicativo Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Componente de Registro para criar uma nova conta de usuário
export function Registro({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Função para validar a força da senha
  const isPasswordValid = (password) => {
    // A senha deve ter mais de 6 caracteres
    if (password.length <= 6) {
      return false;
    }

    // A senha deve conter pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // A senha deve conter pelo menos um número
    if (!/\d/.test(password)) {
      return false;
    }

    // A senha deve conter pelo menos um caractere especial
    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }

    return true;
  };

  // Função para validar o formato do e-mail
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Função para lidar com o salvamento do usuário
  const handleSave = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert('Erro', 'A senha não atende aos critérios necessários.');
      return;
    }

    try {
      // Registrar novo usuário com Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Usuário registrado com sucesso.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao registrar o usuário: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar o usuário.');
    }
  }

  // Função para lidar com a navegação para a tela de login
  const handleLogin = () => {
    navigation.navigate('Login');
  }

  // Renderização do componente
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#1E90FF" />
        <Image
          source={require('../../imagens/Registro.png')}
          style={styles.image}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            onChangeText={(text) => setFullName(text)}
            placeholderTextColor="#888888"
          />
          <Icon name="user" size={20} color="#000000" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#888888"
          />
          <Icon name="envelope" size={20} color="#000000" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#888888"
          />
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color="#000000"
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={handleLogin}>
          <Text style={styles.registerButtonText}>Já tem uma conta? Entre aqui.</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'transparent',
    borderBottomWidth: 2,
    borderBottomColor: '#1E90FF',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000000',
  },
  loginButton: {
    backgroundColor: '#1E90FF',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: 'transparent',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 35,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
  icon: {
    marginLeft: -30,
  },
});


