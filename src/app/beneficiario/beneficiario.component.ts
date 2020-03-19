import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurarPagina } from '../core/models';
import { ConfiguracionParaPaginarService } from '../core/services';

@Component({
    selector: 'app-beneficiario',
    templateUrl: './beneficiario.component.html'
})
export class BeneficiarioComponent implements OnInit {
  public listaBeneficiario: any[] = []; // listado de beneficiarios
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obtiene el objeto de configuracion de rango y paginado del listado de beneficiario

  constructor(
    private _route: ActivatedRoute, private _confPaginacion: ConfiguracionParaPaginarService
  ){}

  ngOnInit(){
    this.config(this._route.snapshot.data['beneficiarios'], 1);
  }

  /**
   * Se configura paginacion y listado de destinatario
   * @param destinatarios [Object] objeto que contiene los valores de paginacion y listado de destinatario
   */
  public config(datos:any, pagina:number) {
    // configuracion de paginación
    this.configPaginacion = this._confPaginacion.config(datos, pagina);
    // total de registros
    this.listaBeneficiario = datos.resultado;
  }

}
