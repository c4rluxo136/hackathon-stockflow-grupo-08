import { Component, EventEmitter, Input, Output } from '@angular/core';
import { estoqueBaixo, Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent {
  @Input() produtos: Produto[] = [];
  @Output() editar = new EventEmitter<Produto>();
  @Output() excluir = new EventEmitter<Produto>();

  estoqueBaixo = estoqueBaixo;
}
