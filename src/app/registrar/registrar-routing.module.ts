import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarPersonaComponent } from './buscar-persona';
import { RegistrarPersonaComponent } from './registrar-persona';
import { PersonaService, LocalidadService } from '../core/services';
import { ConfirmarDatosComponent } from './confirmar';

const routes: Routes = [
  {
    path: '', component: BuscarPersonaComponent, data: { loading: true, title: 'Buscar Persona' }
  },
  {
    path: 'registrar-persona/:documento', component: RegistrarPersonaComponent, data: {
      loading: true, title: 'Registrar Persona' },
    resolve: { persona: PersonaService, localidad: LocalidadService }
  },
  {
    path: 'confirmar-datos', component: ConfirmarDatosComponent, data: { loading: true, title: 'Confirmar Datos' }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonaService, LocalidadService]
})
export class RegistrarRoutingModule { }
