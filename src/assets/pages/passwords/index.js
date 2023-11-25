// Importação de bibliotecas e módulos necessários
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from '../../../hooks/useStorage';
import { PasswordItem } from './components/passworditem'; // Importação do componente PasswordItem
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente Passwords para exibir e gerenciar senhas salvas
export function Passwords() {
  // Estado para armazenar a lista de senhas
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused(); // Hook para verificar se a tela está em foco
  const { getItem, removeItem } = useStorage(); // Custom hook para gerenciar o armazenamento local

  // Efeito para carregar as senhas ao focar na tela
  useEffect(() => {
    async function loadPasswords() {
      const passwords = await getItem('@pass');
      setListPasswords(passwords);
    }

    loadPasswords();
  }, [focused]);

  // Efeito para limpar as senhas após 30 segundos se a lista não estiver vazia
  useEffect(() => {
    const timeout = 30 * 1000; // 30 segundos em milissegundos

    if (listPasswords.length > 0) {
      const timeoutId = setTimeout(async () => {
        // Remova todas as senhas do AsyncStorage
        await AsyncStorage.removeItem('@pass');
        // Limpe a lista de senhas da memória
        setListPasswords([]);
      }, timeout);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [listPasswords]);

  // Função para lidar com a exclusão de uma senha
  async function handleDeletePassword(item) {
    const passwords = await removeItem('@pass', item);
    setListPasswords(passwords);
  }

  // Renderização do componente
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Senhas salvas</Text>
      </View>

      <View style={styles.content}>
        {/* Lista de senhas usando FlatList e componente PasswordItem */}
        <FlatList
          style={{ flex: 1, paddingTop: 14 }}
          data={listPasswords}
          keyExtractor={(item) => String(item)}
          renderItem={({ item }) => (
            <PasswordItem data={item} removePassword={() => handleDeletePassword(item)}></PasswordItem>
          )}
        >
        </FlatList>
      </View>
    </SafeAreaView>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 70,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  title: {
    fontSize: 22,
    color: '#000',
    top: -85,
    paddingLeft: 100,
    paddingRight: 50,
  },
  content: {
    flex: 1,
    paddingLeft: 14,
    paddingRight: 14,
  },
});
