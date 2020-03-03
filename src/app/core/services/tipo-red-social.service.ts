import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class TipoRedSocialService {

    constructor(private _apiService: ApiService) { }

    lista() {
      return this._apiService.get('/tipo-red-socials');
    }

}
