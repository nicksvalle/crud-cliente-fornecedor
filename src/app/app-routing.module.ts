import { HomeComponent } from './home/home.component';
import { FornecedoresComponent } from './fornecedores/fornecedores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'clientes', component: ClientesComponent},
  {path: 'fornecedores', component: FornecedoresComponent},
  {path: 'home', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
