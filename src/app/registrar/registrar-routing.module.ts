import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarPersonaComponent } from './buscar-persona';
import { RegistrarPersonaComponent } from './registrar-persona';
import { PersonaService, LocalidadService } from '../core/services';
import { ConfirmarDatosComponent } from './confirmar';

const routes: Routes = [
  {
    path: '', component: BuscarPersonaComponent, data: { title: 'Buscar Persona' }
  },
  {
    path: 'registrar-persona/:documento', component: RegistrarPersonaComponent, data: { title: 'Registrar Persona' },
    resolve: { persona: PersonaService, localidad: LocalidadService }
  },
  {
    path: 'confirmar-datos', component: ConfirmarDatosComponent, data: { title: 'Confirmar Datos' }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonaService, LocalidadService]
})
export class RegistrarRoutingModule { }
