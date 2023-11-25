import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, FlatList, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export function Cofre() {
  // Estados para gerenciar a adição de novas entradas, dados da nova entrada, lista de entradas e entrada selecionada para edição
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({ name: '', login: '', link: '', password: '' });
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Refs para os campos de nome e login
  const nameInputRef = useRef(null);
  const loginInputRef = useRef(null);

  // Efeitos para carregar e salvar dados
  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    saveData();
  }, [entries]);

  // Função para adicionar nova entrada
  const addNewEntry = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (newEntry.name === '' || newEntry.login === '' || newEntry.password === '') {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Login e Senha).');
      return;
    }

    // Atualiza a lista de entradas
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);

    // Reseta os dados da nova entrada e fecha o modo de adição
    setNewEntry({ name: '', login: '', link: '', password: '' });
    setIsAdding(false);
    Keyboard.dismiss();
  };

  // Função para deletar uma entrada
  const deleteEntry = (index) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta entrada?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => {
            // Remove a entrada da lista
            const updatedEntries = [...entries];
            updatedEntries.splice(index, 1);
            setEntries(updatedEntries);
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Função para editar uma entrada
  const editEntry = () => {
    // Verifica se os campos obrigatórios foram preenchidos
    if (selectedEntry.entry.name === '' || selectedEntry.entry.login === '' || selectedEntry.entry.password === '') {
      alert('Por favor, preencha todos os campos obrigatórios (Nome, Login e Senha).');
      return;
    }

    // Atualiza a lista de entradas com a entrada editada
    const updatedEntries = [...entries];
    updatedEntries[selectedEntry.index] = selectedEntry.entry;
    setEntries(updatedEntries);

    // Limpa a entrada selecionada para edição
    setSelectedEntry(null);
  };

  // Função para exibir ou ocultar os detalhes de uma entrada
  const toggleDetails = (index) => {
    if (selectedEntry && selectedEntry.index === index) {
      setSelectedEntry(null);
    } else {
      setSelectedEntry({ index, entry: entries[index] });
    }
  };

  // Função para salvar os dados localmente
  const saveData = async () => {
    try {
      const jsonValue = JSON.stringify(entries);
      await AsyncStorage.setItem('@cofre_entries', jsonValue);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  };

  // Função para recuperar os dados salvos localmente
  const retrieveData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@cofre_entries');
      if (jsonValue) {
        const parsedValue = JSON.parse(jsonValue);
        setEntries(parsedValue);
      }
    } catch (error) {
      console.error('Erro ao recuperar dados:', error);
    }
  };

  // Função para formatar os dados de uma entrada para exibição
  const getEntryDisplay = (entry) => {
    return `
      Nome: ${entry.name}
      Login: ${entry.login}
      Link/URL: ${entry.link}
      Senha: ${entry.password}
    `;
  };

  // Função para exportar os dados como texto e compartilhar
  const exportData = async () => {
    try {
      const entriesDisplay = entries.map((entry, index) => `Entrada ${index + 1}:\n${getEntryDisplay(entry)}`).join('\n\n');

      const uri = FileSystem.documentDirectory + 'cofre_data.txt';

      await FileSystem.writeAsStringAsync(uri, entriesDisplay, { encoding: FileSystem.EncodingType.UTF8 });

      await Sharing.shareAsync(uri, { mimeType: 'text/plain', dialogTitle: 'Exportar Dados' });
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Cofre</Text>

        {/* Botões para adicionar e exportar dados */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setIsAdding(true)} style={styles.addButton}>
            <Text style={styles.addButtonText}>Novo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exportButton} onPress={exportData}>
            <Text style={styles.exportButtonText}>Exportar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de entradas */}
        <FlatList
          data={entries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} style={styles.entry} onPress={() => toggleDetails(index)}>
              <View>
                <Text style={styles.entryTitle}>{item.name}</Text>
                {/* Detalhes da entrada */}
                {selectedEntry && selectedEntry.index === index ? (
                  <View style={styles.entryDetails}>
                    <Text>Login: {item.login}</Text>
                    <Text>Link/URL: {item.link}</Text>
                    <Text>Senha: {item.password}</Text>
                  </View>
                ) : null}
              </View>
              {/* Botão para deletar entrada */}
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteEntry(index)}>
                <Icon name="trash" size={20} color="#FF0000" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        {/* Modal para adicionar ou editar entrada */}
        <Modal animationType="slide" transparent={true} visible={isAdding || selectedEntry !== null}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {selectedEntry ? 'Editar Entrada' : 'Nova Entrada'}
              </Text>
              {/* Campos de entrada */}
              <TextInput
                style={styles.input}
                placeholder="Nome"
                placeholderTextColor="#808080"
                value={selectedEntry ? selectedEntry.entry.name : newEntry.name}
                onChangeText={(text) => selectedEntry ? setSelectedEntry({ ...selectedEntry, entry: { ...selectedEntry.entry, name: text } }) : setNewEntry({ ...newEntry, name: text })}
                ref={nameInputRef}
              />
              <TextInput
                style={styles.input}
                placeholder="Login"
                placeholderTextColor="#808080"
                value={selectedEntry ? selectedEntry.entry.login : newEntry.login}
                onChangeText={(text) => selectedEntry ? setSelectedEntry({ ...selectedEntry, entry: { ...selectedEntry.entry, login: text } }) : setNewEntry({ ...newEntry, login: text })}
                ref={loginInputRef}
              />
              <TextInput
                style={styles.input}
                placeholder="Link/URL"
                placeholderTextColor="#808080"
                value={selectedEntry ? selectedEntry.entry.link : newEntry.link}
                onChangeText={(text) => selectedEntry ? setSelectedEntry({ ...selectedEntry, entry: { ...selectedEntry.entry, link: text } }) : setNewEntry({ ...newEntry, link: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#808080"
                value={selectedEntry ? selectedEntry.entry.password : newEntry.password}
                onChangeText={(text) => selectedEntry ? setSelectedEntry({ ...selectedEntry, entry: { ...selectedEntry.entry, password: text } }) : setNewEntry({ ...newEntry, password: text })}
              />
              {/* Botões para salvar e cancelar */}
              <TouchableOpacity style={styles.saveButton} onPress={selectedEntry ? editEntry : addNewEntry}>
                <Text style={styles.buttonText}>{selectedEntry ? 'Salvar' : 'Adicionar'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setIsAdding(false); setSelectedEntry(null); }}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'blue',
  },
  addButtonText: {
    color: '#FFF',
  },
  exportButton: {
    padding: 10,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'blue',
  },
  exportButtonText: {
    color: '#FFF',
  },
  entry: {
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  entryDetails: {
    marginTop: 10,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#4682B4',
    borderRadius: 20,
    padding: 35,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#FFF',
    color: 'black',
  },
  saveButton: {
    backgroundColor: '#007ACC',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
  },
});
