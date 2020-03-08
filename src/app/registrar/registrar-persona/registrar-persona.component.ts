import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaService, DatosPersonaService } from 'src/app/core/services';
import { PersonaModel } from 'src/app/core/models';
import { Observable } from 'rxjs';

@Component({
    selector: 'registrar-persona',
    templateUrl: './registrar-persona.component.html',
    styleUrls: ['./registrar-persona.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrarPersonaComponent implements OnInit {
    public isCollapsed = true;
    public beneficiarioForm: FormGroup;
    public submited: boolean = false;
    public listaRedSocial = [];
    public listaLocalidad = [];
    public personaModel = new PersonaModel();
    public parametros: any;
    private persona$: Observable<any>;

    constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _fb: FormBuilder,
      private _personaService: PersonaService,
      private _datosPersonaService: DatosPersonaService
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
      this.persona$ = this._datosPersonaService.getPersona();
      this.listaLocalidad = this._route.snapshot.data['localidad'];
      this.configPersona(this._route.snapshot.data['persona'], this._route.snapshot.paramMap.get('documento'));
    }

    configPersona(datosPersona:any, dni: string) {
      let vDatos = {};
      let esBeneficiario = datosPersona['beneficiario'];
      let persona: any;
      // obtengo la supcription del observable
      this.persona$.subscribe(datos => {
        persona = datos;
      });
      console.log("Observable: ", persona);
      // verifico si existe la subscription o utiizo a variable de datospersona
      datosPersona = (persona.id !== undefined) ? persona : datosPersona;
      if (esBeneficiario) {
        this._router.navigate(['/']);
      }else{
        if (datosPersona["id"] !== undefined) {
          // armo el array para el formulario
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
          this.beneficiarioForm.get("lugar").patchValue(vDatos["lugar"]);
          this.beneficiarioForm.get("contacto").patchValue(vDatos["contacto"]);
        }else{
          // si no tengo los datos de una persona dejo el formulario vacio con solo el documento
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
        /* let parametros = this.personaModel.deserealize(this.beneficiarioForm.value);
        Object.assign(parametros, {'lista_red_social': this.listaRedSocial});
        parametros.lugar.localidad = this.conseguirLocalidadPorId(parametros.lugar.localidadid); */
        let persona: IPersona = this.personaModel.deserealize(this.beneficiarioForm.value);
        Object.assign(persona, {'lista_red_social': this.listaRedSocial});
        persona.lugar.localidad = this.conseguirLocalidadPorId(persona.lugar.localidadid)
        // datos para la interface de persona
        /* let datosPersona: IPersona = this.beneficiarioForm.value;
        Object.assign(datosPersona, {'lista_red_social': this.listaRedSocial});
        datosPersona.lugar.localidad = this.conseguirLocalidadPorId(datosPersona.lugar.localidadid); */

        console.log("actualizo datos persona", persona);


        this._datosPersonaService.addPersona(persona);

        /* localStorage.setItem("datosPersona", JSON.stringify(parametros)); */
        this._router.navigate(['buscar-persona','confirmar-datos']);
      }
    }

    conseguirLocalidadPorId(idLocalidad) {
      for (let i = 0; i < this.listaLocalidad.length; i++) {
        if (parseInt(this.listaLocalidad[i]["id"]) == parseInt(idLocalidad) ) {
          return this.listaLocalidad[i]["nombre"];
        }
      }
    }
}
