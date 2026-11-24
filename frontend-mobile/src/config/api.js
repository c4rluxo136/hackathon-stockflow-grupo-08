import { Platform } from 'react-native';

// No navegador do PC (npx expo start --web), "localhost" funciona.
// No CELULAR, "localhost" é o próprio celular: troque IP_DO_PC pelo IP do
// computador que roda a API (no Windows: abra o cmd e digite "ipconfig").
// No emulador Android, use '10.0.2.2'.
const IP_DO_PC = '192.168.0.15';

export const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:8080/api'
    : `http://${IP_DO_PC}:8080/api`;
