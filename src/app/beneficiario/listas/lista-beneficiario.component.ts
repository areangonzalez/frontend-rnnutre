import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigurarPagina } from '../../core/models';

@Component({
    selector: 'lista-beneficiario',
    templateUrl: './lista-beneficiario.component.html'
})
export class ListaBeneficiarioComponent implements OnInit {
  @Input("ListadoBeneficiario") public listadoBeneficiario: any;
  @Input('configurarPaginacion') public configurarPaginacion: ConfigurarPagina;
  @Output("cambioDePagina") public cambioDePagina = new EventEmitter();
  constructor(){}

  ngOnInit(){}

  getDireccion(lugar:any) {
    let direccion: string = "";
    direccion = lugar["calle"] + " " + lugar["altura"];

    return direccion;
  }
  /**
   * Recibo el numero de pagina y lo envio al componente padre
   * @param page numero de pagina
   */
  cambioPagina(page:number){
    this.cambioDePagina.emit(page);
  }



}
