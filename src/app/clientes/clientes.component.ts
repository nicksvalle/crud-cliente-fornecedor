import { Component, OnInit } from '@angular/core';
import { Clientes } from '../clientes';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientesService } from '../clientes.service';
import { estados } from '../estados';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  estados = estados;
  clientes : Clientes[] = [];
  isEditing : boolean = false;
  formGroupClient: FormGroup;
  ClientService: any;
  estado: any;

  constructor(private clientesService : ClientesService, private formBuilder : FormBuilder){

    this.formGroupClient = formBuilder.group({
      id : [''],
      name : [''],
      email : [''],
      sexo : [''],
      estado : ['']
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes() {
    this.clientesService.getClientes().subscribe(
      {
        next : data => this.clientes = data
      }
      );
  }

  save(){
    if(this.isEditing)
    {
      this.clientesService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadClientes();
            this.formGroupClient.reset();
            this.isEditing = false;
          }
        }
      )
    }
    else{
      this.clientesService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.clientes.push(data);
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

  edit(clientes : Clientes){
    this.formGroupClient.setValue(clientes);
    this.isEditing = true;
  }

  delete(clientes : Clientes){
    this.clientesService.delete(clientes).subscribe({
      next: () => this.loadClientes()
    })
  }
}

