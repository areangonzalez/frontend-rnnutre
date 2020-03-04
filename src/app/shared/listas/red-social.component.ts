import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lista-red-social',
    templateUrl: './red-social.component.html'
})
export class RedSocialComponent implements OnInit {
  @Input("redesSociales") public listadoRedSocial: any;
  @Input("mostrarBotones") public mostrarBoton: boolean;
  constructor(){}

  ngOnInit(){}

  /**
   * agrego un nuevo elemento al listado de red social
   * @param redSocial datos de una red social
   */
  public agregarRedSocial(redSocial:any) {
    this.listadoRedSocial.push(redSocial);
  }

  borrar(id:number, confirmacion: boolean){
    if (confirmacion){
      this.listadoRedSocial.splice(id, 1);
    }
  }

}
