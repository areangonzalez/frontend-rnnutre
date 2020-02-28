import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { CabeceraComponent } from './layout'
import { PersonaComponent, ContactoComponent, RedSocailFormComponent } from "./formularios";
import { RedSocialComponent } from './listas';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CabeceraComponent,
    PersonaComponent, ContactoComponent, RedSocailFormComponent,
    RedSocialComponent
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, CabeceraComponent, PersonaComponent, ContactoComponent, RedSocailFormComponent, RedSocialComponent
  ],
  entryComponents:[]
})
export class SharedModule {}
