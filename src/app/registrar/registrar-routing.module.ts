import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarPersonaComponent } from './buscar-persona';
import { RegistrarPersonaComponent } from './registrar-persona';

const routes: Routes = [
  {
    path: '', component: BuscarPersonaComponent, data: { title: 'Buscar Persona' }
  },
  {
    path: 'registrar-persona', component: RegistrarPersonaComponent, data: { title: 'Registrar Persona' }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegistrarRoutingModule { }
