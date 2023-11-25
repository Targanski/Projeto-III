// Importação de bibliotecas e módulos necessários
import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Clipboard from 'expo-clipboard';

// Componente PasswordItem para exibir e interagir com itens de senha
export function PasswordItem({ data, removePassword }) {
  // Função para copiar a senha para a área de transferência
  const copyPasswordToClipboard = async () => {
    await Clipboard.setStringAsync(data);
    Alert.alert('Senha Copiada', 'A senha foi copiada para a área de transferência.');
  };

  // Renderização do componente
  return (
    <Pressable style={styles.container}>
      {/* Ícone de cópia */}
      <Icon
        name="copy" // Nome do ícone de cópia (ajuste conforme sua biblioteca de ícones)
        size={25} // Tamanho do ícone
        color="blue" // Cor do ícone
        onPress={copyPasswordToClipboard} // Ação de cópia ao clicar no ícone
      />
      {/* Texto da senha */}
      <Text style={styles.text}>{data}</Text>
      {/* Ícone de exclusão */}
      <Icon
        name="trash" // Nome do ícone da lixeira (ajuste conforme sua biblioteca de ícones)
        size={25} // Tamanho do ícone
        color="red" // Cor do ícone
        onPress={() => removePassword(data)} // Ação de exclusão ao clicar no ícone
      />
    </Pressable>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#ffff',
    padding: 10,
    width: '100%',
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000',
    flex: 1, // Isso faz o texto ocupar o espaço restante no meio
    marginLeft: 50, // Margem à esquerda do texto para afastá-lo dos íconess
  },
});
