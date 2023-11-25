// Importação de bibliotecas e módulos necessários
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../firebase.config';

// Componente de Login
export function Login({ navigation }) {
  // Estados para controlar o email, senha e visibilidade da senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Função para verificar se o email é válido
  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  // Função para lidar com o processo de login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (!isEmailValid(email)) {
      Alert.alert('Erro', 'Por favor, insira um endereço de e-mail válido.');
      return;
    }

    try {
      // Autenticar com Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Continue com a lógica de navegação ou outra lógica necessária após o login bem-sucedido
      navigation.navigate('Principal');
    } catch (error) {
      // Mensagem de erro para o usuário
      Alert.alert('Erro', 'Credenciais incorretas. Tente novamente.');
    }
  };

  // Função para navegar para a tela de registro
  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  // Renderização do componente
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Barra de status */}
        <StatusBar barStyle="dark-content" backgroundColor="#1E90FF" />

        {/* Logo da aplicação */}
        <View style={styles.imageContainer}>
          <Image source={require('../../imagens/sggg.png')} style={styles.image} />
        </View>

        {/* Entrada de email */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#888888"
          />
          <Icon name="envelope" size={20} color="#000000" style={styles.icon} />
        </View>

        {/* Entrada de senha */}
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

        {/* Botão para realizar o login */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        {/* Seção para criar uma nova conta */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Ainda não tem uma conta?</Text>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </View>

        {/* Link para a recuperação de senha */}
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('EsqueciSenha')}
        >
          <Text style={styles.forgotPasswordButtonText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: -100,
  },
  imageContainer: {
    width: '55%',
    aspectRatio: 2 / 4,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    marginLeft: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#000',
    fontSize: 15,
  },
  registerButton: {
    marginLeft: 5,
  },
  registerButtonText: {
    color: '#1E90FF',
    fontSize: 14,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    marginTop: 250,
  },
  icon: {
    marginLeft: -30,
  },
  forgotPasswordButton: {
    marginTop: 10,
    alignSelf: 'center',  // Centraliza horizontalmente
    marginBottom: 20,     // Ajusta a margem inferior
  },
  forgotPasswordButtonText: {
    color: '#1E90FF',
    fontSize: 14,
    textDecorationLine: 'underline', // Sublinha o texto
  },
});

