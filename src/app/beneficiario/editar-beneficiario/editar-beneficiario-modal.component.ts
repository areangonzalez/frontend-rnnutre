import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BeneficiarioService } from 'src/app/core/services';


@Component({
  selector: 'modal-editar-beneficiario-content',
  templateUrl: './editar-beneficiario-modal.content.html'
})
export class ModalEditarBeneficiarioContent {

  constructor(public activeModal: NgbActiveModal){}

  /* this.activeModal.close(datos); */

}

@Component({
  selector: 'editar-beneficiario-modal',
  template: `
    <button type="button" class="btn btn-outline-secondary btn-sm" (click)="open()" ngbTooltip="Editar beneficiario"><i class="fas fa-pencil-alt"></i></button>
  `,
  providers: [NgbModalConfig, NgbModal]
})
export class EditarBeneficiarioModalComponent {
  @Input("idBeneficiario") public idBeneficiario: number;

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private _beneficiarioService: BeneficiarioService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    this.buscarBeneficiarioPorId(this.idBeneficiario);
    const modalRef = this.modalService.open(ModalEditarBeneficiarioContent, { size: 'lg' });
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el id persona desde el content.
          /* return this.obtenerRedSocial.emit(result); */
        }
      }
    )
  }


  buscarBeneficiarioPorId(id:number) {
    this._beneficiarioService.buscar({page:1}).subscribe(
      respuesta => {
        console.log("buscando desde el modal", respuesta);
    }, error => { console.log(error); });
  }



}
