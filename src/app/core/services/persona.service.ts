import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class PersonaService {

    constructor(private _apiService: ApiService) { }

    personaPorNroDocumento(nro_documento: string) {
        return this._apiService.get('/personas/buscar-por-documento/' + nro_documento);
    }

    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
      ): Observable<any>|Promise<any>|any {
        let nro_documento = route.params.documento;
        return this._apiService.get('/personas/buscar-por-documento/' + nro_documento);
      }

}
