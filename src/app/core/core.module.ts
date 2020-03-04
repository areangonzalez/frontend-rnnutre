import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TitleService, ApiService, PersonaService, UtilService, TipoRedSocialService,
  LocalidadService, BeneficiarioService
} from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TitleService, ApiService, PersonaService, UtilService, TipoRedSocialService,
    LocalidadService, BeneficiarioService
  ]
})
export class CoreModule {}
