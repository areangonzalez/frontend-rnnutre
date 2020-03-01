import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class PersonaService {

    constructor(private _apiService: ApiService) { }

    personaPorNroDocumento(nro_documento: string) {
        return this._apiService.get('/personas/buscar-por-documento/' + nro_documento);
    }

}
