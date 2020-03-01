import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TitleService, ApiService, PersonaService
} from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TitleService, ApiService, PersonaService
  ]
})
export class CoreModule {}
