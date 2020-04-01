import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService, LoaderService } from 'src/app/core/services';

@Component({
    selector: 'layout-cabecera',
    templateUrl: './cabecera.component.html',
    styleUrls: ['./cabecera.scss']
})
export class CabeceraComponent implements OnInit {
    public isCollapsed = true;
    public estoyLogueado: boolean = false;
    public nombreUsuario: string = '';

    constructor(
      private _router: Router,
      private _authentication: AuthenticationService,
      private _loaderService: LoaderService
    ){}

    ngOnInit(){
      this.estoyLogueado = this._authentication.loggedIn();
      this.obtenerNombreUsuario();
    }

    cerrarSesion(){
      this._loaderService.show();
      setTimeout(() => {
        this._authentication.logout();
        this._loaderService.hide();
        this._router.navigate(['/login']);
      }, 1000);
    }

    obtenerNombreUsuario() {
      if (this.estoyLogueado){
        this.nombreUsuario = this._authentication.getUserName();
      }
    }

}
