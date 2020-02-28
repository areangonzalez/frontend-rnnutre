import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
    selector: 'registrar-persona',
    templateUrl: './registrar-persona.component.html',
    styleUrls: ['./registrar-persona.scss']
})
export class RegistrarPersonaComponent implements OnInit {
    public isCollapsed = true;

    constructor(
       private _router: Router,
       //private _authentication: AuthenticationService

    ){}

    ngOnInit(){
    }

    /* registrarPersona(){
        this._router.navigate(['/registrar']);
    } */
}
