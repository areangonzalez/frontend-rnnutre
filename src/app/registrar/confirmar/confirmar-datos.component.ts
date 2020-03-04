import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'confirmar-datos',
    templateUrl: './confirmar-datos.component.html'
})
export class ConfirmarDatosComponent implements OnInit {
    public datosPersona = JSON.parse(localStorage.getItem('datosPersona'));
    constructor(){}

    ngOnInit(){}

}
