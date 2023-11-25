import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard'
import { useStorage } from '../../../hooks/useStorage'

export function ModalPassword({ password, handleClose }) {
  const { saveItem } = useStorage();

  // Função para copiar a senha para a área de transferência e salvar localmente
  async function handleCopyPassword() {
    await Clipboard.setStringAsync(password); // Copia a senha para a área de transferência
    await saveItem("@pass", password); // Salva a senha localmente
    alert("Senha salva"); // Exibe um alerta informando que a senha foi salva
    handleClose(); // Fecha o modal
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Senha Gerada</Text>

        {/* Área sensível ao toque para copiar a senha e acionar a função */}
        <Pressable style={styles.innerPassword} onLongPress={handleCopyPassword}>
          <Text style={styles.text}>
            {password}
          </Text>
        </Pressable>

        <View style={styles.buttonArea}>
          {/* Botão para fechar o modal */}
          <TouchableOpacity style={styles.button} onPress={handleClose}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>

          {/* Botão para salvar a senha */}
          <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleCopyPassword}>
            <Text style={styles.buttonSaveText}>Salvar senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Estilos para os componentes do modal
const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(24, 24, 24, 0.6)",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: "#000",
    width: "85%",
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
  },
  innerPassword: {
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: "#fff",
    width: '90%',
    padding: 14,
    paddingBottom: 14,
    borderRadius: 8,
  },
  text: {
    color: "#000",
    textAlign: "center",
  },
  buttonArea: {
    flexDirection: "row",
    width: '90%',
    marginTop: 8,
    alignItems: 'center',
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    marginTop: 14,
    marginBottom: 14,
    padding: 8,
  },
  buttonSave: {
    backgroundColor: "#000",
    borderRadius: 8,
  },
  buttonSaveText: {
    color: "#fff",
    fontWeight: 'bold',
  },
});
