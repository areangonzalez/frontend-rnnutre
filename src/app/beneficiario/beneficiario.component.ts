import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurarPagina } from '../core/models';
import { ConfiguracionParaPaginarService, BeneficiarioService, MensajeService } from '../core/services';

@Component({
    selector: 'app-beneficiario',
    templateUrl: './beneficiario.component.html'
})
export class BeneficiarioComponent implements OnInit {
  public listaBeneficiario: any[] = []; // listado de beneficiarios
  public configPaginacion: ConfigurarPagina = new ConfigurarPagina(); // obtiene el objeto de configuracion de rango y paginado del listado de beneficiario
  public pagina: number = 1;
  public filtradoBusqueda:any = {}; // variable que mantiene el filtro de busqueda

  constructor(
    private _route: ActivatedRoute, private _confPaginacion: ConfiguracionParaPaginarService, private _beneficiarioService: BeneficiarioService, private _mensajeService: MensajeService
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
  /**
   * Solicito el cambio de pagina
   * @param pagina [number] numero de pagina
   */
  cambiarPagina(pagina: any) {
    this.buscar(this.filtradoBusqueda, pagina);
  }
  /**
   * busco los beneficiarios
   * @param params contiene un criterio de busqueda para filtrar beneficiarios
   * @param pagina numero de pagina del listado
   */
  buscar(params: any, pagina: number) {
    Object.assign(params, {page: pagina - 1});

    this._beneficiarioService.buscar(params).subscribe(
      respuesta => {
        this.config(respuesta, pagina);
      }, error => { this._mensajeService.cancelado(error, [{'name': ''}]); }
    )
  }

  limpiarCampos(limpiar:boolean){
    this.buscar({}, 1);
  }


}
