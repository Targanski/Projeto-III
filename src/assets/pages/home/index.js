// Importação de bibliotecas e módulos necessários
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ModalPassword } from "../../componets/modal";
import { Modal } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';

// Conjunto de caracteres para a geração de senhas
let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

// Componente da tela principal (Home)
export function Home() {
  // Estados para controlar o tamanho da senha, o valor da senha, a visibilidade do modal e outros
  const [size, setSize] = useState(10);
  const [passwordValue, setPasswordValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [shouldRotate, setShouldRotate] = useState(false);

  // Efeito colateral para reiniciar o temporizador sempre que o tamanho da senha é alterado
  useEffect(() => {
    resetTimeout();
  }, [size]);

  // Função para gerar uma senha aleatória
  function generatePassword() {
    let password = "";

    for (let i = 0, n = charset.length; i < size; i++) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }

    // Atualiza o valor da senha e exibe o modal
    setPasswordValue(password);
    setModalVisible(true);
    resetTimeout();
  }

  // Função para reiniciar o temporizador
  function resetTimeout() {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Define um novo temporizador para redefinir o tamanho mínimo após 5 segundos de inatividade
    const newTimeoutId = setTimeout(() => {
      setSize(6);
    }, 5000);

    setTimeoutId(newTimeoutId);
  }

  // Função para aumentar o tamanho da senha
  function increaseSize() {
    if (size < 20) {
      // Atualiza o tamanho da senha e inicia a animação de rotação
      setSize(size + 1);
      setShouldRotate(true);
      // Limpa o estado de rotação após a animação terminar
      setTimeout(() => setShouldRotate(false), 1000);
    }
  }

  // Renderização do componente
  return (
    <View style={styles.container}>
      {/* Logo da aplicação */}
      <Image
        source={require("../../imagens/logo.png")}
        style={styles.logo}
      />

      {/* Ícone de atualização (animado) */}
      <Animatable.View animation="pulse" iterationCount="infinite" style={styles.lockIconContainer}>
        <TouchableOpacity onPress={increaseSize}>
          <Animatable.View animation={shouldRotate ? "rotate" : undefined} iterationCount={1}>
            <Icon name="refresh" size={70} color="#000" />
          </Animatable.View>
        </TouchableOpacity>
      </Animatable.View>

      {/* Contador de caracteres da senha */}
      <Text style={styles.characterCount}>{size}</Text>
      <Text style={styles.characterLabel}>caracteres</Text>

      {/* Botão para gerar uma nova senha */}
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      {/* Modal para exibir a senha gerada */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <ModalPassword password={passwordValue} handleClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
    top: -50,
    width: 140,
    height: 140,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: "#1E90FF",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
    top: 80,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  },
  characterCount: {
    fontSize: 50,
    color: "#1E90FF",
    top: -50,
  },
  characterLabel: {
    fontSize: 15,
    color: "#000",
    marginBottom: 20,
    top: -50,
  },
  lockIconContainer: {
    position: "absolute",
    top: 330,
  },
});
