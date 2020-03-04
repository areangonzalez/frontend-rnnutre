import { Component, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-confirmar-cancelacion-content',
  templateUrl: './modal-confirmar-cancelacion.content.html'
})
export class ModalConfirmarCancelacionContent {
  constructor(public activeModal: NgbActiveModal) {}

  public confirmacion(confirmar: boolean) {
    this.activeModal.close(confirmar);
  }
}

@Component({
  selector: 'confirmar-cancelacion-modal',
  template: `
    <button type="button" class="btn btn-danger" (click)="open()"><i class="far fa-times-circle"></i> Cancelar</button>
  `,
  providers: [NgbModalConfig, NgbModal]
})
export class ModalConfirmarCancelacionComponent {
  /**
   * @var recursoid {number} identificador de una persona
   * @function {Object} devuelve los datos de la persona
   */
  @Output("obtenerConfirmacion") public obtenerConfirmacion = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    const modalRef = this.modalService.open(ModalConfirmarCancelacionContent, {  size: 'sm', centered: true });
    modalRef.result.then(
      (result) => {
        if (result == 'closed'){
        }else{
          // obtengo el resultado de la operacion.
          return this.obtenerConfirmacion.emit(result);
        }
      }
    )
  }
}
