import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'formulario-persona',
    templateUrl: './persona.component.html'
})
export class PersonaComponent implements OnInit {
  @Input("persona") public persona: FormGroup;
  @Input("documento") public documento: string;
  @Input("submited") public submited: boolean;

    constructor(){}

    ngOnInit(){}
}
