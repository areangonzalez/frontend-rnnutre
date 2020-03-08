import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BeneficiarioService, DatosPersonaService } from 'src/app/core/services';
import { Observable } from 'rxjs';

@Component({
    selector: 'confirmar-datos',
    templateUrl: './confirmar-datos.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmarDatosComponent implements OnInit {
    //public datosPersona = JSON.parse(localStorage.getItem('datosPersona'));
    public datosPersona: IPersona;
    private persona$: Observable<any>;

    constructor( private _router: Router, private _beneficiarioService: BeneficiarioService, private _datosPersonaService: DatosPersonaService ){}

    ngOnInit(){
      this.persona$ = this._datosPersonaService.getPersona();
      this.persona$.subscribe( datos => {
        this.datosPersona = datos;
      });
    }

    confirmar() {
      this._beneficiarioService.guardar(this.datosPersona, 0).subscribe(
        respuesta =>{
          if (respuesta["success"]){
            // colocar mensaje exitoso
            this._router.navigate(["buscar-persona"]);
          }
      }, error => { console.log(error); })
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
