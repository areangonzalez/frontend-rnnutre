import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'formulario-contacto',
    templateUrl: './contacto.component.html'
})
export class ContactoComponent implements OnInit {
  @Input("contacto") public contacto: FormGroup;
  @Input("listaRedSocial") public listaRedSocial: any;
  @Input("submited") public submited: boolean;

  constructor(){}

  ngOnInit(){}
}
