import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UtilService } from 'src/app/core/services';

@Component({
    selector: 'formulario-persona',
    templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit {
  @Input("persona") public persona: FormGroup;
  @Input("documento") public documento: string;
  @Input("submited") public submited: boolean;

    constructor( private _utilService: UtilService ){}

    ngOnInit(){}

    soloNumero(caracter: any) {
      if (!this._utilService.validarNumero(caracter.value)) {
        caracter.value = caracter.value.substring(0, caracter.value.length -1);
      }
    }
}
