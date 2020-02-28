import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarPersonaComponent } from './buscar-persona';

const routes: Routes = [
  {
    path: '', component: BuscarPersonaComponent, data: { title: 'Buscar Persona' }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RegistrarRoutingModule { }
