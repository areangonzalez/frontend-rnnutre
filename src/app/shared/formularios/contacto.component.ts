import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'formulario-contacto',
    templateUrl: './contacto.component.html'
})
export class ContactoComponent implements OnInit {
  public state: string = 'small';

  constructor(){}

  ngOnInit(){}
}
