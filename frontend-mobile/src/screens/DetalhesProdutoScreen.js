import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import EstoqueBadge from '../components/EstoqueBadge';
import { buscarProduto, mensagemDeErro, movimentarEstoque } from '../services/produtoService';

export default function DetalhesProdutoScreen({ route }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  useEffect(() => {
    buscarProduto(id)
      .then(setProduto)
      .catch((e) => setErro(mensagemDeErro(e)));
  }, [id]);

  async function movimentar(tipo) {
    setErro('');
    setSucesso('');

    const qtd = Number(quantidade);
    if (!Number.isInteger(qtd) || qtd <= 0) {
      setErro('Digite uma quantidade inteira maior que zero.');
      return;
    }

    setEnviando(true);
    try {
      const atualizado = await movimentarEstoque(id, tipo, qtd);
      setProduto(atualizado);
      setQuantidade('');
      setSucesso(tipo === 'ENTRADA' ? `Entrada de ${qtd} registrada!` : `Saída de ${qtd} registrada!`);
    } catch (e) {
      // Ex.: "Estoque insuficiente: saldo atual 2, saída solicitada 3"
      setErro(mensagemDeErro(e));
    } finally {
      setEnviando(false);
    }
  }

  if (!produto) {
    return erro ? (
      <Text style={[styles.erro, { margin: 24 }]}>{erro}</Text>
    ) : (
      <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#0f766e" />
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={styles.card}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <EstoqueBadge quantidade={produto.quantidade} estoqueMinimo={produto.estoqueMinimo} />
        <Text style={styles.label}>Categoria</Text>
        <Text style={styles.valor}>{produto.categoria}</Text>
        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.valor}>{produto.descricao || '-'}</Text>

        <View style={styles.numeros}>
          <View style={styles.caixa}>
            <Text style={styles.caixaNumero}>{produto.quantidade}</Text>
            <Text style={styles.caixaTexto}>Saldo atual</Text>
          </View>
          <View style={styles.caixa}>
            <Text style={styles.caixaNumero}>{produto.estoqueMinimo}</Text>
            <Text style={styles.caixaTexto}>Estoque mínimo</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.titulo}>Movimentar estoque</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />
        <View style={styles.botoes}>
          <Pressable
            style={[styles.botao, styles.entrada, enviando && styles.desabilitado]}
            disabled={enviando}
            onPress={() => movimentar('ENTRADA')}
          >
            <Text style={styles.botaoTexto}>+ Entrada</Text>
          </Pressable>
          <Pressable
            style={[styles.botao, styles.saida, enviando && styles.desabilitado]}
            disabled={enviando}
            onPress={() => movimentar('SAIDA')}
          >
            <Text style={styles.botaoTexto}>- Saída</Text>
          </Pressable>
        </View>
        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {sucesso ? <Text style={styles.sucesso}>{sucesso}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  nome: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  titulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  label: { marginTop: 12, color: '#6b7280', fontSize: 13 },
  valor: { fontSize: 16 },
  numeros: { flexDirection: 'row', gap: 12, marginTop: 16 },
  caixa: { flex: 1, backgroundColor: '#f0fdfa', borderRadius: 8, padding: 12, alignItems: 'center' },
  caixaNumero: { fontSize: 28, fontWeight: 'bold', color: '#0f766e' },
  caixaTexto: { color: '#4b5563' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  botoes: { flexDirection: 'row', gap: 12 },
  botao: { flex: 1, padding: 12, borderRadius: 8, alignItems: 'center' },
  entrada: { backgroundColor: '#16a34a' },
  saida: { backgroundColor: '#dc2626' },
  desabilitado: { opacity: 0.5 },
  botaoTexto: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  erro: { color: '#dc2626', marginTop: 12, fontWeight: 'bold' },
  sucesso: { color: '#16a34a', marginTop: 12, fontWeight: 'bold' },
});
