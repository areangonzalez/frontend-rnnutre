
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";

import { BuscarPersonaComponent } from "./buscar-persona";
import { RegistrarRoutingModule } from './registrar-routing.module';

// Metadatos del módulo
@NgModule({
  declarations: [
    BuscarPersonaComponent
  ],
  imports: [
    CommonModule, NgbModule, SharedModule, RegistrarRoutingModule],
  schemas: [],
  exports: [
  ]

})
export class RegistrarModule { }
