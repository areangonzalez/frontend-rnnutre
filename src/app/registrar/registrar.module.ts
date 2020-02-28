
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";

import { BuscarPersonaComponent } from "./buscar-persona";
import { RegistrarRoutingModule } from './registrar-routing.module';
import { RegistrarPersonaComponent } from './registrar-persona';

// Metadatos del módulo
@NgModule({
  declarations: [
    BuscarPersonaComponent, RegistrarPersonaComponent
  ],
  imports: [
    CommonModule, NgbModule, SharedModule, RegistrarRoutingModule],
  schemas: [],
  exports: [
  ]

})
export class RegistrarModule { }
