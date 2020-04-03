import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'buscar-beneficiario',
    templateUrl: './buscar-beneficiario.component.html',
    styleUrls: ['./buscar-beneficiario.scss'],
    animations: [
      trigger('abrirCerrar',[
        state('small', style({
          height : '0px',
        })),
        state('large', style({
          height : '160px',
        })),
        transition('small <=> large', animate('400ms ease-in')),
      ]),
    ]
})
export class BuscarBeneficiarioComponent implements OnInit {
  @Input("listaLocalidades") public listaLocalidades: any;
  @Output("obtenerBusqueda") public obtenerBusqueda = new EventEmitter();
  @Output("limpiar") public limpiar = new EventEmitter();
  public state: string = 'small'; // estado de la animacion
  public realizoBusqueda: boolean = false; // aplica filtro a boton de busqueda avanzada
  public global_param: string = ""; // parametro de busqueda global para beneficiario
  public busquedaAvanzadaForm: FormGroup;

  constructor( private _fb: FormBuilder ){
    this.busquedaAvanzadaForm = _fb.group({
      localidadid: '',
      calle: '',
      barrio: '',
      estado: ''
    });
  }

  ngOnInit(){}

  /**
   * abre/cierra con animación la busqueda avanzada
   */
  abrirCerrarBusquedaAvanzada() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }
  /**
   * Armo el api de busqueda para enviarlo al componente padre
   */
  buscar() {
    let busquedaAvanzada = this.busquedaAvanzadaForm.value;
    let apiBusqueda: any= {};
    let esTrue: boolean = false;

    if (this.global_param !== '') {
      Object.assign(apiBusqueda, {"global_param": this.global_param});
    }
    for (const clave in busquedaAvanzada) {
      if(busquedaAvanzada[clave] !== '' && busquedaAvanzada[clave] !== null && (busquedaAvanzada[clave])){
        Object.assign(apiBusqueda, {[clave]: busquedaAvanzada[clave]});
        esTrue = true;
      }
    }

    this.realizoBusqueda = esTrue;
    this.state = (esTrue) ? 'large' : 'small';
    this.obtenerBusqueda.emit(apiBusqueda);
  }
  /**
   * Limpiar los campos de busqueda
   */
  limpiarCampos() {
    let busqueda: any = this.busquedaAvanzadaForm.value;
    for (const key in busqueda) {
      if (key == 'fechaDesde') {
        busqueda[key] = null;
      }else if (key == 'fechaHasta') {
        busqueda[key] = null;
      }else {
        busqueda[key] = '';
      }
    }
    this.global_param = '';
    this.busquedaAvanzadaForm.patchValue(busqueda);
    this.realizoBusqueda = false;
    this.state = 'small';
    this.limpiar.emit(true);
  }
  /**
     * Resalta los campos que han sido utilizados en búsqueda
     * @param valor [any] contiene el valor de la variable
     * @return [boolean] devuelve el valor a resaltar en booleano
     */
    resaltarCampo(valor:any) {
      let resaltar: boolean = false;
      resaltar = (valor != null && valor != '') ? true : false;
      return resaltar;
    }
}
