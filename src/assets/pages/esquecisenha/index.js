// Importação de bibliotecas e módulos necessários
import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,Keyboard,TouchableWithoutFeedback,Platform,KeyboardAvoidingView,} from 'react-native';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './../../../firebase.config';

// Componente para redefinição de senha
export function EsqueciSenha({ navigation }) {
  // Estado para armazenar o endereço de e-mail
  const [email, setEmail] = useState('');

  // Função para lidar com a redefinição de senha
  const handleResetPassword = async () => {
    try {
      // Validação do endereço de e-mail
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        Alert.alert('Erro', 'Por favor, insira um endereço de e-mail válido.');
        return;
      }

      // Envia um e-mail de redefinição de senha usando o Firebase Authentication
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sucesso', 'Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', `Ocorreu um erro ao enviar o e-mail de redefinição de senha. ${error.message}`);
    }
  };

  // Renderização do componente
  return (
    // Torna o teclado invisível ao tocar fora do campo de entrada
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* Ajusta a visualização para evitar que o teclado sobreponha os elementos */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Barra de status com estilo escuro */}
        <StatusBar barStyle="dark-content" backgroundColor="#1E90FF" />

        {/* Imagem exibida na parte superior */}
        <View style={[styles.imageContainer, { marginTop: -150 }]}>
          <Image
            source={require('../../imagens/senha.png')}
            style={styles.image}
          />
        </View>

        {/* Campo de entrada para o endereço de e-mail */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#888888"
          />
          <Icon name="envelope" size={20} color="#000000" style={styles.icon} />
        </View>

        {/* Botão para redefinir a senha */}
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  },
  imageContainer: {
    width: '55%',
    aspectRatio: 2 / 4,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
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
  resetButton: {
    backgroundColor: '#1E90FF',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
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
});

// Opção de navegação para ocultar o cabeçalho

