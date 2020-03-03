
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
  ]

})
export class RegistrarModule { }
