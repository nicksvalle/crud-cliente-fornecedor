import { FormBuilder, FormGroup } from '@angular/forms';
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
  fornecedores : Fornecedores[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  estado: any;

  constructor(private fornecedoresService : FornecedoresService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      name : [''],
      email : [''],
      categoria : [''],
      estado : ['']
    });
  }

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores() {
    this.fornecedoresService.getFornecedores().subscribe(
      {
        next : data => this.fornecedores = data
      }
      );
  }

  save(){
    if(this.isEditing)
    {
      this.fornecedoresService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadFornecedores();
            this.formGroupClient.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else{
      this.fornecedoresService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.fornecedores.push(data);
            this.formGroupClient.reset();
          }
        }
        );
    }
 }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  edit(fornecedores : Fornecedores){
    this.formGroupClient.setValue(fornecedores);
    this.isEditing = true;
  }

  delete(fornecedores : Fornecedores){
    this.fornecedoresService.delete(fornecedores).subscribe({
      next: () => this.loadFornecedores()
    })
  }
}
