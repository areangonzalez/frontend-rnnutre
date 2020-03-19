import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TitleService, ApiService, PersonaService, UtilService, TipoRedSocialService,
  LocalidadService, BeneficiarioService, MensajeService, DatosPersonaService, ConfiguracionParaPaginarService
} from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TitleService, ApiService, PersonaService, UtilService, TipoRedSocialService,
    LocalidadService, BeneficiarioService, MensajeService, DatosPersonaService, ConfiguracionParaPaginarService
  ],
})
export class CoreModule {}
