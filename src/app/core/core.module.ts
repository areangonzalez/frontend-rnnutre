import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TitleService } from "./services";

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TitleService
  ]
})
export class CoreModule {}
