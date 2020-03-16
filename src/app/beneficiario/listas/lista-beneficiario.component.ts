import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lista-beneficiario',
    templateUrl: './lista-beneficiario.component.html'
})
export class ListaBeneficiarioComponent implements OnInit {
  @Input("ListadoBeneficiario") public listadoBeneficiario: any;
  /* @Input("mostrarBotones") public mostrarBoton: boolean */;
  constructor(){}

  ngOnInit(){}


  /* public agregarBeneficiario(redSocial:any) {
    this.listadoBeneficiario.push(redSocial);
  }

  borrar(id:number, confirmacion: boolean){
    if (confirmacion){
      this.listadoBeneficiario.splice(id, 1);
    }
  } */

}
