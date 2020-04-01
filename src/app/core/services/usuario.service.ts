import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PersonaService {

    constructor(private _apiService: ApiService) { }

    /**
     * busco los beneficiarios segun criterio de busqueda
     * @param params criterios de busqueda de un beneficiario
     */
    logueo(params:any) {
      let httpParams = new HttpParams();
      httpParams = this._apiService.formatParams(httpParams, params);

      return this._apiService.get('/login', httpParams);
    }

}
