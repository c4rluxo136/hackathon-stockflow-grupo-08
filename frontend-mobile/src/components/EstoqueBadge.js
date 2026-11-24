import { StyleSheet, Text, View } from 'react-native';

// Mostra "Estoque baixo" quando quantidade <= estoque mínimo
export default function EstoqueBadge({ quantidade, estoqueMinimo }) {
  const baixo = quantidade <= estoqueMinimo;
  return (
    <View style={[styles.badge, baixo ? styles.baixo : styles.ok]}>
      <Text style={styles.texto}>{baixo ? 'Estoque baixo' : 'Estoque OK'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  baixo: { backgroundColor: '#dc2626' },
  ok: { backgroundColor: '#16a34a' },
  texto: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
