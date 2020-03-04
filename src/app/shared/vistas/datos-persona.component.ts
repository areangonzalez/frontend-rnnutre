import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vista-datos-persona',
  templateUrl: './datos-persona.component.html',
  styleUrls: ['./datos-persona.scss']
})
export class DatosPersonaComponent implements OnInit {
  @Input("datosPersona") public datosPersona: any;

    constructor(){}

    ngOnInit(){

    }

}
