import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { CabeceraComponent } from './layout'
import { PersonaComponent, ContactoComponent, RedSocailFormComponent, LugarComponent } from "./formularios";
import { RedSocialComponent } from './listas';
import { ModalRedSocialComponent, ModalRedSocialContent } from "./modal";


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
    PersonaComponent, ContactoComponent, RedSocailFormComponent, LugarComponent,
    RedSocialComponent,
    ModalRedSocialComponent, ModalRedSocialContent
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, CabeceraComponent, PersonaComponent, ContactoComponent, RedSocailFormComponent, RedSocialComponent, LugarComponent, ModalRedSocialComponent, ModalRedSocialContent
  ],
  entryComponents:[
    ModalRedSocialComponent, ModalRedSocialContent
  ]
})
export class SharedModule {}
