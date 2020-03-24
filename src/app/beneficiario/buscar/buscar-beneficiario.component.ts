import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  public state: string = 'small';

  constructor(){}

  ngOnInit(){}

  /**
   * abre/cierra con animación la busqueda avanzada
   */
  abrirCerrarBusquedaAvanzada() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

}
