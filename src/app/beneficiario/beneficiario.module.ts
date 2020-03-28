
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { BeneficiarioRoutingModule } from "./beneficiario-routing.module";

import { BeneficiarioComponent } from './beneficiario.component';
import { ListaBeneficiarioComponent } from "./listas";
import { BuscarBeneficiarioComponent } from './buscar';
import { ModalEditarBeneficiarioContent, EditarBeneficiarioModalComponent, ModalConfirmarBeneficiarioContent } from "./editar-beneficiario";

// Metadatos del módulo
@NgModule({
  declarations: [
    BeneficiarioComponent, ListaBeneficiarioComponent, BuscarBeneficiarioComponent, ModalEditarBeneficiarioContent, EditarBeneficiarioModalComponent, ModalConfirmarBeneficiarioContent
  ],
  imports: [
    CommonModule, NgbModule, SharedModule, BeneficiarioRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    ModalEditarBeneficiarioContent, EditarBeneficiarioModalComponent, ModalConfirmarBeneficiarioContent
  ]

})
export class BeneficiarioModule { }
