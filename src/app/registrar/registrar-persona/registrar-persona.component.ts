import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/core/services';
import { PersonaModel } from 'src/app/core/models';

@Component({
    selector: 'registrar-persona',
    templateUrl: './registrar-persona.component.html',
    styleUrls: ['./registrar-persona.scss']
})
export class RegistrarPersonaComponent implements OnInit {
    public isCollapsed = true;
    public beneficiarioForm: FormGroup;
    public submited: boolean = false;
    public listaRedSocial = [];
    public listaLocalidad = [];
    public personaModel = new PersonaModel();

    constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _fb: FormBuilder,
      private _personaService: PersonaService
    ){
      this.beneficiarioForm = _fb.group({
        id:'',
        nro_documento: ['', [Validators.required, Validators.minLength(7)]],
        nombre: ['', [Validators.required, Validators.minLength(3)]],
        apellido: ['', [Validators.required, Validators.minLength(3)]],
        cantidad_hijo: ['', [Validators.required, Validators.min(0)]],
        edad_por_hijo: ['', Validators.required],
        contacto: _fb.group({
          telefono: '',
          celular: '',
          email: ''
        }),
        lugar: _fb.group({
          localidadid: ['', Validators.required],
          calle: ['', Validators.required],
          altura: ['', Validators.required],
          barrio: ['', Validators.required]
        })
      })
    }

    ngOnInit(){
      this.listaLocalidad = this._route.snapshot.data['localidad'];
      this.configPersona(this._route.snapshot.data['persona'], this._route.snapshot.paramMap.get('documento'));
    }

    configPersona(datosPersona:any, dni: string) {
      let vDatos = {};
      if (datosPersona['beneficiario']) {
        this._router.navigate(['/']);
      }else{
        if (datosPersona["id"] !== undefined) {
          vDatos = datosPersona;
          vDatos['contacto'] = {};
          vDatos['contacto']['telefono'] = datosPersona['telefono'];
          delete vDatos['telefono'];
          vDatos['contacto']['celular'] = datosPersona['celular'];
          delete vDatos['celular'];
          vDatos['contacto']['email'] = datosPersona['email'];
          delete vDatos['email'];
          this.listaRedSocial = datosPersona['lista_red_social'];
          delete vDatos['lista_red_social'];

          this.beneficiarioForm.patchValue(vDatos);
        }else{
          vDatos['nro_documento'] = dni;
          this.beneficiarioForm.patchValue(vDatos);
        }
      }


    }
    /**
     * Cancelo la creacion de un beneficiario
     */
    cancelar() {
      this._router.navigate(['/']);
    }
    /**
     * Valido el formulario antes de enviar los datos
     */
    validar() {
      this.submited = true;
      if(this.beneficiarioForm.invalid){
        return;
      } else {
        let persona = this.personaModel.deserealize(this.beneficiarioForm.value);
        Object.assign(persona, {'lista_red_social': this.listaRedSocial});
        console.log(persona);

        console.log("guardado con exito!!");
      }
    }
}
