import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'registrar-buscar-persona',
    templateUrl: './buscar-persona.component.html',
    styleUrls: ['./buscar-persona.scss']
})
export class BuscarPersonaComponent implements OnInit {
    public isCollapsed = true;

    constructor(
       private _router: Router,
       //private _authentication: AuthenticationService

    ){}

    ngOnInit(){
    }

    registrarPersona() {
      this._router.navigate(['buscar-persona', 'registrar-persona']);
    }
}
