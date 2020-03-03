import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TipoRedSocialService, UtilService } from 'src/app/core/services';

@Component({
    selector: 'formulario-red-social',
    templateUrl: './red-social-form.component.html'
})
export class RedSocailFormComponent implements OnInit {
  @Output("cancelarModal") public cancelarModal = new EventEmitter();
  @Output("getDatos") public getDatos = new EventEmitter();
  public redSocialForm: FormGroup;
  public tipoRedSocialLista: any = [];
  public submitted: boolean = false;

  constructor( private _fb: FormBuilder, private _tipoRedSocialService: TipoRedSocialService, private _util: UtilService ){
    this.redSocialForm = _fb.group({
      tipo_red_socialid: ['', Validators.required],
      perfil: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.tipoRedSocial();
  }

  /**
   * Listado de los tipos de redes sociales
   */
  tipoRedSocial() {
    this._tipoRedSocialService.lista().subscribe(
      datos => {
        this.tipoRedSocialLista = datos;
      }, error => { /* this._mensajeService.cancelado(error, [{name:''}]); */ }
    );
  }

  /**
   * Valido el formulario antes de guardar
   * @param recursoid identificador de la persona que ha sido guardada
   */
  public validar() {
    this.submitted = true;
    if (this.redSocialForm.invalid) {
      //this._mensajeService.cancelado("¡Error! Campos sin completar.", [{name:''}]);
      return false;
    }else{
      this.guardar();
    }
  }
  /**
   * Verifico los datos antes de enviar el guardar al listado
   */
  public guardar() {

    let tiporedsocial = this.tipoRedSocialLista.filter(tipo => { return parseInt(tipo.id) === parseInt(this.redSocialForm.value.tipo_red_socialid); });
    let urlEncontrada = this.redSocialForm.value.perfil.search(tiporedsocial[0].nombre.toLowerCase());
    let perfilUsuario = (urlEncontrada != -1) ? this.redSocialForm.value.perfil : tiporedsocial[0].url_1 + this.redSocialForm.value.perfil;

    // envio los datos al modal
    this.getDatos.emit({
      "tipo_red_socialid": tiporedsocial[0].id,
      "tipo_red_social": tiporedsocial[0].nombre,
      "perfil": perfilUsuario,
      "icono_class": tiporedsocial[0].icono_class
    });
  }
  /**
   * Envia un booleano para el cierre del modal
   */
  public cancelar(){
    this.cancelarModal.emit(true);
  }
  /**
   * Valida el campo de perfil para que no tenga espacios
   * @param datos objeto que contiene la cadena ingresada.
   */
  public noEspacios(datos:any) {
    if (!this._util.validarEspacios(datos.value)) {
      datos.value = datos.value.substring(0,datos.value.length - 1);
    }
  }

}
