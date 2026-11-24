import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import EstoqueBadge from '../components/EstoqueBadge';
import { listarProdutos, mensagemDeErro } from '../services/produtoService';

export default function ListaProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  async function carregar() {
    setCarregando(true);
    setErro('');
    try {
      setProdutos(await listarProdutos());
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setCarregando(false);
    }
  }

  // Recarrega sempre que a tela volta a aparecer (ex.: depois de uma movimentação)
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  if (carregando) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#0f766e" />;
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>{erro}</Text>
        <Pressable style={styles.botao} onPress={carregar}>
          <Text style={styles.botaoTexto}>Tentar de novo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ padding: 16 }}
      onRefresh={carregar}
      refreshing={carregando}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto cadastrado.</Text>}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate('Detalhes', { id: item.id })}
        >
          <View style={styles.linha}>
            <Text style={styles.nome}>{item.nome}</Text>
            <EstoqueBadge quantidade={item.quantidade} estoqueMinimo={item.estoqueMinimo} />
          </View>
          <Text style={styles.info}>{item.categoria}</Text>
          <Text style={styles.info}>
            Saldo: {item.quantidade} | Mínimo: {item.estoqueMinimo}
          </Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  linha: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  nome: { fontSize: 17, fontWeight: 'bold', flex: 1, marginRight: 8 },
  info: { color: '#4b5563', marginTop: 2 },
  vazio: { textAlign: 'center', marginTop: 40, color: '#6b7280' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  erro: { color: '#dc2626', textAlign: 'center', marginBottom: 16 },
  botao: { backgroundColor: '#0f766e', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
});
