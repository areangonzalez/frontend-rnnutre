import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'formulario-lugar',
    templateUrl: './lugar.component.html'
})
export class LugarComponent implements OnInit {
  @Input("lugar") public lugar: FormGroup;
  @Input("localidades") public listaLocalidades: any;
  @Input("submited") public submited: boolean;

  constructor(){}

  ngOnInit(){}
}
