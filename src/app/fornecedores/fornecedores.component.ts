import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { estados } from '../estados';
import { Fornecedores } from './../fornecedores';
import { Component } from '@angular/core';
import { FornecedoresService } from '../fornecedores.service';

@Component({
  selector: 'app-fornecedores',
  templateUrl: './fornecedores.component.html',
  styleUrls: ['./fornecedores.component.css']
})
export class FornecedoresComponent {
  estados = estados;
  fornecedores: Fornecedores[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;
  estado: any;

  constructor(private fornecedoresService: FornecedoresService, private formBuilder: FormBuilder) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      categoria: this.formBuilder.array([]),
      estado: ['']
    });
  }

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores() {
    this.fornecedoresService.getFornecedores().subscribe({
      next: data => this.fornecedores = data
    });
  }

  save() {
    if (this.isEditing) {
      this.fornecedoresService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadFornecedores();
          this.formGroupClient.reset();
          this.isEditing = false;
        }
      });
    } else {
      const formData = this.formGroupClient.value;
      formData.categoria = this.getCategoriasSelecionadas();

      this.fornecedoresService.save(formData).subscribe({
        next: data => {
          this.fornecedores.push(data);
          this.formGroupClient.reset();
        }
      });
    }
  }

  getCategoriasSelecionadas(): string[] {
    const categoriasSelecionadas: string[] = [];

    const categoriaFormArray = this.formGroupClient.get('categoria') as FormArray;
    categoriaFormArray.getRawValue().forEach((value: any) => {
      if (value) {
        categoriasSelecionadas.push(value);
      }
    });

    return categoriasSelecionadas;
  }

  clean() {
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  edit(fornecedor: Fornecedores) {
    this.formGroupClient.setValue(fornecedor);
    this.isEditing = true;
  }

  delete(fornecedor: Fornecedores) {
    this.fornecedoresService.delete(fornecedor).subscribe({
      next: () => this.loadFornecedores()
    });
  }

  toggleCategoria(categoria: string) {
    const categoriaFormArray = this.formGroupClient.get('categoria') as FormArray;

    if (this.isCategoriaSelecionada(categoria)) {
      const index = categoriaFormArray.value.indexOf(categoria);
      categoriaFormArray.removeAt(index);
    } else {
      categoriaFormArray.push(new FormControl(categoria));
    }
  }

  isCategoriaSelecionada(categoria: string): boolean {
    const categoriaFormArray = this.formGroupClient.get('categoria') as FormArray;
    return categoriaFormArray.value.includes(categoria);
  }

}
