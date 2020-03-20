import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class BeneficiarioService {

    constructor(private _apiService: ApiService) { }

    /**
     * guarda un beneficiario
     * @param params objeto que contiene los datos de un beneficiario
     * @param id numero identificador del beneficiario a editar
     */
    guardar(params: any, id:number) {
      if(id !== 0) {
        // update
      }else{
        return this._apiService.post('/beneficiarios', params);
      }
    }
    /**
     * busco los beneficiarios segun criterio de busqueda
     * @param params criterios de busqueda de un beneficiario
     */
    buscar(params:any) {
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, params);

      return this._apiService.get('/beneficiarios', httpParams);
    }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
        let httpParams = new HttpParams();
        httpParams = this._apiService.formatParams(httpParams, {page:0});
        return this._apiService.get('/beneficiarios', httpParams);
      }

}
