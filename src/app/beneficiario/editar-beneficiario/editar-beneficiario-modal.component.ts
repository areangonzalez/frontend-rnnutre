import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { BeneficiarioService, LocalidadService, MensajeService } from 'src/app/core/services';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaModel } from 'src/app/core/models';


@Component({
  selector: 'modal-editar-beneficiario-content',
  templateUrl: './editar-beneficiario-modal.content.html'
})
export class ModalEditarBeneficiarioContent {
  @Input("beneficiario") public beneficiario:FormGroup;
  @Input("listaRedSocial") public listaRedSocial:any;
  @Input("listaLocalidades") public listaLocalidades:any[];
  public submitted: boolean = false;
  public personaModel = new PersonaModel();

  constructor(public activeModal: NgbActiveModal, private _mensajeService: MensajeService, private modalService: NgbModal, private _beneficiarioService: BeneficiarioService){}

  /**
   * valido el formulario antes de confirmar los datos
   */
  validarFormulario() {
    this.submitted = true;

    if (this.beneficiario.invalid) {
      this._mensajeService.cancelado("Por favor complete los campos!!", [{name:''}]);
      return;
    }else{
      // creo el modelo de persona como se define en la api
      let persona: IPersona = this.personaModel.deserealize(this.beneficiario.value);
      // asigno la lista red social al objeto persona
      Object.assign(persona, {'lista_red_social': this.listaRedSocial});
      // asigno el nombre de la localidad
      persona.lugar.localidad = this.conseguirLocalidadPorId(persona.lugar.localidadid)

      this.confirmacion(persona);
    }
  }
  /**
   * abro modal para visualizar los datos y confirmar los mismos
   * @param datos datos del beneficiario
   */
  confirmacion(datos:any) {
    const confirmarDatos = this.modalService.open(ModalConfirmarBeneficiarioContent, {size: 'lg', centered: true});
    confirmarDatos.componentInstance.datos = datos;
    confirmarDatos.result.then(result => {
      if (result) {
        this.guardarBeneficiario(datos, datos['id'])
      }
    });

  }
  /**
   * edito a un beneficiario
   * @param params datos del beneficiarios
   * @param id identificador del beneficiario a editar
   */
  guardarBeneficiario(params, id){
    this._beneficiarioService.guardar(params, id).subscribe(
      respuesta => {
        // obtengo la respuesta y cierro el modal si confirma el guardado
        this._mensajeService.exitoso("Se han guardado los cambios con exito!!", [{name: ''}]);
        this.activeModal.close();
      },error => { this._mensajeService.cancelado(error, [{name: ''}]); }
    )
  }
  /**
   * busco el nombre de la localidad seleccionada en el formulario por su id
   * @param id identificador de la localidad
   */
  conseguirLocalidadPorId(id: any) {
    for (let i = 0; i < this.listaLocalidades.length; i++) {
      if (parseInt(this.listaLocalidades[i]["id"]) == parseInt(id) ) {
        return this.listaLocalidades[i]["nombre"];
      }
    }
  }



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
    modalRef.componentInstance.beneficiario = this.beneficiarioForm;
    modalRef.componentInstance.listaRedSocial = this.lista_red_social;
    modalRef.componentInstance.listaLocalidades = this.listadoLocalidades;
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

@Component({
  selector: 'modal-confirmar-beneficiario-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" id="modal-title">Confirmación de datos</h4>
      <button type="button" class="close" aria-describedby="modal-title" (click)="cancelar()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <vista-datos-persona [tamanioColumna]="'col-lg-9'" [datosPersona]="datos" ></vista-datos-persona>
    </div>
    <div class="d-flex justify-content-between pl-3 pr-3 pb-3">
      <button type="button" class="btn btn-danger" (click)="cancelar()"><i class="far fa-times-circle"></i> Cancelar</button>
      <button type="button" class="btn btn-success" (click)="confirmar()"><i class="fa fa-check-circle"></i> Confirmar</button>
    </div>
  `
})
export class ModalConfirmarBeneficiarioContent {
  @Input("datos") public datos: any;


  constructor(public activeModal: NgbActiveModal){}

  cancelar(){
    this.activeModal.close(false);
  }

  confirmar() {
    this.activeModal.close(true);
  }
}


