import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarPersonaComponent } from './buscar-persona';
import { RegistrarPersonaComponent } from './registrar-persona';
import { PersonaService } from '../core/services';

const routes: Routes = [
  {
    path: '', component: BuscarPersonaComponent, data: { title: 'Buscar Persona' }
  },
  {
    path: 'registrar-persona/:documento', component: RegistrarPersonaComponent, data: { title: 'Registrar Persona' },
    resolve: { persona: PersonaService }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonaService]
})
export class RegistrarRoutingModule { }
