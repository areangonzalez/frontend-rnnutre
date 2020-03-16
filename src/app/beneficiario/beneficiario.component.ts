import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-beneficiario',
    templateUrl: './beneficiario.component.html'
})
export class BeneficiarioComponent implements OnInit {
  public listaBeneficiario: any[] = [];

  constructor(
    private _route: ActivatedRoute
  ){}

  ngOnInit(){
    this.listaBeneficiario = this._route.snapshot.data['beneficiarios'];
    console.log(this.listaBeneficiario);
  }

}
