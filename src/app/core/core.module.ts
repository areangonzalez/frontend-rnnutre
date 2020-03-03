import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TitleService, ApiService, PersonaService, UtilService
} from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TitleService, ApiService, PersonaService, UtilService
  ]
})
export class CoreModule {}
