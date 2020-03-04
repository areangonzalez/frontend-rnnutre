import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'confirmar-datos',
    templateUrl: './confirmar-datos.component.html'
})
export class ConfirmarDatosComponent implements OnInit {
    public datosPersona = JSON.parse(localStorage.getItem('datosPersona'));

    constructor( private _router: Router ){}

    ngOnInit(){}

    confirmar() {

    }
    /**
     * Vuelvo al formulario para editar los datos
     */
    editar() {
      this._router.navigate(['buscar-persona', 'registrar-persona', this.datosPersona.nro_documento]);
    }

    cancelar(confirmar: boolean) {
      if (confirmar) {
        localStorage.removeItem("datosPersona");
        this._router.navigate(['buscar-persona']);
      }
    }

}
