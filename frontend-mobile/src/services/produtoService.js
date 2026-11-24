import axios from 'axios';
import { API_URL } from '../config/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
});

export async function listarProdutos() {
  const resposta = await api.get('/produtos');
  return resposta.data;
}

export async function buscarProduto(id) {
  const resposta = await api.get(`/produtos/${id}`);
  return resposta.data;
}

// tipo: 'ENTRADA' ou 'SAIDA'
export async function movimentarEstoque(id, tipo, quantidade) {
  const resposta = await api.patch(`/produtos/${id}/movimentacao`, { tipo, quantidade });
  return resposta.data;
}

// Pega a mensagem que a API manda no erro 400/404 (campo "mensagem")
export function mensagemDeErro(erro) {
  const dados = erro.response?.data;
  if (dados?.campos) {
    return Object.values(dados.campos).join('\n');
  }
  if (dados?.mensagem) {
    return dados.mensagem;
  }
  return 'Não foi possível conectar à API. Ela está rodando? Confira o IP em src/config/api.js';
}
