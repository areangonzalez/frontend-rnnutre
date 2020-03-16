import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { BeneficiarioService, MensajeService } from 'src/app/core/services';

@Component({
    selector: 'confirmar-datos',
    templateUrl: './confirmar-datos.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmarDatosComponent implements OnInit {
    public datosPersona: IPersona = (localStorage.getItem("persona") != null) ? JSON.parse(localStorage.getItem("persona")) : null;

    constructor(
      private _router: Router, private _beneficiarioService: BeneficiarioService,
      private _mensajeService: MensajeService
    ){}

    ngOnInit(){
      if (this.datosPersona == null){
        this._router.navigate(["/"]);
      }
    }
    /**
     * Confirmo el guardado de los datos de una persona
     */
    confirmar() {
      this._beneficiarioService.guardar(this.datosPersona, 0).subscribe(
        respuesta =>{
            localStorage.removeItem("persona");
            this._mensajeService.exitoso("Se han guardado los datos de la persona.", [{name:'buscar-persona'}]);
      }, error => { this._mensajeService.cancelado(error, [{name:''}]); })
    }
    /**
     * Vuelvo al formulario para editar los datos
     */
    editar() {
      this._router.navigate(['buscar-persona', 'registrar-persona', this.datosPersona.nro_documento]);
    }

    cancelar(confirmar: boolean) {
      if (confirmar) {
        localStorage.removeItem("persona");
        this._router.navigate(['buscar-persona']);
      }
    }

}
