// Importando os componentes necessários do React Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

// Importando as telas da aplicação
import { Home } from './assets/pages/home';
import { Passwords } from './assets/pages/passwords';
import { Login } from './assets/pages/login/index';
import Sobre from './assets/pages/sobre/index';
import { Registro } from './assets/pages/registro/index';
import { Cofre } from './assets/pages/cofre';
import { EsqueciSenha } from './assets/pages/esquecisenha/index';

// Criando os navegadores e telas da aplicação
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Função principal que define a estrutura da navegação
export function Routes() {
  return (
    // Navegador em pilha
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerShown: false,
          cardStyle: { backgroundColor: '#13293D' },
        }}
      />
      <Stack.Screen
        name="Principal"
        component={HomeTabNavigator}
        options={{
          headerShown: false,
          cardStyle: { backgroundColor: '#13293D' },
        }}
      />
      <Stack.Screen
        name="Passwords"
        component={Passwords}
        options={{
          title: 'Senhas',
        }}
      />
      <Stack.Screen
        name="Registro"
        component={Registro}
        options={({ navigation }) => ({
          title: '',
          headerLeft: () => (
            // Botão de voltar customizado
            <Ionicons
              name="arrow-back"
              size={24}
              color="black"
              style={{ marginLeft: 5 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Sobre"
        component={Sobre}
        options={{
          title: 'Sobre o App',
        }}
      />
      <Stack.Screen
        name="EsqueciSenha"
        component={EsqueciSenha}
        options={{
          title: 'Esqueceu a senha?',
        }}
      />
    </Stack.Navigator>
  );
}

// Navegador de abas da tela principal
function HomeTabNavigator() {
  return (
    // Navegador de abas
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#F0F8FF',
        },
      }}
    >
      {/* Aba Home */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          title: '',
          tabBarIcon: ({ focused, size, color }) => (
            // Ícone da aba Home
            focused
              ? <Ionicons size={size} color={color} name="home" />
              : <Ionicons size={size} color={color} name="home-outline" />
          ),
        }}
      />

      {/* Aba Cofre */}
      <Tab.Screen
        name="Cofre"
        component={Cofre}
        options={{
          tabBarLabel: 'Cofre',
          headerTitle: '',
          tabBarIcon: ({ focused, size, color }) => (
            // Ícone da aba Cofre
            focused
              ? <Ionicons size={size} color={color} name="lock-closed" />
              : <Ionicons size={size} color={color} name="lock-closed-outline" />
          ),
        }}
      />

      {/* Aba Senhas */}
      <Tab.Screen
        name="Passwords"
        component={Passwords}
        options={{
          tabBarLabel: 'Senhas',
          headerTitle: '',
          tabBarIcon: ({ focused, size, color }) => (
            // Ícone da aba Senhas
            focused
              ? <Ionicons size={size} color={color} name="key" />
              : <Ionicons size={size} color={color} name="key-outline" />
          ),
        }}
      />

      {/* Aba Sobre */}
      <Tab.Screen
        name="Sobre"
        component={Sobre}
        options={{
          tabBarLabel: 'Sobre',
          headerTitle: '',
          tabBarIcon: ({ focused, size, color }) => (
            // Ícone da aba Sobre
            focused
              ? <Ionicons size={size} color={color} name="information-circle" />
              : <Ionicons size={size} color={color} name="information-circle-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
