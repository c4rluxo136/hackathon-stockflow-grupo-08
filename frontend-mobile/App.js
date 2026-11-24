import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import ListaProdutosScreen from './src/screens/ListaProdutosScreen';
import DetalhesProdutoScreen from './src/screens/DetalhesProdutoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0f766e' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#f3f4f6' },
        }}
      >
        <Stack.Screen name="Produtos" component={ListaProdutosScreen} options={{ title: 'StockFlow' }} />
        <Stack.Screen name="Detalhes" component={DetalhesProdutoScreen} options={{ title: 'Detalhes do produto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
