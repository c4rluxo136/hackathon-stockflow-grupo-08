package com.stockflow.api.service;

import com.stockflow.api.dto.MovimentacaoRequest;
import com.stockflow.api.dto.TipoMovimentacao;
import com.stockflow.api.entity.Produto;
import com.stockflow.api.exception.RecursoNaoEncontradoException;
import com.stockflow.api.exception.RegraNegocioException;
import com.stockflow.api.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    private final ProdutoRepository repository;

    public ProdutoService(ProdutoRepository repository) {
        this.repository = repository;
    }

    public List<Produto> listar() {
        return repository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Produto não encontrado: " + id));
    }

    public Produto criar(Produto produto) {
        produto.setId(null);
        return repository.save(produto);
    }

    public Produto atualizar(Long id, Produto dados) {
        Produto produto = buscarPorId(id);
        produto.setNome(dados.getNome());
        produto.setDescricao(dados.getDescricao());
        produto.setCategoria(dados.getCategoria());
        produto.setQuantidade(dados.getQuantidade());
        produto.setEstoqueMinimo(dados.getEstoqueMinimo());
        return repository.save(produto);
    }

    public void excluir(Long id) {
        Produto produto = buscarPorId(id);
        repository.delete(produto);
    }

    public Produto movimentar(Long id, MovimentacaoRequest mov) {
        Produto produto = buscarPorId(id);
        int saldoAtual = produto.getQuantidade();

        if (mov.getTipo() == TipoMovimentacao.ENTRADA) {
            produto.setQuantidade(saldoAtual + mov.getQuantidade());
        } else {
            if (mov.getQuantidade() > saldoAtual) {
                throw new RegraNegocioException(
                        "Estoque insuficiente: saldo atual " + saldoAtual
                                + ", saída solicitada " + mov.getQuantidade());
            }
            produto.setQuantidade(saldoAtual - mov.getQuantidade());
        }
        return repository.save(produto);
    }
}
