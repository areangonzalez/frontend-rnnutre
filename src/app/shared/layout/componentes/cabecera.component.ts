import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
//import { AuthenticationService } from 'src/app/core/services';

@Component({
    selector: 'layout-cabecera',
    templateUrl: './cabecera.component.html',
    //styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
    public isCollapsed = true;

    constructor(
       private _router: Router,
       //private _authentication: AuthenticationService

    ){}

    ngOnInit(){
    }

    /* cerrarSesion(){
        this._authentication.logout();
        this._router.navigate(['/login']);
    } */
}
