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

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
        return this._apiService.get('/beneficiarios');
      }

}
