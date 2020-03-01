import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/core/services';

@Component({
    selector: 'registrar-buscar-persona',
    templateUrl: './buscar-persona.component.html',
    styleUrls: ['./buscar-persona.scss']
})
export class BuscarPersonaComponent implements OnInit {
    public isCollapsed = true;
    public buscarForm: FormGroup;

    constructor(
       private _router: Router,
       private _fb: FormBuilder,
       private _personaService: PersonaService
    ){
      // armo el formulario con sus validaciones
      this.buscarForm = _fb.group({
        nro_documento: ['', [Validators.required, Validators.minLength(7)]]
      });
    }

    ngOnInit(){
    }
    /**
     * busco la persona por numero de documento;
     */
    buscarPersona() {
      let nroDocumento = this.buscarForm.get('nro_documento').value;
      // aplico el servicio para buscar a la persona por documento
      this._personaService.personaPorNroDocumento(nroDocumento).subscribe(
        respuesta => {
          console.log(respuesta);
        }, error  => {
          console.log(error);
        })
    }
    // me dirijo a registrar una persona no registrada
    registrarPersona() {
      this._router.navigate(['buscar-persona', 'registrar-persona']);
    }
}
