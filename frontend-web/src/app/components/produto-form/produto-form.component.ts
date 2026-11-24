import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnChanges {
  /** Produto em edição. Quando for null, o formulário cadastra um novo. */
  @Input() produto: Produto | null = null;
  @Output() salvar = new EventEmitter<Produto>();
  @Output() cancelar = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    nome: ['', Validators.required],
    descricao: [''],
    categoria: ['', Validators.required],
    quantidade: [0, [Validators.required, Validators.min(0)]],
    estoqueMinimo: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnChanges(): void {
    if (this.produto) {
      this.form.setValue({
        nome: this.produto.nome,
        descricao: this.produto.descricao ?? '',
        categoria: this.produto.categoria,
        quantidade: this.produto.quantidade,
        estoqueMinimo: this.produto.estoqueMinimo
      });
    } else {
      this.limpar();
    }
  }

  enviar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.salvar.emit(this.form.getRawValue());
    if (!this.produto) {
      this.limpar();
    }
  }

  limpar(): void {
    this.form.reset({ nome: '', descricao: '', categoria: '', quantidade: 0, estoqueMinimo: 0 });
  }

  campoInvalido(nome: 'nome' | 'categoria' | 'quantidade' | 'estoqueMinimo'): boolean {
    const campo = this.form.controls[nome];
    return campo.invalid && campo.touched;
  }
}
