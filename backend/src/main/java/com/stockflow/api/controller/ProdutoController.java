package com.stockflow.api.controller;

import com.stockflow.api.dto.MovimentacaoRequest;
import com.stockflow.api.entity.Produto;
import com.stockflow.api.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    private final ProdutoService service;

    public ProdutoController(ProdutoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Produto> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Produto buscar(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PostMapping
    public ResponseEntity<Produto> criar(@Valid @RequestBody Produto produto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.criar(produto));
    }

    @PutMapping("/{id}")
    public Produto atualizar(@PathVariable Long id, @Valid @RequestBody Produto produto) {
        return service.atualizar(id, produto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/movimentacao")
    public Produto movimentar(@PathVariable Long id, @Valid @RequestBody MovimentacaoRequest mov) {
        return service.movimentar(id, mov);
    }
}
