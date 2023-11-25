import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {initializeAuth, getReactNativePersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC8sVrXV1TzjHE3f2H1LFNFiVJKtMnVidk",
  authDomain: "keyguardian-93b5b.firebaseapp.com",
  projectId: "keyguardian-93b5b",
  storageBucket: "keyguardian-93b5b.appspot.com",
  messagingSenderId: "981423735163",
  appId: "1:981423735163:web:08fdc94f16df063335fdde"
}


const firebaseApp = initializeApp(firebaseConfig);

// Configuração do Firebase Authentication com AsyncStorage
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
