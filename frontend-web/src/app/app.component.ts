import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoFormComponent } from './components/produto-form/produto-form.component';
import { ProdutoListaComponent } from './components/produto-lista/produto-lista.component';
import { estoqueBaixo, Produto } from './models/produto';
import { ProdutoService } from './services/produto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ProdutoFormComponent, ProdutoListaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  produtos: Produto[] = [];
  filtroCategoria = '';
  produtoEmEdicao: Produto | null = null;
  mensagem = '';
  erro = '';

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregar();
  }

  /** Categorias diferentes que existem na lista (para o filtro). */
  get categorias(): string[] {
    return [...new Set(this.produtos.map((p) => p.categoria))].sort();
  }

  /** Produtos exibidos na tabela, respeitando o filtro de categoria. */
  get produtosFiltrados(): Produto[] {
    if (!this.filtroCategoria) {
      return this.produtos;
    }
    return this.produtos.filter((p) => p.categoria === this.filtroCategoria);
  }

  get totalEstoqueBaixo(): number {
    return this.produtosFiltrados.filter(estoqueBaixo).length;
  }

  carregar(): void {
    this.erro = '';
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
        if (this.filtroCategoria && !this.categorias.includes(this.filtroCategoria)) {
          this.filtroCategoria = '';
        }
      },
      error: () => (this.erro = 'Não foi possível conectar à API. Verifique se o backend está rodando na porta 8080.')
    });
  }

  salvar(produto: Produto): void {
    const requisicao = this.produtoEmEdicao?.id
      ? this.produtoService.editar(this.produtoEmEdicao.id, produto)
      : this.produtoService.cadastrar(produto);

    requisicao.subscribe({
      next: () => {
        this.mostrarMensagem(this.produtoEmEdicao ? 'Produto atualizado!' : 'Produto cadastrado!');
        this.produtoEmEdicao = null;
        this.carregar();
      },
      error: (e) => (this.erro = e?.error?.mensagem ?? 'Erro ao salvar o produto. Confira os campos obrigatórios.')
    });
  }

  editar(produto: Produto): void {
    this.produtoEmEdicao = produto;
  }

  cancelarEdicao(): void {
    this.produtoEmEdicao = null;
  }

  excluir(produto: Produto): void {
    if (!produto.id || !confirm(`Excluir o produto "${produto.nome}"?`)) {
      return;
    }
    this.produtoService.excluir(produto.id).subscribe({
      next: () => {
        this.mostrarMensagem('Produto excluído!');
        if (this.produtoEmEdicao?.id === produto.id) {
          this.produtoEmEdicao = null;
        }
        this.carregar();
      },
      error: () => (this.erro = 'Erro ao excluir o produto.')
    });
  }

  private mostrarMensagem(texto: string): void {
    this.mensagem = texto;
    setTimeout(() => (this.mensagem = ''), 3000);
  }
}
