export interface Produto {
  id?: number;
  nome: string;
  descricao?: string;
  categoria: string;
  quantidade: number;
  estoqueMinimo: number;
}

/** Estoque baixo: quantidade menor ou igual ao estoque mínimo. */
export function estoqueBaixo(produto: Produto): boolean {
  return produto.quantidade <= produto.estoqueMinimo;
}
