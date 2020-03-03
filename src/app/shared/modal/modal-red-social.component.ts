import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'modal-red-social-content',
  templateUrl: './modal-red-social.content.html'
})
export class ModalRedSocialContent {

  constructor(public activeModal: NgbActiveModal){}
  /**
   * Recibo los datos del formulario y los envio al listado
   * @param datos objeto que obtiene los datos de una red social
   */
  public datosLista(datos:any) {
    this.activeModal.close(datos);
  }

  /**
   * cancelo el modal y lo cierro.
   * @param cancelar cierra el modal si el valor es true
   */
  public cancelar(cancelar:boolean) {
    if (cancelar){
      this.activeModal.close('closed');
    }
  }

}

@Component({
  selector: 'abrir-modal-red-social',
  template: `
    <button type="button" class="btn btn-md btn-outline-success" (click)="open()" >
      Abrir Formulario de Red Social
    </button>
  `,
  providers: [NgbModalConfig, NgbModal]
})
export class ModalRedSocialComponent {
  @Output("obtenerRedSocial") public obtenerRedSocial = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalRedSocialContent, { size: 'sm' });
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el id persona desde el content.
          return this.obtenerRedSocial.emit(result);
        }
      }
    )
  }
}
