import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleService, ApiService } from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TitleService, ApiService
  ]
})
export class CoreModule {}
