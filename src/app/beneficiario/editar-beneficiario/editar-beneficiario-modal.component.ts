import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BeneficiarioService, LocalidadService, MensajeService } from 'src/app/core/services';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'modal-editar-beneficiario-content',
  templateUrl: './editar-beneficiario-modal.content.html'
})
export class ModalEditarBeneficiarioContent {
  @Input("beneficiario") public beneficiario:FormGroup;
  @Input("listaRedSocial") public listaRedSocial:any;
  @Input("listaLocalidades") public listaLocalidades:any[];

  public submitted: boolean = false;

  constructor(public activeModal: NgbActiveModal){}

  /* this.activeModal.close(datos); */

}

@Component({
  selector: 'editar-beneficiario-modal',
  template: `
    <button type="button" class="btn btn-outline-secondary btn-sm rounded-0" (click)="open()" ngbTooltip="Editar beneficiario" style="margin-left:-0.05rem;"><i class="fas fa-pencil-alt"></i></button>
  `,
  providers: [NgbModalConfig, NgbModal]
})
export class EditarBeneficiarioModalComponent {
  @Input("idBeneficiario") public idBeneficiario: number;
  @Input("listadoLocalidades") public listadoLocalidades: any;
  public beneficiarioForm: FormGroup;
  public lista_red_social: any[] = [];
  public lista_localidades: any = [];

  constructor(
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private _beneficiarioService: BeneficiarioService,
    private _fb: FormBuilder,
    private _localidadService: LocalidadService,
    private _mensajeService: MensajeService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    // Formulario de beneficiario
    this.beneficiarioForm = _fb.group({
      id:'',
      nro_documento: ['', [Validators.required, Validators.minLength(7)]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      cantidad_hijo: ['', [Validators.required, Validators.min(0)]],
      edad_por_hijo: ['', Validators.required],
      contacto: _fb.group({
        telefono: '',
        celular: '',
        email: ''
      }),
      lugar: _fb.group({
        localidadid: ['', Validators.required],
        calle: ['', Validators.required],
        altura: ['', Validators.required],
        barrio: ['', Validators.required]
      })
    });
  }
  /**
   * abro el modal con los datos que necesita
   */
  open() {
    this.buscarBeneficiarioPorId(this.idBeneficiario);
    const modalRef = this.modalService.open(ModalEditarBeneficiarioContent, { size: 'lg' });
    console.log(this.lista_localidades);
    modalRef.componentInstance.beneficiario = this.beneficiarioForm;
    modalRef.componentInstance.listaRedSocial = this.lista_red_social;
    modalRef.componentInstance.listaLocalidades = this.listadoLocalidades;
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
  /**
   * Obtengo los datos de un beneficiario por su id
   * @param id identificador del beneficiario
   */
  buscarBeneficiarioPorId(id:number) {
    this._beneficiarioService.buscarPorId(id).pipe(map(
      vBeneficiario => {
        let beneficiario:any;

        beneficiario = vBeneficiario['persona'];
        beneficiario["contacto"] = {};
        beneficiario["cantidad_hijo"] = vBeneficiario["cantidad_hijo"];
        beneficiario["edad_por_hijo"] = vBeneficiario["edad_por_hijo"];
        beneficiario["id"] = vBeneficiario["id"];
        beneficiario["personaid"] = vBeneficiario["personaid"];

        beneficiario["contacto"]["telefono"] = vBeneficiario["persona"]["telefono"];
        delete(beneficiario["telefono"]);
        beneficiario["contacto"]["celular"] = vBeneficiario["persona"]["celular"];
        delete(beneficiario["celular"]);
        beneficiario["contacto"]["email"] = vBeneficiario["persona"]["email"];
        delete(beneficiario["email"]);

        return beneficiario;
      }))
    .subscribe(
      respuesta => {
        this.lista_red_social = respuesta["lista_red_social"];
        this.beneficiarioForm.patchValue(respuesta);
    }, error => { this._mensajeService.cancelado(error, [{name:''}]); });
  }
}
