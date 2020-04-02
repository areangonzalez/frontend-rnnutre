import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthGuard } from "./guards";

import {
  TitleService, LoaderService, ApiService, PersonaService, UtilService, TipoRedSocialService,
  LocalidadService, BeneficiarioService, MensajeService, DatosPersonaService, ConfiguracionParaPaginarService, AuthenticationService, JwtService
} from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    AuthGuard,
    TitleService, LoaderService, ApiService, PersonaService, UtilService, TipoRedSocialService,
    LocalidadService, BeneficiarioService, MensajeService, DatosPersonaService, ConfiguracionParaPaginarService, AuthenticationService, JwtService
  ],
})
export class CoreModule {}
